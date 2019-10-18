const fs = require('fs')
const chalk = require('chalk')
const yargs = require('yargs')
const notesUtils = require('./notes')

//Customize yargs version
yargs.version('1.1.0')

//Add command
yargs.command({

    command: 'add',
    describe: 'Add a new note',
    builder: {

        title: {
            describe: 'Note title',
            type: 'string',
            demandOption: true
        },
        body: {
            describe: 'Note body',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        notesUtils.addNote(argv.title, argv.body)
    }
})

//Remove command
yargs.command({

    command: 'remove',
    describe: 'Remove a note',
    builder: {

        title: {

            describe: 'Title of note to be removed',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        notesUtils.removeNote(argv.title)
    }
})

//List command
yargs.command({

    command: 'list',
    describe: 'lists out all notes',
    handler() {
        console.log('Listing out all notes')
    }
})

//Read command
yargs.command({

    command: 'read',
    describe: 'read a note',
    handler() {
        console.log('Reading note')
    }
})

yargs.parse()