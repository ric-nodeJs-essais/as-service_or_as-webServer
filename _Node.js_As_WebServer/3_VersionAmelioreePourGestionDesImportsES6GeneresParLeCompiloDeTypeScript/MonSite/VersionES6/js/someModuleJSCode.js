import {addWooh} from "./someModuleJSCode2.js"; //Ligne avec une extension .js OK.

export function fMain() {
    console.log(addWooh("Yo from someModuleJSCode.js !"));
    console.log("window.document.body:", window.document.body);

    window.document.getElementById("myImg").addEventListener("click", ()=>{alert("CUI CUI !!");});
}