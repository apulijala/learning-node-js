// Need to figure out when to use fs and when to use os.

const fs = require('fs');
const os = require('os');
// const {age, addNote} = require('./note');
const _ = require('loadsh');
const note = require('./note');

var user = os.userInfo();
// var res = note.addNote();

console.log(_.isString(true));
console.log(_.isString('Gary'));

var res = note.addNote();
console.log(res);
console.log(user);

fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${note.age}\n`, 
    (err) => {
        if (err != null) {
            console.log(err);    
        }
    }
);

console.log("Result: ", note.add(9, -2))
var origArray = ['Gary', 1, 'Gary', 1, 2, 3, 4];
var filteredArray = _.uniq(origArray);
console.log(filteredArray);
console.log(process.argv);

var command = process.argv[2];
console.log(command);

if (command == "add") {
    console.log("Adding a new note");
}else if (command == "list") {
    console.log("Listing all the notes");
}else if (command == "read") {
    console.log("Fetching Note");
}else if (command == "remove") {
    console.log("Removing all the notes");
}
else {
    console.log("command not recognized");
}