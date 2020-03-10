import { saveNote } from "./noteDataProvider.js"

const contentTargetElement = document.querySelector(".noteFormContainer")

const render = () => {
    contentTargetElement.innerHTML = `
    <form id="noteForm">
        <label for="note--date">Date:</label>
        <input type="date" id="note--date"></br>
        <label for="note--suspect">Suspect:</label>
        <input type="text" id="note--suspect"></br>
        <label for="note--text">Note:</label></br>
        <textarea id="note--text"></textarea></br>

        <button id="saveNote">Save Note</button>
        </form>
    `
}

// Handle browser-generated click event in component
contentTargetElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const contentTargetDate = document.getElementById("note--date").value;
        const contentTargetSuspect = document.getElementById("note--suspect").value;
        const contentTargetNoteText = document.getElementById("note--text").value;

        // Make a new object representation of a note
        const newNote = {
            "date": contentTargetDate,
            "suspect": contentTargetSuspect,
            "notes": contentTargetNoteText
        }

        // Change API state and application state
        saveNote(newNote)
    }
})

export const NoteForm = () => {
    render()
}