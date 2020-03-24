/*
 *   NoteListButton module that renders a Show All Notes HTML
 *   button element which lists all notes in the my notes.json API
 */

const eventHub = document.querySelector(".container");
const targetHeaderContentElement = document.querySelector("#buttonContainer");

// Inserts a button, Show All Notes, onto the DOM in the section element (.buttonContainer).
export const noteListButton = () => {
    targetHeaderContentElement.innerHTML +=`
    <button id="button--noteList">Toggle Notes</button>
    `
}
/*
*   Listens for a "click" event and dispatches the custom event, toggleAllNotesClicked, to the eventHub
*   to render a list of notes to the DOM in the section element (.notesContainer).
*/
targetHeaderContentElement.addEventListener(
    "click", 
    event => {
    if (event.target.id === ("button--noteList")) {
        const toggleAllNotes = new CustomEvent("toggleAllNotesClicked");
        eventHub.dispatchEvent(toggleAllNotes);
    }
})