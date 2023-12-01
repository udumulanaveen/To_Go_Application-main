const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
	{
		customerId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			autopopulate: { select: 'name email number role' },
		},
		deliveryExecutiveId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			autopopulate: { select: 'name email number role' },
		},
		amount: {
			type: String,
		},
		paid: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
			default: 'UNASSIGNED',
		},
		pickupLocation: {
			type: String,
		},
		dropLocation: {
			type: String,
		},
		instructions: {
			type: String,
		},
		rated: {
			type: Boolean,
			default: false,
		},
		rated_customer: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

OrderSchema.plugin(require('mongoose-autopopulate'));

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
