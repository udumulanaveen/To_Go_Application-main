const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintsSchema = new Schema(
	{
		orderId: {
			type: String,
		},
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		status: {
			type: String,
			default: 'UNRESOLVED',
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

ComplaintsSchema.plugin(require('mongoose-autopopulate'));

const Complaint = mongoose.model('Complaint', ComplaintsSchema);

module.exports = Complaint;
