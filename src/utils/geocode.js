const request = require("postman-request");

const geoCode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiYWxva2FzIiwiYSI6ImNrNng3aGphajBpdzkzb283N21lYXc5YW8ifQ.-wbj2x4VRcFGVdnuv6PAZQ&limit=1`;

	request({ url, json: true }, (error, response, body) => {
		if (error) {
			callback("Unable to connect to location Services");
		} else if (body.features.length === 0) {
			callback("Unable to find location. Try another location");
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geoCode;
