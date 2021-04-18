let loader = require('../../app/getFiles.js');
let RepoUser = loader().repository('User');

module.exports = class Register {
    printForm(request, response) {
        response.render('register/form', {form: {}});  
    }

    processForm(request, response) {
        let entity = {
            email : request.body.email || '',
            password : request.body.password || '', // devra être hashé
            civility : request.body.civility || '',
            firstname: request.body.firstname || '',
            lastname: request.body.lastname || '',
            phone: request.body.phone || ''
        };

        RepoUser.emailExists(entity.email).then((result) => {
            // si l'email existe deja dans la bdd
            if(result === true) {
                response.render('register/form', { 
                    error : `Cette adresse email existe déjà dans notre base de données`, 
                    form : entity 
                }); 
            } else {
                let bcrypt = require('bcryptjs');
                entity.password = bcrypt.hashSync(
                    entity.password, 
                    bcrypt.genSaltSync(10)
                );

                // sinon on tente de le créer
                RepoUser.add(entity).then((user) => {
                    request.flash('notify', 'Votre compte a bien été créé.');
                    response.redirect('/');
                }, (err) => {
                    console.log(err);
                    response.render('register/form', { 
                        error : `L'enregistrement en base de données a échoué`, 
                        form : entity 
                    }); 
                });         
            }
        });
    }
};