export const NoteComponent = noteObject => `
    <section class="note note__criminal--${noteObject.criminalId}">
        <h4 class="note__suspect"><span class="bold">Suspect</span>: ${noteObject.suspect}</h4>
        <p class="note__timestamp"><span class="bold">Note Entry Date</span>: ${noteObject.date}</p>
        <p class="note__text">${noteObject.noteText}</p>
        <button id="editNote--${noteObject.id}" class="editNoteButton">Edit Note</button>
        <dialog class="dialog--note" id="details--${noteObject.id}">
        
        <button id="editNoteSubmit--${noteObject.id}" class="editNoteSubmitButton">Submit Edited Note</button>
        <button class="button--close" id="closeEdit-${noteObject.id}">Close Unedited</button>
        </dialog>
        <button id="deleteNote--${noteObject.id}" class="deleteNoteButton">Delete Note</button>
    </section>
`