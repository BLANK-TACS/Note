require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const app = express()

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const notesRouter = require('./routes/notes')

app.use('/notes', notesRouter)

const port = process.env.port || 3000
app.listen(port)
 