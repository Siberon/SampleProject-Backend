const express = require("express"),
	app = express(),
	cors = require("cors"),
	mongoose = require("mongoose"),
	// { Sequelize } = require("sequelize"),
	router = require("./routes");

require("dotenv").config();

// -----Connect Sequalize------

// const sequelize = new Sequelize(
// 	process.env.DB_NAME,
// 	process.env.DB_USER,
// 	process.env.DB_PASSWORD,
// 	{
// 		HOST: "127.0.0.1",
// 		dialect: "mssql",
// 		// dialectOptions: {
// 		// 	port: 1433,
// 		// },
// 	}
// );

process.on("unhandledRejection", (error) => {
	console.log("unhandledRejection", error.message);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api", router);

app.get("*", (_, res) =>
	res.status(404).json({
		message: "404 Route Not Found",
	})
);

app.listen(process.env.PORT || 777, async () => {
	try {
		// await sequelize.authenticate();
		await mongoose.connect(
			`mongodb+srv://patrickchuangg:${process.env.DB_MONGOOSE_PASSWORD}@cluster0.3sv4dsj.mongodb.net/EmailRush`,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		);
		console.log("Connected to db & Server is running on port 777");
	} catch (error) {
		console.error("Unable to connect to the database, COULD BE YOU ARE CONNECTED TO AIA CORP WIFI :(", error);
	}
});
