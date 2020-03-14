import { getCriminals } from "./criminals/CriminalProvider.js";
import { criminalList, criminalListButton } from "./criminals/CriminalList.js";
import { ConvictionSelect } from "./convictions/ConvictionsSelect.js";
import { getConvictions } from "./convictions/ConvictionsProvider.js";
import { NoteForm } from "./notes/NoteForm.js";
import { witnessListButton } from "./witnesses/witnessList.js";
import { getWitnesses } from "./witnesses/witnessDataProvider.js";
import { getNotes } from "./notes/noteDataProvider.js";
import { noteListButton } from "./notes/NoteList.js";

getNotes();
NoteForm();
getConvictions().then(ConvictionSelect);
getWitnesses().then(witnessListButton);
getCriminals().then(criminalList).then(criminalListButton);
noteListButton();