const express = require('express');
const router = express.Router();
const lawyerController = require('../controllers/lawyerController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', lawyerController.getLawyers);
router.get('/:id', lawyerController.getLawyerById);
router.post('/:id/reviews', authenticate, lawyerController.addReview);

module.exports = router;
