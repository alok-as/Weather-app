const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Config Paths
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setting up Template Engine Handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setting Static Assets folder
app.use(express.static(publicDir));

app.get("", (req, res) => {
	res.render("index", {
		title: "Homepage",
		name: "Alok Sharma",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
		name: "Alok Sharma",
	});
});

app.get("/help", (req, res) => {
	res.render("about", {
		title: "Help Page",
		name: "Alok Sharma",
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Alok Sharma",
		errorMessage: "Not a Valid Help Route",
	});
});

//Setting up Routes
app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Adress must be provided",
		});
	}

	geoCode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({
					error,
				});
			}

			forecast(latitude, longitude, (error, forecast) => {
				if (error) {
					return res.send({
						error,
					});
				}
				res.send({ forecast, location, address: req.query.address });
			});
		}
	);
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Alok Sharma",
		errorMessage: "Page Not Found",
	});
});

app.listen(port, () => {
	console.log(`App is running at port ${port}`);
});
