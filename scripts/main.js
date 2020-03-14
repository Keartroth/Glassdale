import { getCriminals } from "./criminals/criminalDataProvider.js";
import { criminalList, criminalListButton } from "./criminals/CriminalList.js";
import { ConvictionSelect } from "./convictions/ConvictionsSelect.js";
import { getConvictions } from "./convictions/convictionsDataProvider.js";
import { NoteForm } from "./notes/NoteForm.js";
import { witnessListButton } from "./witnesses/WitnessList.js";
import { getWitnesses } from "./witnesses/witnessDataProvider.js";
import { getNotes } from "./notes/noteDataProvider.js";
import { noteListButton } from "./notes/NoteList.js";

getNotes();
NoteForm();
getConvictions().then(ConvictionSelect);
getWitnesses().then(witnessListButton);
getCriminals().then(criminalList).then(criminalListButton);
noteListButton();