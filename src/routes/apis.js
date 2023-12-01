const express = require('express');
const _ = require('lodash');
const Card = require('../models/card.modal');
const Complaint = require('../models/complaints.modal');
const CustomerRating = require('../models/customerrating.modal');
const Order = require('../models/order.modal');
const Payment = require('../models/payment.modal');
const PromoCode = require('../models/promocode.modal');
const Rating = require('../models/rating.modal');
const Reward = require('../models/rewards.model');
const User = require('../models/user.model');
const router = express.Router();

router.post('/complaint', async (req, res) => {
	const { name, email, orderId, description } = req.body;
	const fields = [name, email, orderId, description];
	for (let field of fields) {
		if (!field) return res.json({ success: false, message: 'Please fill required fields.!' });
	}
	const inst = new Complaint({
		name,
		email,
		orderId,
		description,
		email,
	});
	await inst.save();

	return res.json({ success: true });
});

router.put('/complaint/:id', async (req, res) => {
	const { id } = req.params;

	const complaint = await Complaint.findById(id);
	complaint.status = complaint.status === 'RESOLVED' ? 'UNRESOLVED' : 'RESOLVED';
	await complaint.save();

	return res.json({ success: true, complaints: await Complaint.find() });
});

router.get('/complaints', async (req, res) => {
	return res.json({ success: true, complaints: await Complaint.find({}) });
});

router.get('/customers', async (req, res) => {
	return res.json({ success: true, customers: await User.find({ role: 'CUSTOMER' }) });
});

router.get('/executives', async (req, res) => {
	return res.json({ success: true, executives: await User.find({ role: 'DELIVERY_EXECUTIVE' }) });
});

router.get('/getDelExeRewards/:id', async (req, res) => {
	const ratings = await Rating.find({ deliveryExecutiveId: req.params.id });

	let s = 0;
	let l = 1;
	let avgRating = 0;
	let reward = 0;
	if(ratings){
		ratings.forEach((r) => {
			s = s + r.rating;
			reward = reward + r.rewards
		});
		l = ratings.length;
		avgRating = s/l;
		
	}
	return res.json({ success: true, avgRating: avgRating, rewards: reward });
});

router.get('/getCustomerRewards/:id', async (req, res) => {
	const payments = await Payment.find({ userId: req.params.id });


	let reward = 0;
	if(payments){
		payments.forEach((p) => {
			
			reward = reward + p.rewards
		});
		
		
	}
	const ratings = await CustomerRating.find({ userId: req.params.id });

	let s = 0;
	let l = 1;
	let avgRating = 0;
	if(ratings){
		ratings.forEach((r) => {
			s = s + r.rating;
			
		});
		l = ratings.length;
		avgRating = s/l;
		
	} 
	console.log(reward);
	return res.json({ success: true,rewards: reward, rating: avgRating });
});

router.delete('/user/:id', async (req, res) => {
	return res.json({ success: true, executives: await User.deleteOne({ _id: req.params.id }) });
});

router.post('/order', async (req, res) => {
	const { pickupLocation, dropLocation, customerId, instructions } = req.body;
	const fields = [pickupLocation, dropLocation, customerId, instructions];
	for (let field of fields) {
		if (!field) return res.json({ success: false, message: 'Please fill required fields.!' });
	}

	const distance = _.random(1, 20);
	const inst = new Order({
		pickupLocation,
		dropLocation,
		customerId,
		amount: distance * 1.5 + 5,
		instructions,
	});
	await inst.save();
	return res.json({ success: true, orderId: inst._id });
});

router.get('/order/:id', async (req, res) => {
	return res.json({ success: true, order: await Order.findOne({ _id: req.params.id }) });
});

router.put('/order', async (req, res) => {
	const { id, deliveryExecutiveId } = req.body;

	const order = await Order.findById(id);
	order.deliveryExecutiveId = deliveryExecutiveId;
	order.status = 'INPROGRESS';
	await order.save();
	return res.json({ success: true, order: await Order.find() });
});

router.post('/order-payment/:orderId', async (req, res) => {
	const { userId, orderId, firstName, lastName, email, nameOnCard, cardNo, validThru, cvv, amount, promocode, rewards } = req.body;
	const fields = [userId, orderId, firstName, lastName, email, nameOnCard, cardNo, validThru, cvv, amount, rewards];
	for (let field of fields) {
		if (!field) return res.json({ success: false, message: 'Please fill required fields.!' });
	}
	const order = await Order.findById(orderId);
	order.paid = true;
	await order.save();

	let paid = amount;
	if (promocode) {
		let disc = await PromoCode.findOne({ code: promocode });
		if (disc) paid = +amount - +disc.amount;
		const odr = await Order.findById(orderId);
		odr.amount = paid;
		await odr.save();
		await PromoCode.deleteOne({ code: promocode });
	}
	const inst = new Payment({
		userId,
		orderId,
		firstName,
		lastName,
		email,
		nameOnCard,
		cardNo,
		validThru,
		cvv,
		amount: paid,
		rewards
	});
	await inst.save();
	return res.json({ success: true });
});

router.post('/order-rating/:orderId', async (req, res) => {
	const { deliveryExecutiveId, orderId, rating, feedback } = req.body;
	const fields = [deliveryExecutiveId, orderId, rating, feedback];
	for (let field of fields) {
		if (!field) return res.json({ success: false, message: 'Please fill required fields.!' });
	}
	const order = await Order.findById(orderId);
	order.rated = true;
	await order.save();

	let rewards;
	if(rating <=5 && rating > 4){
		rewards = 30;
	}
	else if(rating <=4 && rating > 3){
		rewards = 10;
	}
	else if(rating <=3 && rating > 2){
		rewards = 5;
	}
	else {
		rewards = 0;
	}

	const inst = new Rating({
		deliveryExecutiveId,
		orderId,
		rating,
		feedback,
		rewards
	});
	await inst.save();
	return res.json({ success: true });
});

