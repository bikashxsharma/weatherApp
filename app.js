const KELVIN = 273;
const key = "c6596719a855a712b93ee31bce8d430e";

// setting weather data
let weatherData ={
    tempreature:{
        value:undefined,
        unit:"C"},
    description:"Partly cloudy",
    iconId:"03d",
    city:"London",
    country:"GB",
    }
// connecting to API



// Select html elements
const iconElement = document.querySelector(".weather-icon");
const tempValue = document.querySelector(".temp-value");
const tempDescription = document.querySelector(".temp-description");
const tempLocation = document.querySelector(".temp-location");
const notification =document.querySelector(".notification");


// get location enable location in user's browswer


function getLocation(){
 
    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    
    }
    else{
        notification.innerHTML ="<p>Geolocation is not supported by this browswer</p>";
    }

}
getLocation(); // function calls

//function to get latitude and longitude

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);

}

// get weather from API

function getWeather(latitude, longitude){

    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);

    fetch(api).then(function(response){
        let data = response.json();
        return data;

    })
    .then(function(data){
        weatherData.tempreature.value= Math.floor(data.main.temp - KELVIN);
        weatherData.description = data.weather[0].description;
        weatherData.iconId = data.weather[0].icon;
        weatherData.city = data.name;
        weatherData.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    })
}

//display weather function to display the weather from API
function displayWeather(){
    // function to change the element with object values

    iconElement.innerHTML =`<img src="icons/${weatherData.iconId}.png" alt="">`;
    tempValue.innerHTML =`${weatherData.tempreature.value}°<span>C</span>`;
    tempDescription.innerHTML =`<p>${weatherData.description}</p>`;
    tempLocation.innerHTML =`<p>${weatherData.city}, ${weatherData.country}</p>`;
    return;
}

// event listener & convert *C to *F

function celsiusToFahrenheit(tempCelsius){
        return (tempCelsius *(9/5))+32; 
        

}

// covert degree and chagne unit function

function changeTempDegree(){
    if(weatherData.tempreature.value === undefined) return;
    if(weatherData.tempreature.unit =="C"){
        let fahrenheit = celsiusToFahrenheit(weatherData.tempreature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempValue.innerHTML =`${fahrenheit}°<span>F</span>`;
        weatherData.tempreature.unit ="F";
        

    }
    else {
        tempValue.innerHTML =`${weatherData.tempreature.value}°<span>C</span>`;
        weatherData.tempreature.unit ="C";
    }   
    return;
}
// change value when clicked on temp value
tempValue.addEventListener("click", function(){
    changeTempDegree()

});

// change value when button is pressed
let convertButton = document.querySelector(".degree-convert");
convertButton.addEventListener("click", function(){
        changeTempDegree()
        if (weatherData.tempreature.unit =="F"){
            convertButton.innerHTML="Change to Celcius"; 

        }
        else {
            convertButton.innerHTML="Change to Fahrenheit"; 
        }

})


// show error if the user do not allow location

function showError(error){
    notification.innerHTML =`<p>${error.message}</p>`
}
