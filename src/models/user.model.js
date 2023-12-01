const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			index: 1,
		},
		address: {
			type: String,
			required: false,
			trim: true,
		},
		address2: {
			type: String,
			required: false,
			trim: true,
		},
		number: {
			type: Number,
			required: false,
		},
		role: {
			type: String, //CUSTOMER DELIVERYEXECUTIVE ADMIN
			default: 'CUSTOMER',
		},
		bankName: {
			type: String,
			required: false,
			trim: true,
		},
		accNo: {
			type: String,
			required: false,
			trim: true,
		},
		routingNo: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

userSchema.statics.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
	return await bcrypt.compare(password, receivedPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
