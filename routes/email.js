const express = require("express"),
	router = express.Router(),
	emailController = require("../controllers/emailController");

router.get("/", emailController.list);
router.post("/create", emailController.create);
router.put("/update", emailController.update);
router.get("/:id", emailController.findById);
router.delete("/delete", emailController.delete);

module.exports = router;
