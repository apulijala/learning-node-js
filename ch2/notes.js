const fs = require('fs');
const filename = "notes-data.json";
module.exports.age=25;

// defining a function.
var addNote = (title, body) =>  {
    var notes = fetchNotes(filename);
    var duplicateNotes = notes.filter((note) => note.title == title);
    var note = {
        title : title,
        body : body
    };

    if (duplicateNotes.length == 0) {
        notes.push(note);
        saveNotes(notes, filename);
        return note;
    
    }
}

var add = (a,b) => a + b;
var getAll = () => {
    return fetchNotes(filename);
}

var removeNote = (title) => {
       let notes = fetchNotes(filename);
       let filteredNotes = notes.filter((note) => note.title != title );
       saveNotes(filteredNotes, filename);
       return filteredNotes.length < notes.length;
}

var get = (title) => {
    var notes = fetchNotes(filename);
    var notesFound = notes.filter((note) => note.title == title);
    return notesFound[0];
}

var fetchNotes = (filename) => {
    try {
            var notesstr = fs.readFileSync(filename);
            return JSON.parse(notesstr);
        }   catch(e) {

                console.error(filename + " not found");
                // Return empty notes.
                return [];
        }
}

var saveNotes = (notes, fileTosave) => {
    if (notes) {
        fs.writeFileSync(fileTosave, JSON.stringify(notes));
    }
}

var logNote = (subtitle, note) => {

    console.log(`Note ${subtitle} `);
    console.log("--");
    console.log(`Title is ${note.title}`);
    console.log(`Body  is ${note.body}`);
}


module.exports = {
    add,
    addNote,
    getAll,
    removeNote,
    logNote,
    get
}   





// console.log(module);