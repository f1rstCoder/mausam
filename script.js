const apiKey = `{Your API Key}`;
const DivContainer = document.getElementById("div-container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
let listOfCities = [];

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), {
    origin: "cros",
  });
  const respData = await resp.json();

  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = Ktoc(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("div-shadow");
  weather.classList.add("weather");
  weather.setAttribute("id", `${data.name}`);
  weather.innerHTML = `
          <div id="menu">
            <ul class="options">
                <li class="explore">Explore</li> 
                <li class="pin">Pin</li> 
                <li class="remove">Remove</li> 
            </ul>
          </div>        
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <div>${data.name}</div>
          <small>${data.weather[0].main}</small>
          
          `;

  localStorage.setItem(`${data.name}`, weather.innerHTML);
  DivContainer.appendChild(weather);

}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  const addList = city.toLowerCase();
  document.getElementById("search").value = "";
  if (city && !listOfCities.includes(`${addList}`)) {
    listOfCities.push(`${city}`);
    console.log(listOfCities);
    getWeatherByLocation(city);
  } else if (listOfCities.includes(`${addList}`)) {
    alert("This city has already been added. Please choose another city!");
  }
});
