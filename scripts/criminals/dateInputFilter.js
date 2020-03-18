/*
*   dateInputFilter component which exports the function, dateInputFilter, that renders HTML input and label elements
*   and adds an event listener to dispatch a custom event, incarcerationDateChosenDetailEvent, to filter CriminalList.
*/

const eventHub = document.querySelector(".container");
const targetHeaderContentElement = document.querySelector(".filters__incarceration");

// Function, dateInputFilter, that returns a string of input and label HTML elements and inserts them at (.filters__incarceration).
export const dateInputFilter = () => {
    targetHeaderContentElement.innerHTML =`
    <label for="filter--startDate">Excluding Incarceration Start</label>
    <input type="date" id="filter--startDate" min="1982-04-20" required>
    <label for="filter--endDate">Excluding Incarceration End</label>
    <input type="date" id="filter--endDate" max="2029-01-03" required>
    `;
    
    const targetFilterStartDateElement = document.querySelector("#filter--startDate");
    const targetFilterEndDateElement = document.querySelector("#filter--endDate");

    targetFilterStartDateElement.value = "1982-04-20";
    targetFilterEndDateElement.value = "2029-01-03";
}
/*
 *  Listens for a "change" event at inputs (#filter--startdDate & #filter--endDate) and dispatches the custom event,
 *  incarcerationDateChosenDetailEvent, to the eventHub to filter CriminalList by incarceration date.
*/
targetHeaderContentElement.addEventListener(
    "change",
    event => {
        if (event.target.id.startsWith("filter--")) {
            const incarcerationStartAndEndDateArray = document.querySelectorAll("input#filter--startDate, input#filter--endDate");
            const incarcerationStartDate = incarcerationStartAndEndDateArray[0].value;
            const incarcerationEndDate = incarcerationStartAndEndDateArray[1].value;
            const incarcerationStartDateFormat = new Date(incarcerationStartDate).toLocaleDateString('ja-JP');
            const incarcerationEndDateFormat = new Date(incarcerationEndDate).toLocaleDateString('ja-JP');
            const incarcerationDateChosen = new CustomEvent("incarcerationDateChosenDetailEvent", {
                detail: {
                    incarcerationStart: incarcerationStartDateFormat,
                    incarcerationEnd: incarcerationEndDateFormat
                }
            })
            eventHub.dispatchEvent(incarcerationDateChosen);
        }
    }
)