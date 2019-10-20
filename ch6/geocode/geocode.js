const request = require('request');
const locationUrl  = "http://www.mapquestapi.com/geocoding/v1/address?key=VYLcbhV3QQDnBESXT7tkdrf0O6ne4SSd&location=";

var goecode = (address) => {
    let locationUrlWithAddr = locationUrl + encodeURIComponent(address);

    return new Promise((resolve, reject) => {
        request({
            url : locationUrlWithAddr,
            json : true
        },
        (error, response, body) => {
            if (error) {
                reject("Google servers down. Please try request again");
            }

            var baseAddress = body ["results"][0]["locations"][0];
            let street = baseAddress["street"];
            let city  = baseAddress["adminArea5"];
            let state  = baseAddress["adminArea3"];
            
            let postalCode = baseAddress["postalCode"].split("-")[0];
            let country  = baseAddress["adminArea1"];

            if ( (!street || street == "") && (!city || city == "") &&
                (!state || state == ""))  {
                    reject(`Address location for ${address} not found.`);
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
            resolve({
                    "address" : addrLine,
                    "latitude" : baseAddress["latLng"]["lat"],
                    "longitude" : baseAddress["latLng"]["lng"]
            });
        });
    });
}

module.exports = {
    goecode
}



