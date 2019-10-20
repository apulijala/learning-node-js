const yargs = require('yargs');
yargs.command('add', "Add a Note", {
    title : {
        describe : "Title of note",
        demand : true,
        alias : 't'
    },
    body : {
        describe : "Body of  note",
        demand : true,
        alias : 'b'
    }
}).
help().
argv;
