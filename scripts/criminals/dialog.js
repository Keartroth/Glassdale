import { useCriminals } from "./CriminalProvider.js";

export const dialogElement = () => {
    const arrayOfCriminalObjects = useCriminals();
    for (const criminalObject of arrayOfCriminalObjects) {
        let contentTargetElement = document.querySelector(`#criminal__information--${criminalObject.id}`);
        contentTargetElement.innerHTML +=`
        <dialog class="dialog--criminal" id="details--${criminalObject.id}">
            <ul>
            ${
                criminalObject.known_associates.map(criminal => {
                       return `<li>Associate: ${criminal.name} | Alibi: ${criminal.alibi}</li>`
                   })
               }
            </ul>
            <button class="button--close" id="close-${criminalObject.id}">Close</button>
        </dialog>
        `
    }
}