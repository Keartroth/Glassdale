/*
*   Criminal component which exports the function, criminal, that renders HTML elements giving
*   structure to criminal cards when looped through an array of criminal objects.
*/
const eventHub = document.querySelector(".container");
const targetListContainerContentElement = document.querySelector(".listContainer");

// Function, criminal, that accepts an argument, criminalObject, and returns a string of an HTML element.
export const criminal = (criminalObject) => {
    return`
    <div id="${criminalObject.conviction}" class="criminal">
        <h4 id="criminal__name"><span class="bold">Name</span>: ${criminalObject.name}</h4>
        <div id="criminal__information--${criminalObject.id}" class="criminal__information">
            <p class="information--age"><span class="bold">Age</span>: ${criminalObject.age}</p>
            <p class="information--crime"><span class="bold">Crime</span>: ${criminalObject.conviction}</p>
            <p class="information--incarceration">
            <span class="bold">Incarceration start</span>: ${new Date(criminalObject.incarceration.start).toLocaleDateString('ja-JP')}</br>
            <span class="bold">Incarceration end</span>: ${new Date(criminalObject.incarceration.end).toLocaleDateString('ja-JP')}
            </p>

            <button id="associates--${criminalObject.id}">Associate Alibis</button>

            </div>

            <button id="hideCriminal--${criminalObject.id}">Remove Criminal From List</button>
    </div>
    `
}
/*
 *  Listens for a "click" event and dispatches the custom event, dialogButtonClickedDetailEvent,
 *  to the eventHub to open a corresponding dialog box.
*/
targetListContainerContentElement.addEventListener(
    "click", 
    event => {
    if (event.target.id.startsWith("associates--")) {
        const [prefix, chosenCriminal] = event.target.id.split("--");
        const openDialogBox = new CustomEvent("dialogButtonClickedDetailEvent", {
            detail: {
                criminal: chosenCriminal
            }
        })
        eventHub.dispatchEvent(openDialogBox);
    }
})
/*
*   Listens for a "click" event listener on the button element that starts with (#hideCriminal--),
*   which sets the corresponding criminal card to display: none, by adding the class "hidden".
*/

targetListContainerContentElement.addEventListener("click", event => {
    if (event.target.id.startsWith("hideCriminal--"))
    event.target.parentElement.classList.add("hidden")
})