
const request = require('request');
const mapquesturl = "http://www.mapquestapi.com/geocoding/v1/address?key=VYLcbhV3QQDnBESXT7tkdrf0O6ne4SSd&location=";

var geocode = (address, callback) => {
    let mapquesturlForAddress = mapquesturl + encodeURIComponent(address);
   //  console.log(mapquesturlForAddress);
    // callback(undefined, address);
    request ({
        url : mapquesturlForAddress,
        json : true
    },
    (error, response, body) => {

        if (error) {
            callback("Google Server Not Available. Please try gain later");
            return;
        } 
        // Get the rest of the address.
        let baseAddress = body["results"][0]["locations"][0];
        let street = baseAddress["street"];
        let city = baseAddress["adminArea5"];
        let county = baseAddress["adminArea3"];
        let postalCode = baseAddress["postalCode"].split("-")[0];
        let coutnry = baseAddress["adminArea1"];
        let fullAddress = [street, city,county, postalCode, coutnry];

        if ( (!street || street == "") && (!city || city == "") && (!county && county == "") )  {
                let erroMsg = "Location " + address + " not found.";
                callback(erroMsg);
                
        } else {
                
                let addressLine = "";
                for (var i = 0; i < fullAddress.length -1; i++) {
                    if (fullAddress[i] != "") {
                        if (i == 2) {
                            addressLine  = addressLine +  fullAddress[i] + " "; 
                        }else {
                            addressLine  = addressLine +  fullAddress[i] + ", "; 
                        }
                    }   
                } 

                if (fullAddress[fullAddress.length -1] != "") {
                    addressLine  = addressLine +   fullAddress[i]
                }else {
                    addressLine = addressLine.substring(0,addressLine.length-2); 
                }
                let latitude = body["results"][0]["locations"][0]["latLng"]["lat"];
                let longitude = body["results"][0]["locations"][0]["latLng"]["lng"];

                let result = {
                        fullAddress : addressLine,
                        latitude : latitude,
                        longitude : longitude
                }
                callback(undefined, result);
        }
        
    });

}

module.exports = {
    geocode
}