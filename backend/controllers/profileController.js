const prisma = require('../prismaClient');

exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { lawyerProfile: true }
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Don't send password hash
    const { passwordHash, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, bio, barRegistrationNumber, experienceYears, consultationFee, specialties } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: { name, email }
    });

    if (req.user.role === 'LAWYER') {
      const profileData = {
        bio: bio || '',
        barRegistrationNumber: barRegistrationNumber || '',
        experienceYears: experienceYears ? parseInt(experienceYears) : 0,
        consultationFee: consultationFee ? parseFloat(consultationFee) : 0.0,
        specialties: specialties || ''
      };

      await prisma.lawyerProfile.upsert({
        where: { userId: req.user.userId },
        update: profileData,
        create: {
          userId: req.user.userId,
          ...profileData
        }
      });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
