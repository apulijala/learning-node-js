const axios = require('axios');
const weatherUrl = "https://api.darksky.net/forecast/022c2a80569f7ca11244b634457b10f4/";

let weather = (lat, long) => {

 //    let weatherUrlCoords = weatherUrl + lat + "," + long;
    let weatherUrlCoords = "https://api.darksky.net/forecast/022c2a80569f7ca11244b634457b10f4/aa";
    axios.get(weatherUrlCoords).
    then((response) => {
       // console.log(response);
    })
    .catch((error) => {
        console.log(error.message);
    }); 
    
    
}

module.exports = {
    weather
}