const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=5a0fd449e1ae74928c13a91b3af11bdd&query=${encodeURIComponent(
		latitude
	)},${encodeURIComponent(longitude)}`;

	request({ url, json: true }, (error, response, body) => {
		if (error) {
			callback("Unable to connect to Weatherstack API, Check you connection");
		} else if (body.error) {
			callback("Inavlid Query Parameter, try another search");
		} else {
			callback(
				undefined,
				`The current temperature is ${body.current.temperature} degree celcius, and it feelslike ${body.current.feelslike}`
			);
		}
	});
};

module.exports = forecast;
