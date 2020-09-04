var citySearch;
daynTime= moment().format('MMMM Do YYYY, h:mm:ss a'); 
var searchHistory = []

// Button to Call
 $(".btn").click(function(e){
     e.preventDefault()
     citySearch = $("#query").val()
     const currentCity = searchHistory.find( city => city.name === citySearch)
     if(!currentCity){
        getWeather(citySearch)
        get5Day(citySearch)
        $(".currentTime").html(" " + daynTime)
     } else{
        currentWeatherDisplay(currentCity)
        getWeather(citySearch)
        get5Day(citySearch)
     }
 });

//Current City Weather
function getWeather(citySearch) {
  
    const cityButton = document.createElement('button')
        cityButton.setAttribute('id', 'searchRecall') 
        cityButton.style.backgroundColor = "teal";
        cityButton.style.color = "white"; 
        cityButton.textContent = citySearch
        cityButton.addEventListener('click', handleCityClick)
    $(".searchHistory").append(cityButton)

    // Setup url for api
    var apiKey = "8508d545d4e36b4c3c13e5d8071e830e";
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`
    // Making call to API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // Data API returns to us
    .then(function(response){
    console.log("Weather Stats " + citySearch + " : ", response);

    const cityObject = {
        name: citySearch,
        temp: response.main.temp,
        sky: response.weather[0].description,
        speed: response.wind.speed,
        humidity: response.main.humidity,
        lat: response.coord.lat,
        lon: response.coord.lon,

    }
    searchHistory.push(cityObject)
   
    // Pass weather data to 
    currentWeatherDisplay(cityObject)
    getUVindex(cityObject)
    $(".searchHistory").push(citySearch)
    })
  
 }

 //Get's 5 Day forcast for search city
 function get5Day(){

    var apiKey = "8508d545d4e36b4c3c13e5d8071e830e";
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}&units=imperial`;
    
        $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log("5 Day Forcast " + citySearch + ":" , response);

        const forcastData = {

                Date1: response.list[10].dt_txt,
                Date2: response.list[18].dt_txt,
                Date3: response.list[26].dt_txt,
                Date4: response.list[34].dt_txt,
                Date5: response.list[39].dt_txt,
                temp1: response.list[10].main.temp,
                temp2: response.list[18].main.temp,
                temp3: response.list[26].main.temp,
                temp4: response.list[34].main.temp,
                temp5: response.list[39].main.temp,
                Skycond1: response.list[10].weather[0].description,
                Skycond2: response.list[18].weather[0].description,
                Skycond3: response.list[26].weather[0].description,
                Skycond4: response.list[34].weather[0].description,
                Skycond5: response.list[39].weather[0].description,
                Humidity1: response.list[10].main.humidity,
                Humidity2: response.list[18].main.humidity,
                Humidity3: response.list[26].main.humidity,
                Humidity4: response.list[34].main.humidity,
                Humidity5: response.list[39].main.humidity,
                icon: response.list[10].weather[0].icon,
                icon: response.list[18].weather[0].icon,
                icon: response.list[26].weather[0].icon,
                icon: response.list[34].weather[0].icon,
                icon: response.list[39].weather[0].icon,
               
        }
        console.log(Date1)

    })
    
 }

// Gets UV Index and Populates
    function getUVindex(cityObject){
        var apiKey = "8508d545d4e36b4c3c13e5d8071e830e";
        var queryURL = `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=${apiKey}&lat=${cityObject.lat}&lon=${cityObject.lon}&cnt=6`;

    $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
        console.log("UV Index " + citySearch + " : " + (response[0].value))

        $(".uvIndex").html("UV Index: " + (response[0].value))

     })        
 };

 // Displaying current Weather
    function currentWeatherDisplay(currentCity) {
        $(".currentCity").html("City: " + currentCity.name)
        $(".currentTemp").html("Tempature: " + currentCity.temp)
        $(".humidity").html("Humidity: " + currentCity.humidity)
        $(".windSpeed").html("Wind Speed : " + currentCity.speed + "mph")
        $(".currentSky").html("Sky Conditions : " + currentCity.sky)
}

// Handles Click Event & Runs Check
function handleCityClick(event){
    event.preventDefault()
    const currentCity = searchHistory.find( city => city.name === event.target.textContent)
    console.log(currentCity)
    currentWeatherDisplay(currentCity)
    //getWeather(citySearch)
    getUVindex(currentCity)
 }
    

