import {getPersonById} from "./serviceCaller.js";

export function fMain() {
    let fShowPerson = (poPerson)=>{console.log(poPerson);}
    //

    getPersonById(1)
    .then(poPerson=>fShowPerson(poPerson));

    getPersonById(2)
    .then(poPerson=>fShowPerson(poPerson));    
}