import { useCriminals } from "./criminalDataProvider.js";

/*
 *   Filter component that renders a filter button HTML element in .filters, which
 *   filters the criminal list by the selected arresting officer and previous conviction.
 */
const eventHub = document.querySelector(".container");
const headerConentTargetElement = document.querySelector(".headerContainer");
const filtersContentTargetElement = document.querySelector(".filter__button");

let selectedOfficer = "0";
let selectedCrime = "0";
let selectedStartDate = "1982-04-20";
let selectedEndDate = "2029-01-03";

// Inserts a button, Filter, onto the DOM in the header element (.filters).
export const filterListButton = () => {
    filtersContentTargetElement.innerHTML += `
    <button id="filterButton">Filter by Selected Values</button>
    `
}
/*
 *   FilterComponent function that sets three event listeners which capture the values of the custom events, 
 *   officerSelected & crimeSelected, filter useCriminals with each value and return an array of criminal objects.
 */
export const FilterComponent = () => {

    eventHub.addEventListener("officerSelected", event => {
        selectedOfficer = event.detail.key;
    })

    eventHub.addEventListener("crimeSelected", event => {
        selectedCrime = event.detail.key;
    })

    eventHub.addEventListener("incarcerationDateChosenDetailEvent", event => {
        selectedStartDate = event.detail.incarcerationStart;
        selectedEndDate = event.detail.incarcerationEnd;
    })

    headerConentTargetElement.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "filterButton") {
            if (selectedOfficer === "0" || selectedCrime === "0") {
                if (selectedOfficer === "0" && selectedCrime !== "0") {
                    const unfilteredArray = useCriminals();
                    const filteredByConvictionArray = unfilteredArray.filter(currentCriminal => currentCriminal.conviction === selectedCrime)
                    const filteredByStartDateArray = filteredByConvictionArray.filter(currentCriminal => currentCriminal.incarceration.end >= selectedStartDate)
                    const finalFilteredArray = filteredByStartDateArray.filter(currentCriminal => currentCriminal.incarceration.end <= selectedEndDate)

                    const message = new CustomEvent("filterInitiated", {
                        detail: {
                            filteredArray: finalFilteredArray
                        }
                    })
                    eventHub.dispatchEvent(message);
                } else if (selectedOfficer !== "0" && selectedCrime === "0") {
                    const unfilteredArray = useCriminals();
                    const filteredByofficerArray = unfilteredArray.filter(currentCriminal => currentCriminal.arrestingOfficer === selectedOfficer)
                    const filteredByStartDateArray = filteredByofficerArray.filter(currentCriminal => currentCriminal.incarceration.end >= selectedStartDate)
                    const finalFilteredArray = filteredByStartDateArray.filter(currentCriminal => currentCriminal.incarceration.end <= selectedEndDate)

                    const message = new CustomEvent("filterInitiated", {
                        detail: {
                            filteredArray: finalFilteredArray
                        }
                    })
                    eventHub.dispatchEvent(message);
                } else if (selectedOfficer === "0" || selectedCrime === "0") {
                    const unfilteredArray = useCriminals();
                    const filteredByStartDateArray = unfilteredArray.filter(currentCriminal => currentCriminal.incarceration.end >= selectedStartDate)
                    const finalFilteredArray = filteredByStartDateArray.filter(currentCriminal => currentCriminal.incarceration.end <= selectedEndDate)

                    const message = new CustomEvent("filterInitiated", {
                        detail: {
                            filteredArray: finalFilteredArray,
                        }
                    })
                    eventHub.dispatchEvent(message);
                }
            } else {
                const unfilteredArray = useCriminals();
                const filteredByConvictionsArray = unfilteredArray.filter(currentCriminal => currentCriminal.conviction === selectedCrime)
                const filteredByBothArray = filteredByConvictionsArray.filter(currentCriminal => currentCriminal.arrestingOfficer === selectedOfficer)
                const filteredByStartDateArray = filteredByBothArray.filter(currentCriminal => currentCriminal.incarceration.end >= selectedStartDate)
                const finalFilteredArray = filteredByStartDateArray.filter(currentCriminal => currentCriminal.incarceration.end <= selectedEndDate)

                const message = new CustomEvent("filterInitiated", {
                    detail: {
                        filteredArray: finalFilteredArray,
                    }
                })
                eventHub.dispatchEvent(message);
            }
        }
    })
}