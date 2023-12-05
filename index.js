const searchBtnEl = document.getElementById("searchBtn");
const inputBox = document.querySelector(".input-box");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
    const api_key = "df790748ccc3597673524b6c8dab2b26";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response=> response.json());


    if(weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        // console.log("error");
        return;
    }
    weather_body.style.display = "flex";
    location_not_found.style.display = "none";


    console.log(weather_data);

    temperature.innerHTML = `${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    windSpeed.innerHTML = `${weather_data.wind.speed}Km/H`;


 
        switch(weather_data.weather[0].main) {
            case `Clouds`:
                weatherImg.src = "./cloud.png" ;
                break;
            case `Clear`:
                weatherImg.src = "./clear.png" ;
                break;
            case `Rain`:
                weatherImg.src = "./rain.png" ;
                break;
            case `Mist`:
                weatherImg.src = "./mist.png" ;
                break;
            case `Snow`:
                weatherImg.src = "./snow.png";
                break;
        }

}


searchBtnEl.addEventListener("click", () => {
    checkWeather(inputBox.value);
})