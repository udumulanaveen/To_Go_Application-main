const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			ref: 'Order',
		},
		deliveryExecutiveId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			autopopulate: { select: 'name email number role' },
		},
		rating: {
			type: Number,
		},
		feedback: {
			type: String,
		},
		rewards:{
			type: Number,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

ratingSchema.plugin(require('mongoose-autopopulate'));

const Rating = mongoose.model('rating', ratingSchema);

module.exports = Rating;
