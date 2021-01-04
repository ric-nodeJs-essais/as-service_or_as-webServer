let sServiceBaseURL="http://localhost:222/"; //<<<<Spécification du Protocole Obligatoire ! (http ou https).

//@return {Promise}
export function getPersonById(psPersonID) {
    let sServiceURL=sServiceBaseURL+"?id="+psPersonID;
    //
    //Remarque1 : l'autorisation de cross origin est gérée côté serveur !
    //Remarque2 : la réponse JSON du serveur doit être convertie via la méthode json().
    return( window.fetch(sServiceURL)
            .then(poResponse=>poResponse.json())
          ); //{Promise}
}