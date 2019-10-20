var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
         // resolve('Hey. It worked!');
       reject("Unable to fulfill the promise");
    }, 2500); 
}
);

somePromise.then(
    (message) => {
        console.log('Success ' + message);
    },
    (errorMessage) => {
        console.log("Error: " + errorMessage);
});

var asyncAdd = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                    let sumResult = a + b;
                    resolve(sumResult );
            }else {
                    reject("Arguments must be numbers.");
            }

        }, 2500);
    });
}

asyncAdd(5,7).then((res, second) => {
    console.log('Result: ', res);
    return asyncAdd(res, '33');
}, 
(errorMsg) => {
    console.log(errorMsg);
    
}).then(
    (res) => {
        console.log("Result should be 45: ", res);
    },
    (errorMessage) => {
        console.log(errorMessage);
    });
 
console.log("Demonstrating asynchronous code");


asyncAdd(5,7).
then((res) => {
     // console.log(res);
    return asyncAdd(res, 33);
}).then((res) => {
    return asyncAdd(res, '101')
})
.catch(
    (errorMessage) => {
            console.log("Bottom most " + errorMessage);
            return asyncAdd(45, '90')
    }
).then( (res) => {
    console.log(res);
}, (errorMsg) => {
    console.log("final error emssage " + errorMsg);
}) ;

 
