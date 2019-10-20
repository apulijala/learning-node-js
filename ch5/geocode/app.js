const yargs = require("yargs");
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

yargs.options({
    a : {
        demand : true,
        description : "Address to fetch weather for",
        alias : "address"
    }
}).help().
alias('help', 'h').
argv;

let argv  = yargs.argv;
let address = argv.address;

geocode.geocode(address, (errorMessage, result ) =>  {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        
        weather.Weather(result.latitude,result.longitude, (errorMsg, weather) => {
            if (errorMsg) {
                console.log(errorMsg);
            }else {
                console.log(`${result.fullAddress}`);
                console.log(`It's currently ${weather.temperature}. It feels like ${weather.apparentTemperature}`);
            }

        });
    }
});





