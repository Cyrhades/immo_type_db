let loader = require('../../app/getFiles.js');
let RepoUser = loader().repository('User');

module.exports = class Authenticated {
    printForm(request, response) {
        response.render('authenticated/form', {form: {}});  
    }

    processForm(request, response) {
        RepoUser.getUserByEmail(request.body.email).then((user) => {
            let bcrypt = require('bcryptjs');
            if(bcrypt.compareSync(request.body.password, user.password)) {
                request.session.user = user;
                request.flash('notify', 'Vous êtes maintenant connecté.');
                response.redirect('/');
            } else {
                response.render('authenticated/form', { 
                    error : `L'identification a échouée`, 
                    form : {email : request.body.email || ''}
                }); 
            }       
        }, () => {
            response.render('authenticated/form', { 
                error : `L'identification a échouée`, 
                form : {email : request.body.email || ''}
            }); 
        });
    }

    disconnect(request, response) {
        request.session.user = null;
        request.flash('notify', 'Vous êtes maintenant déconnecté.');
        response.redirect('/');
    }
}