import { useNotes } from './noteDataProvider.js';
import { NoteComponent } from './Note.js';
import { EditNoteDialogElement } from './NoteDialog.js';

// NoteList module that renders a list of note HTML elements to .notesContainer.

const eventHub = document.querySelector(".container");
const notesContainerContentTargetElement = document.querySelector(".notesContainer");
/*
 *  Function that takes an array of note objects and for each note renders a note component, and then
 *  calls EditNoteDialogElement and renders a dialog box component within the note as an edit form.
*/
export const noteRender = notes => {
    notesContainerContentTargetElement.innerHTML = `
        <h2 id="note__heading">Cold Case Notes</h2>
        ${
            notes.map(note => NoteComponent(note)).join("")
        }
    `;
    for (const noteObject of notes) {
        EditNoteDialogElement(noteObject);
    }
}

// Function that calls useNotes passes the array into render as the parameter to the argument.
export const NoteList = () => {
    const notes = useNotes();

    noteRender(notes);
}
/*
 *  Listens for the custom event, renderAllNotesToDOM, to render a list of notes to the DOM
 *  in the section element (.notesContainer) by running the NoteList function.
*/
eventHub.addEventListener("renderAllNotesToDOM", event => {
    NoteList();

})