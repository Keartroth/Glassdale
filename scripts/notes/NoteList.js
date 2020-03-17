import { useNotes, getNotes } from './noteDataProvider.js';
import { NoteComponent } from './Note.js';
import { EditNoteDialogElement } from './NoteDialog.js';

// NoteList module that renders a list of note HTML elements to .notesContainer.

const eventHub = document.querySelector(".container");
const notesContainerContentTargetElement = document.querySelector(".notesContainer");
/*
 *  Function that takes an array of note objects and for each note renders a note component, and then
 *  calls EditNoteDialogElement and renders a dialog box component within the note as an edit form.
*/
export const noteRender = () => {
    getNotes().then(() => {
        const notes = useNotes();

        notesContainerContentTargetElement.innerHTML = `
        ${
            notes.map(
                currentNoteObject => {
                    return NoteComponent(currentNoteObject);
                }
            ).join("")
        }
    `
    notes.forEach(event = (noteObject) => {
        EditNoteDialogElement(noteObject);  
    })
})
}
/*
 *  Listens for the custom event, renderAllNotesToDOM, to render a list of notes to the DOM
 *  in the section element (.notesContainer) by running the NoteList function.
*/
eventHub.addEventListener("renderAllNotesToDOM", event => {
    noteRender();

})
/*
*   Listens for the custom event, noteStateChanged, on the eventHub
*   and calls the function getNotes to re-evaluate the notes array.
*/
eventHub.addEventListener("noteStateChanged", event => {
    noteRender();
}
)