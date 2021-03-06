/*
*   Note component which exports the function, NoteComponent, that renders HTML elements giving
*   structure to note elements when looped through an array of note objects.
*/
const eventHub = document.querySelector(".container");
const notesContainerContentTargetElement = document.querySelector(".notesContainer");
/*
*   Exports the function, NoteComponent, that accepts an argument, 
*   noteObject, and returns a string of an HTML note element.
*/
export const NoteComponent = (noteObject, criminalObject) => {
    const [firstName, lastName] = criminalObject.name.split(" ");
    return`
    <section class="note" id="note--${noteObject.id}">
        <h4 class="note__suspect"><span class="bold">Suspect</span>: ${lastName}, ${firstName}</h4>
        <p class="note__timestamp"><span class="bold">Note Entry Date</span>: ${noteObject.date}</p>
        <p class="note__text">${noteObject.noteText}</p>

        <button id="toggleNote--${noteObject.id}" class="toggleNoteButton">Hide Note</button>
        
        <button id="deleteNote--${noteObject.id}" class="deleteNoteButton">Delete Note</button>

        <button id="editNote--${noteObject.id}--criminal--${criminalObject.id}" class="editNoteButton">Edit Note</button>
    </section>
    `
}

// Listens for a "click" event and hides a corresponding note.
notesContainerContentTargetElement.addEventListener('click', clickEvent => {
    if (clickEvent.target.id.startsWith('toggleNote--')) {
        const [prefix, toggleNoteOption] = clickEvent.target.id.split('--');
        const noteElement = document.getElementById(`note--${toggleNoteOption}`)
        noteElement.classList.toggle("hidden");
    }
})
/*
 *  Listens for a "click" event ("#deleteNote--") creates custom event "deleteNoteEvent",
 *  which sends the note.id as the detail for the event.
*/
notesContainerContentTargetElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, chosenNoteId] = clickEvent.target.id.split("--");
        const deleteNote = new CustomEvent("deleteNoteEvent", {
            detail: {
                note: chosenNoteId,
            }
        })
        eventHub.dispatchEvent(deleteNote);
    }
})
/*
 *  Listens for a "click" event and dispatches the custom event, editDialogButtonDetailEvent,
 *  to the eventHub to open a corresponding dialog box.
*/
notesContainerContentTargetElement.addEventListener(
    "click", 
    event => {
    if (event.target.id.startsWith("editNote--")) {
        const noteDateUnsplit = event.target.parentElement.querySelector(".note__timestamp").innerText;
        const [dateprefix, noteDate] = noteDateUnsplit.split(": ");
        const [prefix, chosenNote, criminalPrefix, criminalId] = event.target.id.split("--");
        const openDialogBox = new CustomEvent("editDialogButtonDetailEvent", {
            detail: {
                note: chosenNote,
                date: noteDate,
                criminal: criminalId
            }
        })
        eventHub.dispatchEvent(openDialogBox);
    }
})