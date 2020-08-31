var citySearch;
daynTime= moment().format('MMMM Do YYYY, h:mm:ss a'); 


// Button to Call
 $(".btn").click(function(e){
     e.preventDefault()
     citySearch = $("#query").val()
    getWeather(citySearch)
    get5Day(citySearch)
    console.log(citySearch)
    $(".currentTime").append(" " + daynTime)
    getUVindex()
 });
    
 
// Displaying current Weather
function currentWeatherDisplay(weatherData) {
    
    $(".currentCity").append(citySearch)
    $(".currentTemp").append(weatherData.main.temp)
    $(".Humidity").append(weatherData.main.humidity)
    $(".windSpeed").append(weatherData.wind.speed)
    $(".currentSky").append(weatherData.weather[0].main)
    // $(".uvIndex").append()
}


//Current City Weather
function getWeather(citySearch) {
    // set up url for api
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
    // Pass weather data to 
    currentWeatherDisplay(response)
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


 function getUVindex(weatherData){

    var apiKey = "8508d545d4e36b4c3c13e5d8071e830e";
    var queryURL = `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=${apiKey}&lat=${weatherData.coord[1]}&lon=${weatherData.coord[0]}&cnt={6}`;
    
        $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log("UV index : ", response);

        })
    
 }