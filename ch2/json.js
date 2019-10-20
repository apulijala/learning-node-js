const fs = require('fs');
var obj= {
    name : "Andrew"
}

var stringObj = JSON.stringify(obj);
console.log(typeof(stringObj));
console.log(stringObj);

var personString = '{"name": "Andrew", "age" : 25}';
console.log("Person String is " + personString);

var person = JSON.parse(personString);
console.log(person);
console.log(typeof person);
console.log(typeof personString);

var originalNote = {
    title : "Some Title",
    body : "Some Body"
}

let originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync( "notes.json", originalNoteString);

var noteString = fs.readFileSync("notes.json", () => {});
console.log("Note string is " + noteString);
var note = JSON.parse(noteString);

console.log("type of note " + typeof note);
console.log(note.title);
console.log(note.body);



