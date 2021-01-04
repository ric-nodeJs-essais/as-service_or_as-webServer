import { addWooh } from "./someModuleJSCode2"; //<<< PAS D'EXTENSION précisée car on est en typescript !
//Pour le compilo., elle vaudra ".ts". 
export function fMain() {
    console.log(addWooh("Yo from someModuleJSCode.ts/js !"));
    console.log("window.document.body:", window.document.body);
    window.document.getElementById("myImg").addEventListener("click", () => { alert("CUI CUI !!"); });
}
