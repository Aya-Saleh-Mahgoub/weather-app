"use strict"
// forecast-today
let search = document.getElementById("find"),
currentDay = document.getElementById("current-day"),
currentDate = document.getElementById("current-date"),
cityLocation = document.getElementById("location"),
currentDeg = document.getElementById("current-degree"),
currentIcon = document.getElementById("current-icon"),
currentDesc = document.getElementById("current-desc"),
humidty = document.getElementById("humidty"),
wind = document.getElementById("wind"),
compass = document.getElementById("compass");

// Next-forecast
let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDeg = document.getElementsByClassName("maxDeg"),
minDeg = document.getElementsByClassName("minDeg"),
nextDayDesc = document.getElementsByClassName("nextDay-desc"),

apiResponse,
responseData,

 days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]
let monthName =[
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
];

// current location function
let latitude;
let longitude;
let currentLocation;
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(p){
    latitude = p.coords.latitude;
    longitude = p.coords.longitude;
    currentLocation = latitude +','+ longitude;
    console.log(currentLocation);
    Bind(currentLocation);
}
//fetch API
async function getWeatherData(cityName){
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=91104460511c4da8b7d163108240107&q=${cityName}&days=3`);
    responseData = await apiResponse.json()
    console.log(responseData); // return data from API
   
    return responseData

}


function displayTodayWeather(data){
    let date = new Date();
    // console.log(monthName[date.getMonth()]);
    currentDay.innerHTML = days[date.getDay()]; // show day
    currentDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`; // show month
    cityLocation.innerHTML = data.location.name; // show location
    currentDeg.innerHTML = data.current.temp_c; // show temperature c
    currentIcon.setAttribute("src",`https:${data.current.condition.icon}`); // show icon
    currentDesc.innerHTML = data.current.condition.text;
    humidty.innerHTML = data.current.humidity;
    wind.innerHTML = data.current.wind_kph;
    compass.innerHTML = data.current.wind_dir;
}
// display next days data
function displayNextDayWeather(data){
    let forcastData = data.forecast.forecastday;
    console.log(forcastData);
    for(let i=0;i<2;i++){
        nextDay[i].innerHTML = days[new Date(forcastData[i+1].date).getDay()];
        maxDeg[i].innerHTML = forcastData[i+1].day.maxtemp_c;
        minDeg[i].innerHTML = forcastData[i+1].day.mintemp_c;
        nextDayIcon[i].setAttribute('src',`https:${forcastData[i+1].day.condition.icon}`);
        nextDayDesc[i].innerHTML = forcastData[i+1].day.condition.text
    }
}
// Bind functions
async function Bind(city){
    let weatherData = await getWeatherData(city);
    if(!weatherData.error){
        displayTodayWeather(weatherData);
        displayNextDayWeather(weatherData);
    }   
}

// search functionality
search.addEventListener("input", function(){
  console.log(search.value);
  Bind(search.value);
})



