import { getCriminals } from "./criminals/CriminalProvider.js";
import { criminalList } from "./criminals/CriminalList.js";
import { ConvictionSelect } from "./convictions/ConvictionsSelect.js";
import { getConvictions } from "./convictions/ConvictionsProvider.js";
import { NoteForm } from "./notes/NoteForm.js";

NoteForm();
getCriminals().then(criminalList);
getConvictions().then(ConvictionSelect);