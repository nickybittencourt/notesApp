const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {

    return 'Your notes...'
}

const removeNote = function (title) {

    const notes = loadNotes()

    //filter through notes to determine which to keep
    const notesToKeep = notes.filter(function (note) {

        return note.title !== title
    })

    if (notes.length == notesToKeep.length) {

        console.log(chalk.bgRed.white('No note found!'))

    } else {

        console.log(chalk.bgBlue.white('Note removed!'))
    }

    saveNotes(notesToKeep)
}

const addNote = function (title, body) {

    const notes = loadNotes()

    //filter through notes to check if title already in use
    const duplicateNotes = notes.filter(function (note) {

        return note.title === title
    })

    //if no duplicate found, add to stored data, else print error
    if (duplicateNotes.length === 0) {

        notes.push({

            title: title,
            body: body
        })

        saveNotes(notes)

        console.log(chalk.bgGreen.white('New Note added!'))

    } else {

        console.log(chalk.bgRed.white('Note title taken!'))
    }
}

const saveNotes = function (notes) {

    const dataJSON = JSON.stringify(notes)

    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {

    try {

        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer)

    } catch (e) {

        return []
    }
}

module.exports = {

    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}