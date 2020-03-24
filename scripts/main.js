import { getCriminals } from "./criminals/criminalDataProvider.js";
import { criminalList } from "./criminals/CriminalList.js";
import { ConvictionSelect } from "./convictions/ConvictionsSelect.js";
import { getConvictions } from "./convictions/convictionsDataProvider.js";
import { NoteForm } from "./notes/NoteForm.js";
import { witnessListButton } from "./witnesses/WitnessListButton.js";
import { getWitnesses } from "./witnesses/witnessDataProvider.js";
import { noteListButton } from "./notes/NoteListButton.js";
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { getOfficers } from "./officers/officerDataProvider.js";
import { filterListButton, FilterComponent } from "./criminals/Filter.js";
import { criminalListButton } from "./criminals/CriminalListButton.js";
import { DisplayNoteFormButton } from "./notes/NoteFormButton.js";
import "./witnesses/WitnessList.js";
import { dateInputFilter } from "./criminals/dateInputFilter.js";
import { noteList } from "./notes/NoteList.js";

DisplayNoteFormButton();
noteListButton();
witnessListButton();
criminalListButton();
dateInputFilter();
filterListButton();

getWitnesses();
getCriminals()
    .then(criminalList)
    .then(NoteForm)
    .then(noteList);

getConvictions()
    .then(ConvictionSelect);

getOfficers()
    .then(OfficerSelect);

FilterComponent();