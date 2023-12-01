const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromoCodeSchema = new Schema(
	{
		userId: {
			type:String
		},
		amount: {
			type: String,
		},
		code: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

PromoCodeSchema.plugin(require('mongoose-autopopulate'));

const PromoCode = mongoose.model('PromoCode', PromoCodeSchema);

module.exports = PromoCode;
