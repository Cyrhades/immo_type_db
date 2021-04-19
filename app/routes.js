let loader = require('./getFiles.js');
let errorsHTTP = require('./errorsHTTP.js')();
module.exports = (app) => {

    app.route("/")
        .get(loader().controller('Home').print)
        .all(errorsHTTP.error405);
    
    app.route("/inscription")
        .get(loader().controller('Register').printForm)
        .post(loader().controller('Register').processForm)
        .all(errorsHTTP.error405);
   
    app.route("/connexion")
        .get(loader().controller('Authenticated').printForm)
        .post( loader().controller('Authenticated').processForm)
        .all(errorsHTTP.error405);

    app.route("/deconnexion")
        .get(loader().controller('Authenticated').disconnect)
        .all(errorsHTTP.error405);

    app.route("/admin")
        .get(loader().controller('Dashboard').print)
        .all(errorsHTTP.error405);

    // Erreur 404
    app.route("*").all(errorsHTTP.error404);
};