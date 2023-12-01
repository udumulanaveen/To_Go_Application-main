const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LiveSupportSchema = new Schema(
	{
		userEmail: {
			type: String
		},
		issue: {
			type: String,
		},

	},
	{
		timestamps: true,
		versionKey: false,
	},
);

LiveSupportSchema.plugin(require('mongoose-autopopulate'));

const LiveSupport = mongoose.model('LiveSupport', LiveSupportSchema);

module.exports = LiveSupport;
