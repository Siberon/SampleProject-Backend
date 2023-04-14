const Email = require("../models/email");

module.exports = {
	create: async (req, res) => {
		try {
			const { header, body, footer } = req.body;

			const user = await Email.create({ header, body, footer });

			return res.status(200).json({
				data: user,
				message: "ok",
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: error,
			});
		}
	},
	list: async (_, res) => {
		try {
			const user = await Email.findAll();

			return res.status(200).json({
				data: user,
				message: "ok",
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: error,
			});
		}
	},

	findById: async (req, res, next) => {
		try {
			const data = await Email.findOne({
				where: {
					id: req.params.id,
				},
			});

			if (!data) {
				return res.status(404).json({
					errors: "data not found",
				});
			}

			return res.status(201).json({
				data,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				message: err,
			});
		}
	},
	update: async (req, res, next) => {
		try {
			await Email.update(
				{
					header: req.body.header,
					body: req.body.body,
					footer: req.body.footer,
				},
				{
					where: {
						id: req.body.id,
					},
				}
			);

			return res.status(200).json({
				message: "Email successfully updated!",
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				message: err,
			});
		}
	},

	delete: async (req, res, next) => {
		try {
			await Email.destroy({ where: { id: req.body.id } });
			return res.status(200).json({
				message: "Email Successfully Deleted!",
			});
		} catch (err) {
			return res.status(500).json({
				message: err,
			});
		}
	},
};
