// const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// const cryptPassword = async (password) => {
// 	const salt = await bcrypt.genSalt(5);
// 	return bcrypt.hash(password.toString(), salt);
// };

exports.register = async (req, res) => {
	try {
		// const { name, email, password, phone, role_id } = req.body;
		// const hash = await cryptPassword(password);
		// const data = await User.create({
		// 	name,
		// 	email,
		// 	password,
		// 	phone,
		// 	role_id,
		// });
		const user = new User({
			fullName: req.body.fullName,
			email: req.body.email,
			phone: req.body.phone,
			role: req.body.role,
			password: bcrypt.hashSync(req.body.password, 8),
		});
		await user.save();
		return res.status(200).json({
			message: "User Registered successfully",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: err,
		});
	}
};
exports.login = async (req, res) => {
	try {
		// const { email, password } = req.body;

		// const user = await User.findOne({
		// 	email,
		// });

		const user = await User.findOne({ email: req.body.email });

		// Comparing passwords
		// const passwordIsValid = bcrypt.compareSync(
		// 	req.body.password,
		// 	user.password
		// );
		// Checking if password was valid and send response accordingly
		if (req.body.password !== user.password) {
			return res.status(401).send({
				message: "Invalid Password!",
			});
		}

		if (user) {
			const token = jwt.sign(
				{
					id: user.id,
				},
				"This_is_very_secret_string",
				{
					expiresIn: 86400,
				}
			);

			return res.status(200).json({
				token,
				// message: "Successfully login!",
			});
		}

		return res.status(404).json({
			message: "User not found",
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
};

exports.getProfile = async (_, res, next) => {
	try {
		const user = await User.findOne({
			_id: res.user.id.id,
		});

		return res.status(201).json({
			data: user,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateProfile = async (req, res, next) => {
	try {
		const { fullName } = req.body;
		await User.updateOne(
			{ _id: res.user.id.id },
			{ $set: { fullName: fullName } }
		);

		return res.status(200).json({
			message: "Name successfully updated!",
		});
	} catch (err) {
		next(err);
	}
};

exports.otp = async (req, res, next) => {
	try {
		const { otp } = req.body;
		if (otp === "111111") {
			return res.status(200).json({
				message: "OTP is correct!",
			});
		}
	} catch (err) {
		next(err);
	}
};

exports.changePassword = async (req, res, next) => {
	try {
		const { password } = req.body;
		await User.updateOne(
			{ _id: res.user.id.id },
			{ $set: { password: password } }
		);

		return res.status(200).json({ message: "Password successsfully changed" });
	} catch (err) {
		next(err);
	}
};
exports.resetPassword = async (req, res, next) => {
	try {
		const { password } = req.body;

		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (!user) {
			return res.status(403).json({
				errors: "we don`t have any information for your account",
			});
		}

		await User.update(
			{
				password: await cryptPassword(password.toString()),
			},
			{
				where: {
					email: req.body.email,
				},
			}
		);

		return res.status(204).json();
	} catch (err) {
		next(err);
	}
};

exports.updateEmail = async (req, res, next) => {
	try {
		const { email } = req.body;
		await User.updateOne({ _id: res.user.id.id }, { $set: { email: email } });

		return res.status(200).json({
			message: "Email successfully updated!",
		});
	} catch (err) {
		next(err);
	}
};
