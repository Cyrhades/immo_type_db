const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');
const sassMiddleware = require('node-sass-middleware');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    secret: config.appKey, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));
//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
app.use(flash());

//--------------------------------------------------------------------
//      Gestinnaire sass
//--------------------------------------------------------------------
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'build'),
    dest: path.join(__dirname, 'public'),
    debug: false,
    indentedSyntax: true, // true Compiles files with the .sass extension
    outputStyle: 'compressed'
}));

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 
//--------------------------------------------------------------------
//       permet d'envoyer des variables à toutes les vues
//-------------------------------------------------------------------- 
app.use((req,res,next) => {
    res.locals.session = req.session;
    res.locals.websiteName = config.websiteName; 
    res.locals.route = req._parsedUrl.pathname;
    next();
});

//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(config.port,() => {
    console.log(`Le serveur est démarré : http://localhost:${config.port}`);
    if (process.send) {
        process.send('online');
    }
});