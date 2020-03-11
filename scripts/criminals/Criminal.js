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
    </div>
    `
}


{/* <dialog class="dialog--criminal" id="details--${criminalObject.id}">
            <ul>
            ${
                criminalObject.known_associates.map(criminal => {
                       return `<li>Associate: ${criminal.name} | Alibi: ${criminal.alibi}</li>`
                   })
               }
            </ul>
            <button class="button--close" id="close-${criminalObject.id}">Close</button>
        </dialog> */}