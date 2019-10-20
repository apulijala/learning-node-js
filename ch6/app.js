const yargs = require('yargs');
const axios = require('axios');


const locationUrl  = "http://www.mapquestapi.com/geocoding/v1/address?key=VYLcbhV3QQDnBESXT7tkdrf0O6ne4SSd&location=";
const weatherUrl = "https://api.darksky.net/forecast/022c2a80569f7ca11244b634457b10f4/";

yargs.options({
    a : {
        demand : true,
        description : "Address of the location"
    }
}).help().
alias("help", "h").alias("a", "address")
.argv;

argv = yargs.argv;
let locationUrlWithAddr = locationUrl + encodeURIComponent(argv.address);

axios.get(locationUrlWithAddr).then((response) => {
   let result = getAddressLine(response.data["results"][0]["locations"][0]);
   if (!result) {
     throw new Error(`Address location for ${argv.address} not found.`);
   }

   console.log(result.address);
   let weatherUrlLatLong = weatherUrl + `${result.latitude},${result.longitude}`;
   return axios.get(weatherUrlLatLong);
}).then(
    (response) => {
        let temparature = response.data["currently"]["temperature"];
        let apparentTemperature = response.data["currently"]["apparentTemperature"];    
        console.log(`It's currently ${temparature}. It feels like ${apparentTemperature}`);
    }
).
catch((error) =>  {
    console.log(error.message);
});

function getAddressLine(baseAddress) {

    let street = baseAddress["street"];
    let city  = baseAddress["adminArea5"];
    let state  = baseAddress["adminArea3"];
    
    let postalCode = baseAddress["postalCode"].split("-")[0];
    let country  = baseAddress["adminArea1"];

    if ( (!street || street == "") && (!city || city == "") &&
        (!state || state == ""))  {
            return undefined; //(`Address location for ${address} not found.`);
    }

    let completAddr = [street, city, state, postalCode, country];
    let addrLine = "";

    for (var i = 0; i < completAddr.length; i++) {
        if (completAddr[i] != "") {
                if (i == 2) {
                    addrLine = addrLine + completAddr[i] + " ";    
                }else {
                    addrLine = addrLine + completAddr[i] + ", ";
                }
        }
    }

    addrLine = String(addrLine).substring(0, addrLine.length-2);
    return({
            "address" : addrLine,
            "latitude" : baseAddress["latLng"]["lat"],
            "longitude" : baseAddress["latLng"]["lng"]
    });
}

console.log("Is axios doen using Promise");





