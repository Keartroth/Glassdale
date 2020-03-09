import { getCriminals } from "./criminals/CriminalProvider.js";
import { criminalList } from "./criminals/CriminalList.js";

getCriminals().then(criminalList);