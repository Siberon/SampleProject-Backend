var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

/**
 * User Schema
 */
var roleSchema = new Schema({
	fullName: {
		type: String,
		required: [true, "fullname not provided "],
	},
});

module.exports = mongoose.model("Role", roleSchema);
