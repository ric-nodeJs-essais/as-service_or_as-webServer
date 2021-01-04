let http = require('http');
let url = require('url');

//
let oServableData = {
  1: {
    prenom: "Gérard",
    nom: "PAYET",
    countryID: 20
  },
  2: {
    prenom: "Jérôme",
    nom: "PERRIN",
    countryID: 10
  }
};

//Pour lancer ce serveur, taper en ligne de commande:  node nodeJsAsService  (CTRL+C pour interrompre).
//Invocation du service:
//   http://localhost:222/?id=1  ou  http://localhost:222/?id=2

let oMyWebServer = http.createServer(function (req, res) {
  console.log("\n\n\n============= "+req.url+" ================");
  let sQueryString = req.url.replace(new RegExp("^(.*)[?](.*)$"), "$2");
  let oURLSearchParams = new url.URLSearchParams(sQueryString);
  console.log(oURLSearchParams);
  let sRequestedID = oURLSearchParams.get("id");
  console.log("sRequestedID="+sRequestedID);

  let oDataToServe = oServableData[sRequestedID];
  
  //------------------------------
  let fSendResponse=function(poDataToServe) {
    var oHeaders = {};
    oHeaders["Access-Control-Allow-Origin"] = "*"; //<<<<<< AUTORISATION importante !!
    oHeaders["Content-Type"] = "application/json";
    res.writeHead(200, oHeaders);
    //
    let sDataToServe = JSON.stringify(poDataToServe); // to JSON string
    console.log("Complete sDataToServe: ", sDataToServe);
    res.write(sDataToServe);
    //
    res.end(); //Envoi de la réponse au client, par le Service 1 donc.
  }
  //fSendResponse(oDataToServe);return;
  //------------------------------
  

  //  Invocation -(par le présent Service 1 donc)- du Service 2, qui, bien sûr 
  //  doit avoir été lancé, lui aussi.
  http.get("http://localhost:777/?id="+oDataToServe.countryID, (resp) => {
    let data = '';

    console.log("\n------------------");

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      console.log("chunk :", chunk); //Buffer de de caractères en Hexa.
      data += chunk; //Construction de la réponse du Service 2   {string}
    });

    // The whole response has been received.
    resp.on('end', () => {
      console.log("FullData recieved from Service 2 : ", data, "(de type ", typeof(data), ")"); // JSON string
      let oData = JSON.parse(data); // JSON string ---> Object
      console.log("oData recieved from Service 2:", oData);
      oDataToServe = Object.assign(oDataToServe, oData); //Merge des objets
      fSendResponse(oDataToServe); //Appel de ma fonction de réponse du présent Service 1
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

});


let iPort=222;
console.clear();
console.log("Node Web Server,Service1, listening on localhost:"+iPort+" ...    (CTRL+C to stop)");
oMyWebServer.listen(iPort);