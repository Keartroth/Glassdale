import { getCriminals } from "./criminals/CriminalProvider.js";
import { criminalList } from "./criminals/CriminalList.js";
import ConvictionSelect from "./convictions/ConvictionsSelect.js";
import { getConvictions } from "./convictions/ConvictionsProvider.js";

getCriminals().then(criminalList);
getConvictions().then(ConvictionSelect);