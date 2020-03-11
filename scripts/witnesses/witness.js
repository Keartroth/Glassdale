// Exports the function, witness, to give structure to witness card elements
// when looped through an array of witness objects.
export const witness = (witnessObject) => {
    return`
    <div id="witness--${witnessObject.id}" class="witness">
        <h4 id="witness__${witnessObject.name}"><span class="bold">Name</span>: ${witnessObject.name}</h4>
        <p><span class="bold">Statements</span>: ${witnessObject.statements}</p>
    </div>
    `
}