let MySql = require('../../../app/database/connectMySql.js');

module.exports = class Realty {
    constructor() {
        this.db = MySql; 
    }

    add(realtyEntity) {
        return new Promise((resolve, reject) => {
            let created_at = new Date().toISOString().slice(0,19).replace('T', ' ');
            let contact = realtyEntity.contact;
                contact.created_at = created_at;
            let address = realtyEntity.address;
                address.created_at = created_at;
            let realty = realtyEntity;
                realty.created_at = created_at;
            delete realty.contact;
            delete realty.address;
            
            MySql.query(`INSERT INTO contact SET ?`, contact, function (error, resultContact, fields) {  
                if (error) { reject(error.message);  return;}
                
                MySql.query(`INSERT INTO address SET ?`, address, function (error, resultAddress, fields) {  
                    if (error) { reject(error.message);  return;}

                    realty.price = parseFloat(realty.price);
                    realty.amount_commission = parseFloat(realty.amount_commission);
                    realty.area = parseInt(realty.area);
                    realty.room = parseInt(realty.room);
                    realty.contact_id = resultContact.insertId;
                    realty.address_id = resultAddress.insertId;
                    console.log(realty)
                    MySql.query(`INSERT INTO realties SET ?`, realty, function (error, results, fields) {  
                        if (error) { reject(error.message); }
                        else resolve(results.insertId);
                    });
                });
            });
        });
    }

    find(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM realties WHERE ?`, {id : filter._id}, function (error, results, fields) {  
                if (error) { reject(error.message); }
                else resolve(results);
            });
        });
    }

    delete(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.query(`DELETE FROM realties WHERE ?`, {id : filter._id}, function (error, results, fields) {  
                if (error) { reject(error.message); }
                else resolve(results);
            });
        });
    }
} 