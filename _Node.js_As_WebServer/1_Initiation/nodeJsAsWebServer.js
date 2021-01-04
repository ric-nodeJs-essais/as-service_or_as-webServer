let http = require('http');

//Pour lancer ce serveur, taper en ligne de commande:  node nodeJsAsWebServer  (CTRL+C pour interrompre).
//Puis ouvrir le navigateur sur localhost:555.

let oMyWebServer = http.createServer(function (req, res) {
  //res.writeHead(200, {'Content-Type': 'text/html'}); //<HTML par défaut.
  res.write("<h1>GOOD!</h1>");
  //res.write(req.url);
  console.log("\n\n"+"req.url="+req.url);
  //
  res.end();
});


let iPort=555;
console.clear();
console.log("Node Web Server listening on localhost:"+iPort+" ...    (CTRL+C to stop)");
oMyWebServer.listen(iPort); 