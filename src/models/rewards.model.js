const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RewardsSchema = new Schema(
	{
		userId: {
			type: String
		},
		rewards: {
			type: Number,
		},

	},
	{
		timestamps: true,
		versionKey: false,
	},
);

RewardsSchema.plugin(require('mongoose-autopopulate'));

const Reward = mongoose.model('Rewards', RewardsSchema);

module.exports = Reward;