router.post('/customer-rating/:orderId', async (req, res) => {
	const { customerId, orderId, rating, feedback } = req.body;
	const fields = [customerId, orderId, rating, feedback];
	for (let field of fields) {
		if (!field) return res.json({ success: false, message: 'Please fill required fields.!' });
	}
	const order = await Order.findById(orderId);
	order.rated_customer = true;
	await order.save();
	const inst = new CustomerRating({
		customerId,
		orderId,
		rating,
		feedback
	});
	await inst.save();
	return res.json({ success: true });
});

router.get('/orders/:userId', async (req, res) => {
	const { userId } = req.params;
	let orders = [];
	if (userId === 'all') {
		orders = await Order.find();
	} else {
		orders = await Order.find({ $or: [{ deliveryExecutiveId: userId }, { customerId: userId }] });
	}
	return res.json({ success: true, orders });
});

router.get('/cards/:userId', async (req, res) => {
	const { userId } = req.params;
	const cards = await Card.find({ userId });
	return res.json({ success: true, cards });
});

router.get('/promoCodes/:userId', async (req, res) => {
	const { userId } = req.params;
	const promos = await PromoCode.find({ userId });
	return res.json({ success: true, promos });
});

router.post('/card/:userId', async (req, res) => {
	const { userId } = req.params;
	const { nameOnCard, cardNo, validThru, cvv } = req.body;
	const fields = [userId, nameOnCard, cardNo, validThru, cvv];
	for (let field of fields) {
		if (!field) return res.json({ success: false, message: 'Please fill required fields.!' });
	}
	const inst = new Card({
		userId,
		nameOnCard,
		cardNo,
		validThru,
		cvv,
	});
	const card = await Card.findOne({_id: req.body._id});
	if(card) {
		await Card.updateOne({_id: req.body._id}, {$set:req.body});
	}else{

		await inst.save();
	}
	return res.json({ success: true });
});

router.delete('/card/:cardId', async (req, res) => {
	const { cardId } = req.params;
	await Card.deleteOne({ _id: cardId });
	return res.json({ success: true});
});

router.get('/user/:userId', async (req, res) => {
	const { userId } = req.params;
	let user = await User.findById(userId);

	return res.json({ success: true, user });
});

router.put('/user/:userId', async (req, res) => {
	const { userId } = req.params;
	const { name, email, number, address, address2 } = req.body;
	const fields = [name, email, number, address];
	for (let field of fields) {
		if (!field) return res.json({ success: false, message: 'Please fill required fields.!' });
	}

	await User.updateOne({ _id: userId }, { name, email, number, address, address2 });
	return res.json({ success: true, user: await User.findById(userId) });
});

router.get('/unassigned-orders', async (req, res) => {
	let orders = await Order.find({ status: 'UNASSIGNED' });
	return res.json({ success: true, orders });
});

router.put('/order-assign/:orderId/:userId', async (req, res) => {
	let order = await Order.updateOne(
		{ _id: req.params.orderId },
		{ status: 'INPROGRESS', deliveryExecutiveId: req.params.userId },
	);
	return res.json({ success: true, order });
});

router.put('/mark-as-delivered/:orderId/:userId', async (req, res) => {
	let order = await Order.updateOne(
		{ _id: req.params.orderId },
		{ status: 'DELIVERED', deliveryExecutiveId: req.params.userId },
	);
	return res.json({ success: true, order });
});

router.get('/payments/:userId', async (req, res) => {
	const { userId } = req.params;
	let orders = await Order.find({ $or: [{ deliveryExecutiveId: userId }, { customerId: userId }] });

	const payments = await Payment.find({ orderId: { $in: orders.map((o) => o._id) } });
	return res.json({ success: true, payments });
});

router.put('/bankDetails/:userId', async (req, res) => {
	const { userId } = req.params;
	let user = await User.findById(userId);
	const { bankName, accNo, routingNo } = req.body;
	const fields = [bankName, accNo, routingNo];
	for (let field of fields) {
		if (!field) return res.json({ success: false, message: 'Please fill required fields.!' });
	}
	user.bankName = bankName;
	user.accNo = accNo;
	user.routingNo = routingNo;
	await user.save();

	return res.json({ success: true, user: await User.findById(userId) });
});

router.post('/redeemPoints', async (req, res) => {
	const { user, rewards } = req.body;
	console.log(req.body);
	if (!rewards) return res.json({ success: false, message: 'Invalid Request' });
	const userId = user._id;
	const existingReward = await Reward.findOne({userId: userId});
	if(existingReward){
		let points = existingReward.rewards + rewards;
		await Reward.updateOne({_id: existingReward._id}, {$set:{rewards: points}});
		await Rating.updateMany({deliveryExecutiveId: userId}, {$set:{rewards: 0}});
	}else {
		console.log("----");
	const reward = new Reward({
		userId, rewards
	});
	await reward.save();
	}

	return res.json({ success: true });
});

router.post('/generatePromoCode', async (req, res) => {
	const { user, rewards } = req.body;
	console.log(req.body);
	if (!rewards) return res.json({ success: false, message: 'Invalid Request' });
	const userId = user._id;
	const promoCode = new PromoCode({
		userId: userId, amount: rewards, code: (Math.random() + 1).toString(36).substring(7)
	})
	await Payment.updateMany({userId: userId}, {$set:{rewards: 0}});
	await promoCode.save();

	return res.json({ success: true });
});

router.get('/rewards/:userId', async (req, res) => {
	const { userId } = req.params;
	const reward = await Reward.findOne({ userId });
	return res.json({ success: true, reward });
});

module.exports = router;
