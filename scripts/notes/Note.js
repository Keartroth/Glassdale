const eventHub = document.querySelector(".container");
const notesContainerContentTargetElement = document.querySelector(".notesContainer");

export const NoteComponent = (noteObject) => {
    return`
    <section class="note" id="note--${noteObject.id}">
        <h4 class="note__suspect"><span class="bold">Suspect</span>: ${noteObject.suspect}</h4>
        <p class="note__timestamp"><span class="bold">Note Entry Date</span>: ${noteObject.date}</p>
        <p class="note__text">${noteObject.noteText}</p>

        <button id="toggleNote--${noteObject.id}" class="toggleNoteButton">Hide Note</button>
        
        <button id="deleteNote--${noteObject.id}" class="deleteNoteButton">Delete Note</button>

        <button id="editNote--${noteObject.id}" class="editNoteButton">Edit Note</button>
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