export const NoteComponent = noteObject => `
    <section class="note note__criminal--${noteObject.criminalId}">
        <h4 class="note__suspect"><span class="bold">Suspect</span>: ${noteObject.suspect}</h4>
        <p class="note__timestamp"><span class="bold">Note Entry Date</span>: ${noteObject.date}</p>
        <p class="note__text">${noteObject.noteText}</p>
        
        <button id="editNote--${noteObject.id}" class="editNoteButton">Edit Note</button>

        <dialog class="dialog--note" id="details--${noteObject.id}">
            <label for="note--date--edit--${noteObject.id}" class="note--date--editLabel">Date:</label>
            <input type="date" id="note--date--edit--${noteObject.id}" class="note--date--edit" required></br>
            <label for="note--suspect--edit--${noteObject.id}" class="note--suspect--editLabel">Suspect:</label>
            <textarea id="note--suspect--edit--${noteObject.id}" class="note--suspect--edit" required>${noteObject.suspect}</textarea></br>
            <label for="note--text--edit--${noteObject.id}" class="note--text--editLabel">Note:</label></br>
            <textarea id="note--text--edit--${noteObject.id}" class="note--text--edit" required>${noteObject.noteText}</textarea></br>

        
            <button id="editNoteSubmit--${noteObject.id}" class="editNoteSubmitButton">Submit Edited Note</button>
            <button class="button--close button--close--edit" id="close-${noteObject.id}">Close Unedited</button>
        </dialog>

        <button id="deleteNote--${noteObject.id}" class="deleteNoteButton">Delete Note</button>
    </section>
`