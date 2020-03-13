import { useNotes, deleteNote } from './noteDataProvider.js'
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
/*
 *  Listens for a "click" event ("#deleteNote--") and runs the function deleteNote function, sends the note.id
 *   as the parameter for the argument, and then calls the render function with an updated notes array.
*/
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")

        /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
       deleteNote(id).then(
           () => {
               const updatedNotes = useNotes()
               render(updatedNotes)
           }
       )
    }
})

/*
 *  Listens for a "click" event and dispatches the custom event, editDialogButtonDetailEvent,
 *  to the eventHub to open a corresponding dialog box.
*/
eventHub.addEventListener(
    "click", 
    event => {
    if (event.target.id.startsWith("editNote--")) {
        const noteDateUnsplit = event.target.parentElement.querySelector(".note__timestamp").innerText;
        const [dateprefix, noteDate] = noteDateUnsplit.split(": ")
        const [prefix, chosenNote] = event.target.id.split("--");
        const openDialogBox = new CustomEvent("editDialogButtonDetailEvent", {
            detail: {
                note: chosenNote,
                date: noteDate
            }
        })
        eventHub.dispatchEvent(openDialogBox);
    }
})

// Listens for the custom event, editDialogButtonDetailEvent, to open a corresponding dialog box.
eventHub.addEventListener("editDialogButtonDetailEvent", event => {
    const dialogSiblingSelector = `#editNote--${event.detail.note}+dialog`;
    const editDialog = document.querySelector(dialogSiblingSelector);
    editDialog.showModal();
    const setDate = (noteObjectDate) => {
        const dialogDateNode = editDialog.getElementsByClassName("note--date--edit");
        dialogDateNode[0].value = `${noteObjectDate}`;
      }
    setDate(event.detail.date);
})