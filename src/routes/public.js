const express = require('express');
const jwt = require('jsonwebtoken');
const LiveSupport = require('../models/livesupport');
const router = express.Router();

router.post('/livesupport', async (req, res) => {
	const { issue, userEmail } = req.body;
	if (!issue) return res.json({ success: false, message: 'Please mention the issue.' });
	const LiveSupportInst = new LiveSupport({
		userEmail, issue
	});
	await LiveSupportInst.save();

	return res.json({ success: true });
});

router.get('/livesupports', async (req, res) => {
	return res.json({ success: true, livesupports: await LiveSupport.find() });
});

module.exports = router;
