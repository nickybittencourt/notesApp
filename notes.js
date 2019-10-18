const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const removeNote = (title) => {

    const notes = loadNotes()

    //filter through notes to determine which to keep
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length == notesToKeep.length) {

        console.log(chalk.bgRed.white('No note found!'))

    } else {

        console.log(chalk.bgBlue.white('Note removed!'))
    }

    saveNotes(notesToKeep)
}

const addNote = (title, body) => {

    const notes = loadNotes()

    //search through notes to check if title already in use
    const duplicateNote = notes.find(note => note.title === title)

    //if no duplicate found, add to stored data, else print error
    if (!duplicateNote) {

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

const saveNotes = (notes) => {

    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {

    try {

        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer)

    } catch (e) {

        return []
    }
}

const listNotes = () => {

    const notes = loadNotes()

    console.log(chalk.bgMagenta.white('Your Notes:'))

    notes.forEach(note => {

        console.log('--' + note.title)
    })
}

const readNote = (title) => {

    const notes = loadNotes()

    const noteToRead = notes.find(note => note.title === title)

    if (noteToRead) {

        console.log(chalk.inverse(noteToRead.title))
        console.log(noteToRead.body)

    } else {

        console.log(chalk.bgRed.white('No note found!'))
    }
}

module.exports = {

    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}