var citySearch;
var currentCity;
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
        icon: response.weather[0].icon,
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
 function get5Day(citySearch){

    var apiKey = "8508d545d4e36b4c3c13e5d8071e830e";
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}&units=imperial`;
    
        $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log("5 Day Forecast " + citySearch + ":" , response);

        const forecastData = {

                Date1: response.list[4].dt_txt,
                Date2: response.list[12].dt_txt,
                Date3: response.list[20].dt_txt,
                Date4: response.list[28].dt_txt,
                Date5: response.list[36].dt_txt,
                temp1: response.list[4].main.temp,
                temp2: response.list[12].main.temp,
                temp3: response.list[20].main.temp,
                temp4: response.list[28].main.temp,
                temp5: response.list[36].main.temp,
                Skycond1: response.list[4].weather[0].description,
                Skycond2: response.list[12].weather[0].description,
                Skycond3: response.list[20].weather[0].description,
                Skycond4: response.list[28].weather[0].description,
                Skycond5: response.list[36].weather[0].description,
                Humidity1: response.list[4].main.humidity,
                Humidity2: response.list[12].main.humidity,
                Humidity3: response.list[20].main.humidity,
                Humidity4: response.list[28].main.humidity,
                Humidity5: response.list[36].main.humidity,
                icon1: response.list[4].weather[0].icon,
                icon2: response.list[12].weather[0].icon,
                icon3: response.list[20].weather[0].icon,
                icon4: response.list[28].weather[0].icon,
                icon5: response.list[36].weather[0].icon,
               
        }
        console.log(forecastData)

        current5DayDisplay(forecastData)
        

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

//  Displays 5 Day
    function current5DayDisplay(forecastData){
        var iconurl1 = "http://openweathermap.org/img/wn/" + forecastData.icon1 + "@2x.png"
        var iconurl2 = "http://openweathermap.org/img/wn/" + forecastData.icon2 + "@2x.png"
        var iconurl3 = "http://openweathermap.org/img/wn/" + forecastData.icon3 + "@2x.png"
        var iconurl4 = "http://openweathermap.org/img/wn/" + forecastData.icon4 + "@2x.png"
        var iconurl5 = "http://openweathermap.org/img/wn/" + forecastData.icon5 + "@2x.png"
        $(".Date1").html("Date: " + forecastData.Date1)
        $(".Date2").html("Date: " + forecastData.Date2)
        $(".Date3").html("Date: " + forecastData.Date3)
        $(".Date4").html("Date: " + forecastData.Date4)
        $(".Date5").html("Date: " + forecastData.Date5)
        $(".temp1").html("Temp: " + forecastData.temp1)
        $(".temp2").html("Temp: " + forecastData.temp2)
        $(".temp3").html("Temp: " + forecastData.temp3)
        $(".temp4").html("Temp: " + forecastData.temp4)
        $(".temp5").html("Temp: " + forecastData.temp5)
        $(".Skycond1").html("Sky Conditions: " + forecastData.Skycond1)
        $(".Skycond2").html("Sky Conditions: " + forecastData.Skycond2)
        $(".Skycond3").html("Sky Conditions: " + forecastData.Skycond3)
        $(".Skycond4").html("Sky Conditions: " + forecastData.Skycond4)
        $(".Skycond5").html("Sky Conditions: " + forecastData.Skycond5)
        $(".Humidity1").html("Humidity: " + forecastData.Humidity1)
        $(".Humidity2").html("Humidity: " + forecastData.Humidity2)
        $(".Humidity3").html("Humidity: " + forecastData.Humidity3)
        $(".Humidity4").html("Humidity: " + forecastData.Humidity4)
        $(".Humidity5").html("Humidity: " + forecastData.Humidity5)
        $("#wicon1").attr('src', iconurl1)
        $("#wicon2").attr('src', iconurl2)
        $("#wicon3").attr('src', iconurl3)
        $("#wicon4").attr('src', iconurl4)
        $("#wicon5").attr('src', iconurl5)
    }
        
    
 // Displaying current Weather
    function currentWeatherDisplay(currentCity) {
        var iconurl = "http://openweathermap.org/img/wn/" + currentCity.icon + "@2x.png"
        $(".currentCity").html("City: " + currentCity.name)
        $(".currentTemp").html("Tempature: " + currentCity.temp)
        $(".humidity").html("Humidity: " + currentCity.humidity)
        $(".windSpeed").html("Wind Speed : " + currentCity.speed + "mph")
        $(".currentSky").html("Sky Conditions : " + currentCity.sky)
        $('#wicon').attr('src', iconurl);
}

// Handles Click Event & Runs Check
function handleCityClick(event){
    event.preventDefault()
    const currentCity = searchHistory.find( city => city.name === event.target.textContent)
    console.log(currentCity)
    currentWeatherDisplay(currentCity)
    getUVindex(currentCity)
    
 }
    

