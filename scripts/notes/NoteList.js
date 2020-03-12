import { useNotes } from './noteDataProvider.js'
import { useCriminals } from '../criminals/CriminalProvider.js'
import { NoteComponent } from './Note.js';

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".notesContainer");
const targetHeaderContentElement = document.querySelector("#buttonContainer")

// Inserts a button, Show All Notes, onto the DOM in the section element (.buttonContainer).
export const noteListButton = () => {
    targetHeaderContentElement.innerHTML +=`
    <button id="button--noteList">Show All Notes</button>
    `
}
/*
    Function that takes two arguments, an array of notes and an array of criminals,
    and then loops over the array of notes, and for each note searches the entire array
    of criminals and links corresponding criminals to notes by the two called key/value pairs.
*/
// const render = (arrayOfNoteObjects, arrayOfCriminalObjects) => {
//     contentTarget.innerHTML = arrayOfNoteObjects.map(note => {
//         const relatedCriminal = arrayOfCriminalObjects.find(criminal => criminal.id === note.criminalId)

//         return `
//             <h2>Cold Case Notes</h2>
//             <section class="note">
//                 <h4>Note about ${relatedCriminal.name}</h4>
//                 <p>${note.noteText}</p>
//             </section>
//         `
//     }
//     )
// }

/*
 *  Function that takes two arguments, an array of notes and an array of criminals,
 *  and then loops over the array of notes, and for each note searches the entire array
 *  of criminals and links corresponding criminals to notes by the two called key/value pairs.
*/
const render = notes => {
    contentTarget.innerHTML = `
        <h2 id="note__heading">Cold Case Notes</h2>
        ${
            notes.map(note => NoteComponent(note)).join("")
        }
    `
}

// Function that calls useNotes and useCriminals for both arrays and passes the arrays into render as the parameters to the argument.
export const NoteList = () => {
    const notes = useNotes();

    render(notes);
}
/*
*   Listens for a "click" event and dispatches the custom event, renderAllNotesToDOM, to the eventHub
*   to render a list of notes to the DOM in the section element (.notesContainer).
*/
targetHeaderContentElement.addEventListener(
    "click", 
    event => {
    if (event.target.id === ("button--noteList")) {
        const showNotesButtonClicked = new CustomEvent("renderAllNotesToDOM");
        eventHub.dispatchEvent(showNotesButtonClicked);
    }
})
/*
 *  Listens for the custom event, renderAllNotesToDOM, to render a list of notes to the DOM
 *  in the section element (.notesContainer) by running the NoteList function.
*/
eventHub.addEventListener("renderAllNotesToDOM", event => {
    NoteList();

})