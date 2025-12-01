import express from 'express'
import { getNotes, createNote, updateNote, deleteNotes, getNotesById } from '../controllers/notesController.js';
const router = express.Router();


router.get("/", getNotes)
router.get("/:id", getNotesById)

router.post("/", createNote)

router.put('/:id', updateNote)

router.delete('/:id', deleteNotes)


export default router