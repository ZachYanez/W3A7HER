var citySearch;
daynTime= moment().format('MMMM Do YYYY, h:mm:ss a'); 


// Button to Call
 $(".btn").click(function(e){
     e.preventDefault()
     citySearch = $("#query").val()
    getWeather(citySearch)
    get5Day(citySearch)
    console.log(citySearch)
    $(".currentTime").html(" " + daynTime)
   
    
 });
    
 
// Displaying current Weather
function currentWeatherDisplay(weatherData) {
    $(".currentCity").html("City: " + citySearch)
    $(".currentTemp").html("Tempature: " + weatherData.main.temp)
    $(".Humidity").html("Humidity: " + weatherData.main.humidity)
    $(".windSpeed").html("Wind Speed: " + weatherData.wind.speed + "mph")
    $(".currentSky").html("Sky Conditions: " + weatherData.weather[0].main)
    // var newDiv = document.createElement("div");
    // var previousSearch = $("#query").val();
    // newDiv.appendChild(previousSearch);
    // var newElement = document.getElementById(".searchHistory");
    // newElement.append(newDiv);
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
    getUVindex(response)
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
 function getUVindex(weatherData){
    var apiKey = "8508d545d4e36b4c3c13e5d8071e830e";
    var queryURL = `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=${apiKey}&lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&cnt=6`;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response[0].value)
        $(".uvIndex").append(response[0].value)
    });
    
 }