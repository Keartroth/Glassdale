import { useCriminals } from "./CriminalProvider.js";
import { criminal } from "./Criminal.js";

// const targetContentElement = document.querySelector(".criminalsContainer");

// export const criminalList = () => {
//     const arrayOfCriminalObjects = useCriminals();

//     for (const criminalObject of arrayOfCriminalObjects) {
//         targetContentElement.innerHTML += criminal(criminalObject);
//     }
// }

const targetContentElement = document.querySelector(".criminalsContainer");
const eventHub = document.querySelector(".container");

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('changeConvictionEvent', event => {
    // You remembered to add the id of the crime to the event detail, right?
    if ("crimeId" in event.detail) {
        /*
            Filter the criminals application state down to the people that committed the crime
        */
        const matchingCriminals = appStateCriminals.filter(currentCriminals => {
            return currentCriminals.id = true;
        })

        /*
        Then invoke render() and pass the filtered collection as
        an argument
         */
       render(matchingCriminals);
    }
})

const render = criminalCollection => {
    targetContentElement.innerHTML += criminal(criminalCollection);
}


// Render ALL criminals initally
export const criminalList = () => {
    const appStateCriminals = useCriminals();
    for (const criminalObject of appStateCriminals) {
        render(criminalObject);
    }
}