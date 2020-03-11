import { getCriminals } from "./criminals/CriminalProvider.js";
import { criminalList } from "./criminals/CriminalList.js";
import { ConvictionSelect } from "./convictions/ConvictionsSelect.js";
import { getConvictions } from "./convictions/ConvictionsProvider.js";
import { NoteForm } from "./notes/NoteForm.js";
import { witnessListButton } from "./witnesses/witnessList.js";
import { getWitnesses } from "./witnesses/witnessDataProvider.js";

NoteForm();
getWitnesses().then(witnessListButton);
getCriminals().then(criminalList);
getConvictions().then(ConvictionSelect);