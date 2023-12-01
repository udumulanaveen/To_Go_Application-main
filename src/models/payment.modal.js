const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
	{
		userId: {
			type: String,
		},
		orderId: {
			type: Schema.Types.ObjectId,
			ref: 'Order',
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
		},
		nameOnCard: {
			type: String,
		},
		cardNo: {
			type: String,
		},
		validThru: {
			type: String,
		},
		cvv: {
			type: String,
		},
		amount: {
			type: String,
		},
		rewards: {
			type: Number
		}
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

PaymentSchema.plugin(require('mongoose-autopopulate'));

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
