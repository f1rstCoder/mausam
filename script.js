const apiKey = `f1e47fec37226b7902d36122e739af1a`;
const DivContainer = document.getElementById("div-container");
const form = document.getElementById("form");
const search = document.getElementById("search");
const pinPress = document.getElementsByClassName("pin");
let listOfCities = [],
  flag = false;
window.addEventListener("offline", function () {
  alert("You are offline please turn on internet connection to run website");
});

function addMoreWeather() {}
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
  const weather = document.createElement("li");
  weather.id = data.name.toLowerCase();
  const h2 = document.createElement("h2");
  h2.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`;
  const divCreate = document.createElement("div");
  divCreate.innerHTML = `${data.name}`;
  const small = document.createElement("small");
  small.innerHTML = `${data.weather[0].main}`;
  weather.classList.add("div-shadow", "weather");

  weather.appendChild(h2);
  weather.appendChild(divCreate);
  weather.appendChild(small);

  localStorage.setItem(`${data.name}`, weather.innerHTML);
  DivContainer.appendChild(weather);

  // Preserve details even on page reload or browser and laptop shutdown
  // Find way to add notice if internet diconnected
  // automatically update content
  // deploy on netlify
}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

function showFunc(flag) {
  var x = document.getElementById("clear");
  var y = document.getElementById("clearAll");
  if (x.style.display === "none" && y.style.display === "none") {
    x.style.display = "inline";
    y.style.display = "inline";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = search.value;
  const addList = city.toLowerCase();
  document.getElementById("search").value = "";
  if (city && !listOfCities.includes(`${addList}`)) {
    flag = true;
    showFunc(flag);
    listOfCities.push(`${city}`);
    console.log(listOfCities);
    getWeatherByLocation(city);
  } else if (listOfCities.includes(`${addList}`)) {
    alert("This city has already been added. Please choose another city!");
  }
});

let clearBtnAll = document.getElementById("clearAll");
clearBtnAll.addEventListener("click", () => {
  document.getElementById("div-container").innerHTML = "";
  listOfCities = [];
});

let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  let clearCity = prompt("Which city do you want deleted?");
  clearCity.toLowerCase();
  const index = listOfCities.indexOf(clearCity);
  if (index > -1) {
    listOfCities.splice(index, 1);
    document.getElementById(clearCity).remove();
    console.log(listOfCities);
  } else {
    alert("No such city found!");
  }
});
