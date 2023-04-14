const express = require("express"),
	router = express.Router(),
	{
		otp,
		login,
		getProfile,
		changePassword,
		resetPassword,
		updateEmail,
		updateProfile,
	} = require("../controllers/userController"),
	checkToken = require("../middleware/checkToken");

router.get("/", (_, res) =>
	res.status(200).json({
		message:
			"welcome to the user API section! This is a very secret place. Be quiet about it, or you'll die",
	})
);

router.post("/login", login);

router.get("/profile", checkToken, getProfile);

router.post("/otp", checkToken, otp);

router.post("/changePassword", checkToken, changePassword);

router.patch("/updateEmail", checkToken, updateEmail);

router.patch("/updateProfile", checkToken, updateProfile);

module.exports = router;
