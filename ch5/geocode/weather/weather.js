const weatherUrl = "https://api.darksky.net/forecast/022c2a80569f7ca11244b634457b10f4/";
const request = require('request');

var Weather = (lat, long, callback) => {
    let weatherUrlLatLong = weatherUrl + lat + "," + long;
    request({
        url : weatherUrlLatLong,
        json : true
    }, 
    (error, response, body) => 
    {
        if (error){
                callback("Wether Server is down. Please try again.");
                return;
        }else if (response.statusCode == 400) {
            callback(body.error);
        }
        else if (response.statusCode == 200)  {
                let result = {
                    temperature : body.currently.temperature,
                    apparentTemperature : body.currently.apparentTemperature
                };
                callback(undefined, result)
        }
    }
    );
}

module.exports = {
    Weather
}