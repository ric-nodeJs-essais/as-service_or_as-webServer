const oHttpTool = require('http');
const oFilesTool = require('fs');
const oPathesTool = require('path');

const oMIMETypes = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'text/javascript',

  'json': 'application/json',
  'xml':  'application/xml',
  
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'ico': 'image/x-icon',

  'wav': 'audio/wav',
  'mp3': 'audio/mpeg',

  'pdf': 'application/pdf',
  'doc': 'application/msword'
};


//Depuis ici, pour lancer ce serveur, taper en ligne de commande:  node nodeJsAsWebServer  (CTRL+C pour interrompre).
//Puis ouvrir le navigateur :

// SOIT sur : localhost:555/MonSite/VersionES6/_main.html  (pour un fonctionnement basique n'engendrant pas d'URL Rewriting)
// SOIT sur : localhost:555/MonSite/VersionTypescript/_main.html  (pour un fonctionnement avec URL Rewriting)


let oMyWebServer = oHttpTool.createServer(function (req, res) {
  
  console.log("\n\n=========================================================");
  console.log("=========================================================\n");

  let sSubUrl = req.url; // "/MonSite/..."
  console.log("Le client demande le fichier: "+sSubUrl);
    
  let sFileExtension = oPathesTool.parse(sSubUrl).ext.substr(1);    
  let sMIMEType = oMIMETypes[sFileExtension];
  console.log("sMIMEType="+sMIMEType);

  let sFileHDDPath = __dirname; // "D:/...."
  let sFileToRead = sFileHDDPath+sSubUrl;
  console.log("sFileToRead="+sFileToRead);
  oFilesTool.exists(sFileToRead, function (pbFileExists) {
    if(!pbFileExists) {
      console.log(`  - File NOT FOUND on the server!  -`);
      if (sFileExtension==="") { //Si l'URL demandée ne possède pas d'extension.
        //On pré-suppose que ce qui est en fait demandé est un fichier .js
        //(gestion du fameux problème des lignes d'import ES6 générée par un compilo. Typescript)
        let sNewUrl = sSubUrl+".js";
        console.log(" REDIRECTION ... (équivaut à un URL Rewriting ! sNewUrl='"+sNewUrl+"'; OldUrl='"+sSubUrl+"')");
        res.writeHead( 301, {Location: sNewUrl} ); //Redirection, on essaye avec la même URL, mais avec l'extension ".js" au bout
        res.end();
      } else {
        res.statusCode = 404;
        res.end();
      }

    } else {
      oFilesTool.readFile(sFileToRead, function(poError, poData){
        if(poError){
          res.statusCode = 500;
          console.log("ERROR getting file content !!", poError);
          res.end();

        } else {
          res.setHeader('Content-type', sMIMEType );
          //res.end(poData.toString()); //<<<Ne fonctionnerait que pour des fichiers texte !!
          //console.log(poData.toString());
          res.end(poData); //<<Fonctionne pour aussi bien pour fichiers texte que fichiers binaires (images,...).
        }
      });      
    }
  });

});


let iPort=555;
console.clear();
console.log("Node Web Server listening on localhost:"+iPort+" ...    (CTRL+C to stop)");
oMyWebServer.listen(iPort);