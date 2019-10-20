// Need to figure out when to use fs and when to use os.
"use strict";

const yargs = require('yargs');
const titleOptions = {
    describe : "Title of the note",
    demand : true,
    alias : "t",
    default : "title"
};

const bodyOptions = {

    describe : "Body of a note",
    demand : true,
    alias : "b"
};

yargs.command("add", "Add a Note", {
    title : titleOptions,
    body : bodyOptions
})
.command("remove", "Remove a Note", {
    title : titleOptions
})
.command("list", "List all the notes")
.command("read", "Read a Note",{ 
    title : titleOptions
}).command("remove", "Remove a Note", {
    title : titleOptions
}).help().argv;

const notes = require('./notes');
const argv = yargs.argv;
var command = argv._[0];

if (command == "add") {
    
    var noteAdded = 
        notes.addNote(argv.title,argv.body);
    if (noteAdded) {
        notes.logNote("Added", noteAdded);
    }else {
        console.log("Note existing for title", argv.title);
    }

}else if (command == "list") {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(
        note => {
            notes.logNote("Printing ",  note );
            console.log();
        }   
                
    );

}else if (command == "read") {
    let noteFound = notes.get(argv.title);
    if (noteFound) {
        notes.logNote("Found", noteFound);
    }else {
        console.log(`Note not found for ${argv.title}`);
    }
    
}else if (command == "remove") {
    if (notes.removeNote(argv.title)) {
        console.log("Note with title", argv.title, "removed.");
    }else {
        console.log("Note with title", argv.title, " not found.");
    }
}
else {
    console.log("command not recognized");
}