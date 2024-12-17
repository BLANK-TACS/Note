const express = require('express')
const router = express.Router()

const noteController = require('../controllers/noteController')

router.get('/', noteController.getNotes)
router.get('/view/:id', noteController.viewNote)
router.post('/create', noteController.addNotes)
router.delete('/delete', noteController.deleteNote)

module.exports = router