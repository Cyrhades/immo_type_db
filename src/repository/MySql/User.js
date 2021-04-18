let MySql = require('../../../app/database/connectMySql.js');

module.exports = class User {
    constructor() {
        this.db = MySql; 
    }

    add(user) {
        return new Promise((resolve, reject) => {
            // On vérifie si l'adresse email existe déjà en BDD
            this.emailExists(user.email).then((result) => {
                if(result) {
                    reject(`L'adresse email "${user.email}" est déjà présente dans notre base de données.`);
                } else {
                    user.created_at = new Date().toISOString().slice(0,19).replace('T', ' ');
                    this.db.query(`INSERT INTO users SET ?`, user, function (error, results, fields) {  
                        if (error) { reject(error.message); }
                        else resolve(results.insertId);
                    });
                }
            }, reject);
        });
    }

    emailExists(email) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT count(id) AS count FROM users WHERE ?', {email}, function (error, results, fields) {
                if (error) { reject(error.message);}
                // n'existe pas
                if(results[0].count == 0) resolve(false);
                // existe
                else resolve(true);
            });
        });
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM users WHERE ?', {email}, function (error, results, fields) {
                if (error) { reject(error.message);}
                else resolve(results[0]);
            });
        });
    }
} 