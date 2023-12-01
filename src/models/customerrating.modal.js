const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerRatingSchema = new Schema(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			ref: 'Order',
		},
		customerId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			autopopulate: { select: 'name email number role' },
		},
		rating: {
			type: Number,
		},
		feedback: {
			type: String,
		}
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

customerRatingSchema.plugin(require('mongoose-autopopulate'));

const CustomerRating = mongoose.model('customer-rating', customerRatingSchema);

module.exports = CustomerRating;
