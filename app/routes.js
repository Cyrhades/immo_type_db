let loader = require('./getFiles.js');
module.exports = (app) => {

    app.get('/', loader().controller('Home').print);
    
    app.get('/inscription', loader().controller('Register').printForm);
    app.post('/inscription', loader().controller('Register').processForm);
   
    app.get('/connexion', loader().controller('Authenticated').printForm);
    app.post('/connexion', loader().controller('Authenticated').processForm);

    app.get('/deconnexion', loader().controller('Authenticated').disconnect);

    app.get('/admin', loader().controller('Dashboard').print);
};