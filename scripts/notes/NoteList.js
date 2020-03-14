import { useNotes, deleteNote, editNote } from './noteDataProvider.js'
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
const noteRender = notes => {
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

    noteRender(notes);
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
               noteRender(updatedNotes)
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
/*
 *  Listens for a "click" event and dispatches the custom event,
 *  toggleNoteEvent, to the eventHub to hide a corresponding note.
*/
eventHub.addEventListener('click', clickEvent => {
    if (clickEvent.target.id.startsWith('toggleNote--')) {
        const [prefix, toggleNoteOption] = clickEvent.target.id.split('--');

        const changeToggleOption = new CustomEvent('toggleNoteEvent', {
            detail: {
                toggleValue: toggleNoteOption
            }
        })

        eventHub.dispatchEvent(changeToggleOption)
    }
})

// Listens for the custom event, toggleNoteEvent, to hide a corresponding note (#note--${event.detail.toggleValue}).
eventHub.addEventListener("toggleNoteEvent", event => {
    const noteElement = document.getElementById(`note--${event.detail.toggleValue}`)
    noteElement.classList.toggle("hidden");
})

// Listens for a "click" event and invokes the function, editNote, to replace the JSON data object with new values.
eventHub.addEventListener(
    "click", 
    theEditEvent => {
        if (event.target.id.startsWith("editNoteSubmit--")) {
            const [prefix, editedNoteId, editedCriminalNoteId] = theEditEvent.target.id.split('--');
            const contentTargetDate = document.getElementById(`note--date--edit--${editedNoteId}`).value;
            const contentTargetSuspect = document.getElementById(`note--suspect--edit--${editedNoteId}`).value;
            const contentTargetNoteText = document.getElementById(`note--text--edit--${editedNoteId}`).value;

            const editedNoteObject = {
                "date": contentTargetDate,
                "suspect": contentTargetSuspect,
                "noteText": contentTargetNoteText,
                "criminalId": editedCriminalNoteId,
                "id": editedNoteId
            }
        editNote(editedNoteObject);
        document.getElementById(`details--${editedNoteId}`).close()
        }
    }
)