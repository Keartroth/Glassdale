export const NoteComponent = noteObject => `
    <section class="note note__criminal--${noteObject.criminalId}">
        <h4 class="note__suspect"><span class="bold">Suspect</span>: ${noteObject.suspect}</h4>
        <p class="note__timestamp"><span class="bold">Note Entry Date</span>: ${noteObject.date}</p>
        <p class="note__text">${noteObject.noteText}</p>
        <button id="deleteNote--${noteObject.id}" class="deleteNoteButton">Delete Note</button>
    </section>
`