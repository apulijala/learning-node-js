const request = require('request');

request({
   url : "http://www.mapquestapi.com/geocoding/v1/address?key=VYLcbhV3QQDnBESXT7tkdrf0O6ne4SSd&location=1301%20lombard%20street%20philadelphia", 
   json : true 
},
(error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));

    let postalCodeStr =   body["results"][0]["locations"][0]["postalCode"];
    let postalCodeParts = String(postalCodeStr).split("-");
    let address = body["results"][0]["locations"][0]["street"] + ", " + body["results"][0]["locations"][0]["adminArea4"] + 
         ", " +   body["results"][0]["locations"][0]["adminArea3"] 
         + " " + postalCodeParts[0] + ", " + body["results"][0]["locations"][0]["adminArea1"];

    console.log(`Address: ${address}`);
    console.log(`Latitude:  ${body["results"][0]["locations"][0]["latLng"]["lat"]}`);
    console.log(`Longitude:   ${body["results"][0]["locations"][0]["latLng"]["lng"]}`);
}
);