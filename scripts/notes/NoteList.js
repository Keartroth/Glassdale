import { useNotes, getNotes } from './noteDataProvider.js';
import { NoteComponent } from './Note.js';
import { EditNoteDialogElement } from './NoteDialog.js';
import { useCriminals } from '../criminals/criminalDataProvider.js';

// NoteList module that renders a list of note HTML elements to .notesContainer.

const eventHub = document.querySelector(".container");
const notesContainerContentTargetElement = document.querySelector(".notesContainer");

let visibility = false;
/*
 *  Function that takes an array of note objects and for each note renders a note component, and then
 *  calls EditNoteDialogElement and renders a dialog box component within the note as an edit form.
*/
const noteRender = () => {
    if (visibility) {
        notesContainerContentTargetElement.classList.remove("hidden")
    }
    else {
        notesContainerContentTargetElement.classList.add("hidden")
    }

    notesContainerContentTargetElement.innerHTML = `
        <button id="button--listAllNotes">Show All Notes</button>
    `

    getNotes().then(() => {
        const notes = useNotes();
        const criminals = useCriminals();

        notesContainerContentTargetElement.innerHTML += notes.map(
            currentNoteObject => {
                const matchingCriminal = criminals.find(
                    (currentCriminalObject) => {
                        return currentNoteObject.criminalId === currentCriminalObject.id
                    }
                )
                return NoteComponent(currentNoteObject, matchingCriminal);
            }).join("")

            notes.forEach(event = (noteObject) => {
                EditNoteDialogElement(noteObject);
            })
    })
}
// Function that invokes noteRender to list all notes to DOM.
export const noteList = () => {
    noteRender();
}
/*
 *  Listens for the custom event, toggleAllNotesClicked, to render a list of notes to the DOM
 *  in the section element (.notesContainer) by running the NoteList function.
*/
eventHub.addEventListener("toggleAllNotesClicked", event => {
    visibility = !visibility

    if (visibility) {
        notesContainerContentTargetElement.classList.remove("hidden")
    }
    else {
        notesContainerContentTargetElement.classList.add("hidden")
    }
})
/*
*   Listens for the custom event, noteStateChanged, on the eventHub
*   and calls the function noteRender to re-evaluate the notes array.
*/
eventHub.addEventListener("noteStateChanged", event => {
    noteRender();
})
/*
*   Listens for a "click" event on the button (#button--listAllNotes),
*   and calls the function noteRender to re-render the notesList.
*/
notesContainerContentTargetElement.addEventListener("click", event => {
    if (event.target.id === "button--listAllNotes") {
        noteRender();
    }
})