let http = require('http');
let url = require('url');

//
let oServableData = {
  1: {
    prenom: "Gérard",
    nom: "PAYET"
  },
  2: {
    prenom: "Jérôme",
    nom: "PERRIN"
  }
};

//Pour lancer ce serveur, taper en ligne de commande:  node nodeJsAsService  (CTRL+C pour interrompre).
//Invocation du service:
//   http://localhost:555/?id=1  ou  http://localhost:555/?id=2

let oMyWebServer = http.createServer(function (req, res) {
  console.log("\n\n\n============= "+req.url+" ================");
  let sQueryString = req.url.replace(new RegExp("^(.*)[?](.*)$"), "$2");
  let oURLSearchParams = new url.URLSearchParams(sQueryString);
  console.log(oURLSearchParams);
  let sRequestedID = oURLSearchParams.get("id");
  console.log("sRequestedID="+sRequestedID);

  let oDataToServe = oServableData[sRequestedID];
  console.log(oDataToServe, typeof(oDataToServe));
  
  //
  var oHeaders = {};
  oHeaders["Access-Control-Allow-Origin"] = "*"; //<<<<<< AUTORISATION importante !!
  oHeaders["Content-Type"] = "application/json";
  res.writeHead(200, oHeaders);
  //
  let sDataToServe = JSON.stringify(oDataToServe);
  console.log(sDataToServe+" / "+typeof(sDataToServe));
  res.write(sDataToServe);
  //
  res.end();
});


let iPort=555;
console.clear();
console.log("Node Web Server listening on localhost:"+iPort+" ...    (CTRL+C to stop)");
oMyWebServer.listen(iPort); 