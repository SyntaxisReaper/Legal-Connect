const prisma = require('../prismaClient');

exports.getLawyers = async (req, res) => {
  try {
    const { search, domain, location, minExperience, maxFee } = req.query;

    const whereClause = {
      role: 'LAWYER',
      lawyerProfile: {
        isVerified: true,
      }
    };

    if (minExperience) {
      whereClause.lawyerProfile.experienceYears = { gte: parseInt(minExperience) };
    }

    if (maxFee) {
      whereClause.lawyerProfile.consultationFee = { lte: parseFloat(maxFee) };
    }

    if (location) {
      whereClause.lawyerProfile.location = { contains: location };
    }

    if (domain) {
      whereClause.lawyerProfile.domains = {
        some: {
          domain: {
            name: {
              contains: domain
            }
          }
        }
      };
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { lawyerProfile: { specialties: { contains: search } } },
        { lawyerProfile: { location: { contains: search } } },
        { lawyerProfile: { languages: { contains: search } } },
        { lawyerProfile: { domains: { some: { domain: { name: { contains: search } } } } } }
      ];
    }

    const lawyers = await prisma.user.findMany({
      where: whereClause,
      include: {
        lawyerProfile: {
          include: {
            domains: {
              include: {
                domain: true
              }
            }
          }
        }
      }
    });

    res.json(lawyers);
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLawyerById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const lawyer = await prisma.user.findUnique({
      where: { id },
      include: {
        lawyerProfile: {
          include: {
            domains: {
              include: {
                domain: true
              }
            }
          }
        },
        reviewsReceived: {
          include: {
            client: {
              select: { name: true }
            }
          }
        }
      }
    });

    if (!lawyer || lawyer.role !== 'LAWYER') {
      return res.status(404).json({ error: 'Lawyer not found' });
    }

    res.json(lawyer);
  } catch (error) {
    console.error('Error fetching lawyer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { id: lawyerId } = req.params;
    const { rating, comment } = req.body;
    const clientId = req.user.userId;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Verify if client had a completed appointment with this lawyer
    const completedAppointment = await prisma.appointment.findFirst({
      where: {
        clientId,
        lawyerId,
        status: 'COMPLETED'
      }
    });

    if (!completedAppointment) {
      return res.status(403).json({ error: 'You can only review lawyers you have had a completed consultation with.' });
    }

    // Check if review already exists
    const existingReview = await prisma.review.findFirst({
      where: { clientId, lawyerId }
    });

    let review;
    if (existingReview) {
      review = await prisma.review.update({
        where: { id: existingReview.id },
        data: { rating, comment }
      });
    } else {
      review = await prisma.review.create({
        data: {
          clientId,
          lawyerId,
          rating,
          comment
        }
      });
    }

    res.status(201).json({ message: 'Review saved successfully', review });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
