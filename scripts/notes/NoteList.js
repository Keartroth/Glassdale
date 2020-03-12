import { useNotes } from './noteDataProvider.js'
import { useCriminals } from '../criminals/CriminalProvider.js'

const contentTarget = document.querySelector(".notesContainer");
/*
    Function that takes two arguments, an array of notes and an array of criminals,
    and then loops over the array of notes, and for each note searches the entire array
    of criminals and links corresponding criminals to notes by the two called key/value pairs.
*/
const render = (arrayOfNoteObjects, arrayOfCriminalObjects) => {
    contentTarget.innerHTML = arrayOfNoteObjects.map(note => {
        const relatedCriminal = arrayOfCriminalObjects.find(criminal => criminal.id === note.criminalId)

        return `
            <section class="note">
                <h2>Note about ${relatedCriminal.name}</h2>
                <p>${note.noteText}</p>
            </section>
        `
    })
}

const NoteList = () => {
    const notes = useNotes()
    const criminals = useCriminals()

    render(notes, criminals)
}