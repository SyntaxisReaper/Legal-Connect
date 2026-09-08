const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/', authenticate, authorize('CLIENT'), upload.single('document'), appointmentController.bookAppointment);
router.get('/:appointmentId/document', authenticate, appointmentController.downloadDocument);
router.get('/', authenticate, appointmentController.getMyAppointments);
router.patch('/:appointmentId', authenticate, appointmentController.updateAppointmentStatus);

module.exports = router;
