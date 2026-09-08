const prisma = require('../prismaClient');

exports.bookAppointment = async (req, res) => {
  try {
    const { lawyerId, scheduledAt, notes, type } = req.body;
    const clientId = req.user.userId;
    const documentUrl = req.file ? req.file.path : null;

    if (!lawyerId || !scheduledAt) {
      return res.status(400).json({ error: 'Lawyer ID and scheduled date are required' });
    }

    const bookingDate = new Date(scheduledAt);
    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format provided.' });
    }

    if (bookingDate < new Date()) {
      return res.status(400).json({ error: 'Cannot book an appointment in the past.' });
    }

    // Check if lawyer exists
    const lawyer = await prisma.user.findUnique({
      where: { id: lawyerId, role: 'LAWYER' }
    });
    if (!lawyer) {
      return res.status(404).json({ error: 'Lawyer not found or invalid.' });
    }

    // Check for overlapping appointments (within 30 minutes)
    const thirtyMinsBefore = new Date(bookingDate.getTime() - 30 * 60000);
    const thirtyMinsAfter = new Date(bookingDate.getTime() + 30 * 60000);

    const conflictingAppt = await prisma.appointment.findFirst({
      where: {
        lawyerId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        scheduledAt: {
          gte: thirtyMinsBefore,
          lt: thirtyMinsAfter
        }
      }
    });

    if (conflictingAppt) {
      return res.status(409).json({ error: 'The lawyer is already booked around this time. Please select another slot.' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientId,
        lawyerId,
        scheduledAt: bookingDate,
        type: type || 'VIDEO',
        notes,
        documentUrl
      }
    });

    res.status(201).json({ message: 'Appointment requested successfully', appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const { userId, role } = req.user;
    
    let appointments;
    if (role === 'LAWYER') {
      appointments = await prisma.appointment.findMany({
        where: { lawyerId: userId },
        include: {
          client: { select: { name: true, email: true } }
        },
        orderBy: { scheduledAt: 'asc' }
      });
    } else {
      appointments = await prisma.appointment.findMany({
        where: { clientId: userId },
        include: {
          lawyer: { select: { name: true, email: true } }
        },
        orderBy: { scheduledAt: 'asc' }
      });
    }

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const { userId, role } = req.user;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (role === 'LAWYER' && appointment.lawyerId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (role === 'CLIENT' && appointment.clientId !== userId && status !== 'CANCELLED') {
      return res.status(403).json({ error: 'Clients can only cancel their appointments' });
    }

    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status }
    });

    res.json({ message: 'Appointment updated', appointment: updated });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.downloadDocument = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { userId, role } = req.user;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (role === 'CLIENT' && appointment.clientId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (role === 'LAWYER' && appointment.lawyerId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (!appointment.documentUrl) {
      return res.status(404).json({ error: 'No document attached to this appointment' });
    }

    const path = require('path');
    const absolutePath = path.resolve(__dirname, '..', appointment.documentUrl);
    res.download(absolutePath);
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
