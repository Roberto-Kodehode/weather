const apiKey = "5dfe707e3609b9fe564a7dd32a481d85";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block ";
  } else {
    document.querySelector(".error").style.display = "none";

    let data = await response.json();

    console.log(data);

    cityName = document.querySelector(".city");
    cityName.textContent = data.name;

    weatherDescription = document.querySelector(".weather-description");
    weatherDescription.textContent = data.weather[0].description;

    temp = document.querySelector(".temp");
    temp.textContent = Math.round(data.main.temp) + "°C";

    humidity = document.querySelector(".humidity");
    humidity.textContent = data.main.humidity + " %";

    wind = document.querySelector(".wind");
    wind.textContent = Math.round(data.wind.speed) + " km/h";

    const weatherIcons = {
      Clouds: "clouds.png",
      Clear: "clear.png",
      Rain: "rain.png",
      Drizzle: "drizzle.png",
      Mist: "mist.png",
      Snow: "snow.png",
    };

    const weatherMain = data.weather[0].main;

    weatherIcon.src = `images/${weatherIcons[weatherMain]}`;
  }
}

const searchBox = document.querySelector(".my-input");
searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const city = searchBox.value.trim();
    if (city !== "") {
      checkWeather(city);
    }
  }
});

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});
