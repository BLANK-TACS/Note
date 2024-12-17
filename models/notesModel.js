const { MAX } = require('mssql')
const {mssql, getPool} = require('../database')

const getNotes = async () => {
    const pool = await getPool()
    
    const query = `select * from tblNotes`
    const result = await pool.request().query(query)

    return result.recordsets[0]
}

const getNoteByID = async (noteID) => {
    const pool = await getPool()
    
    const query = `select * from tblNotes where noteID = @noteID`
    const result = await pool.request()
    .input('noteID', mssql.Int, noteID)
    .query(query)

    return result.recordset[0]
}

const addNotes = async (title, content) => {
    const pool = await getPool()

    const query = `insert into tblNotes(title, content) values(@title, @content)`
    const result = await pool.request()
    .input('title', mssql.VarChar(50), title)
    .input('content', mssql.NVarChar(MAX), content)
    .query(query)

    return result.rowsAffected
}

const deleteNoteByID = async (noteID) => {
    const pool = await getPool()

    const query = `delete from tblNotes where noteID = @noteID`
    const result = await pool.request()
    .input('noteID', mssql.Int, noteID)
    .query(query)

    return result.rowsAffected[0]
}

module.exports = {
    getNotes,
    getNoteByID,
    addNotes,
    deleteNoteByID
}