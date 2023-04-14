var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

/**
 * User Schema
 */
var emailSchema = new Schema({
	header: {
		type: String,
		required: [true, "header not provided "],
	},
	body: {
		type: String,
		required: [true, "body not provided"],
	},
	footer: {
		type: String,
		required: [true, "footer not provided"],
	},
});

module.exports = mongoose.model("Email", emailSchema);
