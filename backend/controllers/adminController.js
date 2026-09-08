const prisma = require('../prismaClient');

exports.getUnverifiedLawyers = async (req, res) => {
  try {
    const lawyers = await prisma.user.findMany({
      where: { role: 'LAWYER', lawyerProfile: { is: { isVerified: false } } },
      select: { id: true, name: true, email: true, lawyerProfile: true }
    });
    res.json(lawyers);
  } catch (error) {
    console.error('Error fetching unverified lawyers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.verifyLawyer = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const profile = await prisma.lawyerProfile.findUnique({ where: { userId: lawyerId } });
    if (!profile) return res.status(404).json({ error: 'Lawyer profile not found' });

    await prisma.lawyerProfile.update({
      where: { userId: lawyerId },
      data: { isVerified: true }
    });

    res.json({ message: 'Lawyer verified successfully' });
  } catch (error) {
    console.error('Error verifying lawyer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        client: { select: { name: true, email: true } },
        lawyer: { select: { name: true, email: true } }
      },
      orderBy: { scheduledAt: 'desc' }
    });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count({ where: { role: 'CLIENT' } });
    const totalLawyers = await prisma.user.count({ where: { role: 'LAWYER' } });
    const pendingVerifications = await prisma.lawyerProfile.count({ where: { isVerified: false } });
    const totalAppointments = await prisma.appointment.count();

    const recentAppointments = await prisma.appointment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        client: { select: { name: true } },
        lawyer: { select: { name: true } }
      }
    });

    const appointmentsByStatusRaw = await prisma.appointment.groupBy({
      by: ['status'],
      _count: { id: true }
    });

    const appointmentsByStatus = appointmentsByStatusRaw.map(item => ({
      name: item.status,
      value: item._count.id
    }));

    // Mock 6-month trend data for visual charts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const trendData = months.map(month => ({
      name: month,
      consultations: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 5000) + 1000
    }));

    res.json({
      totalUsers,
      totalLawyers,
      pendingVerifications,
      totalAppointments,
      recentAppointments,
      trendData,
      appointmentsByStatus
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
