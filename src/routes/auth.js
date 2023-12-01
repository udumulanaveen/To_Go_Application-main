const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();

router.post('/signup', async (req, res) => {
	const { name, password, email, address, number, role, bankName, accNo, routingNo } = req.body;
	const fields = [name, password, email, number, role];
	for (let field of fields) {
		if (!field) return res.json({ success: false, message: 'Please fill required fields.!' });
	}
	const userInst = new User({
		name,
		password: await User.encryptPassword(password),
		email,
		address,
		number,
		role,
		bankName,
		accNo,
		routingNo,
	});
	await userInst.save();

	return res.json({ success: true });
});

router.post('/login', async (req, res) => {
	const userFound = await User.findOne({ email: req.body.email });

	if (!userFound) return res.json({ success: false, message: 'User Not Found' });

	const matchPassword = await User.comparePassword(req.body.password, userFound.password);

	if (!matchPassword)
		return res.json({
			success: false,
			token: null,
			message: 'Invalid Password',
		});

	const oneDayInSeconds = 86400;

	const token = jwt.sign({ id: userFound._id }, "JKASLCMAKSLMC", {
		expiresIn: oneDayInSeconds,
	});

	return res.json({ success: true, token: token, user: userFound });
});

module.exports = router;
