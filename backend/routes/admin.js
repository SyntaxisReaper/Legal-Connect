const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/lawyers/unverified', authenticate, authorize('ADMIN'), adminController.getUnverifiedLawyers);
router.patch('/lawyers/:lawyerId/verify', authenticate, authorize('ADMIN'), adminController.verifyLawyer);
router.get('/appointments', authenticate, authorize('ADMIN'), adminController.getAllAppointments);
router.get('/stats', authenticate, authorize('ADMIN'), adminController.getDashboardStats);
router.get('/users', authenticate, authorize('ADMIN'), adminController.getAllUsers);

module.exports = router;
