const express = require('express');
const router = express.Router();
const {
  askQuestion,
  getSuggestions,
  quickHelp
} = require('../controllers/chatbotController');
const { protect } = require('../middleware/auth');

router.post('/ask', protect, askQuestion);
router.get('/suggestions/:courseId', protect, getSuggestions);
router.post('/quick-help', protect, quickHelp);

module.exports = router;
