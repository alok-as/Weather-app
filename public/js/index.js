const form = document.querySelector(".form");
const field = document.querySelector(".form__field");
const button = document.querySelector(".form__button");

const messageOne = document.querySelector(".message-1");
const messageTwo = document.querySelector(".message-2");

const getForecast = (event) => {
	event.preventDefault();
	const location = field.value;
	messageOne.textContent = "...Loading";
	messageTwo.textContent = "";

	fetch(`/weather?address=${location}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		})
		.catch((error) => {
			console.error(error);
		});
};

form.addEventListener("submit", getForecast);
