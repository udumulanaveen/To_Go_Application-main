const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
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
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

CardSchema.plugin(require('mongoose-autopopulate'));

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
