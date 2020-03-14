import { saveNote } from "./noteDataProvider.js"
import { useCriminals } from "../criminals/CriminalProvider.js"

const contentTargetElement = document.querySelector(".noteFormContainer")
/*
 *  Structure for a form element (#noteForm) to be inserted to the DOM at (.noteFormContainer), 
 *  when called by the function NoteForm.
*/
const noteRender = () => {
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
/*
 *  A function, findCriminalID, that returns the value from the key/value pair in a criminal object ("criminalId": X,)
 *  in order to store the criminal's unknown number in the new note added when a user clicks the Save Note button. 
*/
const findCriminalID = (arrayOfCriminalObjects, criminalName) => {
    //Declair a variable to store the final value, then map over the criminal array in order to find a matching value, then return it.
    const criminalIdValue = arrayOfCriminalObjects.filter(criminal => criminal.name === criminalName);
    return criminalIdValue[0].id;
}
/*
 *  Adds a "click" event listener to the button element (#saveNote) that collects the user entered data 
 *  of the form element (#noteForm) and runs the function saveNote to submit the data. 
*/
contentTargetElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const criminals = useCriminals();
        const contentTargetDate = document.getElementById("note--date").value;
        const contentTargetSuspect = document.getElementById("note--suspect").value;
        const contentTargetNoteText = document.getElementById("note--text").value;
        const relatedCriminalId = findCriminalID(criminals, contentTargetSuspect);

        const newNote = {
            "date": contentTargetDate,
            "suspect": contentTargetSuspect,
            "noteText": contentTargetNoteText,
            "criminalId": relatedCriminalId
        }
        saveNote(newNote)
    }
})

// Renders a form to the DOM in the article element (.noteFormContainer) that is used to submit case notes.
export const NoteForm = () => {
    noteRender()
}