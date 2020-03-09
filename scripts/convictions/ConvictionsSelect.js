/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions } from "./ConvictionsProvider.js";

const contentTargetElement = document.querySelector(".filters__crime");

const ConvictionSelect = () => {
     const convictions = useConvictions();

    const render = convictionsCollection => {
           contentTargetElement.innerHTML = `
               <select class="dropdown" id="crimeSelect">
                   <option value="0">Please select a crime...</option>
                   ${
                    convictionsCollection.map(crime => {
                           return `<option id="crime--${crime.id}" class="crimesMenueItem">${crime.name}</option>`
                       })
                   }
               </select>
           `
    }

    render(convictions)
}

export default ConvictionSelect;