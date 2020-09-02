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
     }
 });

//Current City Weather
function getWeather(citySearch) {
  
    const cityButton = document.createElement('button')
        cityButton.setAttribute('id', 'searchRecall') 
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
    console.log("Weather Stats : ", response);

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
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}`;
    
        $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log("5DAY: ", response);
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
        console.log((response[0].value))

        $(".uvIndex").html("UV Index : " + (response[0].value))

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
    currentWeatherDisplay(currentCity)
 }
    

