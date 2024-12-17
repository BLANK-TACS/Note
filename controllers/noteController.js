const notesModel = require('../models/notesModel')

const getNotes = async (req, res) => {
    try {
        const notes = await notesModel.getNotes()

        res.render('index', {
            notes
        })
    } catch (error) {
        console.log(error)
    }
}

const viewNote = async (req, res) => {
    const id = req.params.id

    try {
        const note = await notesModel.getNoteByID(id)

        res.render('note', {
            note
        })
    } catch (error) {
        console.log(error)
    }
}

const addNotes = async (req, res) => {
    const {title, content} = req.body

    try {
        const [result, notes] = await Promise.all([
            notesModel.addNotes(title, content),
            notesModel.getNotes()
        ])
    
        res.redirect('/notes')
    } catch (error) {
        console.log(error)
    }
}

const deleteNote = async (req, res) => {
    const {id} = req.body

    try {
        const result = await notesModel.deleteNoteByID(parseInt(id))

        if(result == 0) {
            return res.status(404).json({
                message: 'Notes not found!'
            })
        }

        res.status(200).json({
            message: 'Successfully deleted!'
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getNotes,
    addNotes,
    viewNote,
    deleteNote,
}