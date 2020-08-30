var apiKey = "8508d545d4e36b4c3c13e5d8071e830e"
var userLocation 


getWeather()
 
function getWeather(city)
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q={Austin}&appid={8508d545d4e36b4c3c13e5d8071e830e}`

    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response));
     console.log(response);
    
        