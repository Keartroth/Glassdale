import { getCriminals } from "./criminals/criminalDataProvider.js";
import { criminalList } from "./criminals/CriminalList.js";
import { criminalListButton } from "./criminals/CriminalListButton.js";
import { ConvictionSelect } from "./convictions/ConvictionsSelect.js";
import { getConvictions } from "./convictions/convictionsDataProvider.js";
import { NoteForm } from "./notes/NoteForm.js";
import { witnessListButton } from "./witnesses/WitnessListButton.js";
import { getWitnesses } from "./witnesses/witnessDataProvider.js";
import { getNotes } from "./notes/noteDataProvider.js";
import { noteListButton } from "./notes/NoteListButton.js";
import { witnessListEventListener } from "./witnesses/WitnessList.js";

getNotes();
getWitnesses().then(witnessListButton).then(witnessListEventListener);
NoteForm();
getConvictions().then(ConvictionSelect);
getCriminals().then(criminalList).then(criminalListButton);
noteListButton();