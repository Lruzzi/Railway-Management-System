const db = require('../configs/db.config');
const helper = require('../utils/helper.util');

async function deleteTarif(req) {
    var id_tarif = req.body.id_tarif;
    if (id_tarif) {
        const query = `delete from tarif where id_tarif = '${id_tarif}';` //query delete data tarif
        const result = await db.query(query);
        if(result){
            return('deleted');
        }
        else{
            return('faile');
        }
        
    }
    else {
        return ('empty');
    }
}

async function deleteAdmin(req) {
    var id_admin = req.body.id_admin;

    const query = `delete from admin where id_admin = '${id_admin}';` //query delete data admin
    const result = await db.query(query);
    if(result){
        return('deleted');
    }
    else{
        return('failed');
    }
}

async function deleteKereta(req) {
    var id_kereta = req.body.id_kereta;
    console.log(id_kereta);
    const query = `delete from kereta where id_kereta = '${id_kereta}';` //query delete data kereta
    const result = await db.query(query);
    if(result){
        return('deleted');
    }
    else{
        return('failed');
    }
}

async function deleteStasiun(req) {
    var id_stasiun = req.body.id_stasiun;
    console.log(id_stasiun);
    const query = `delete from stasiun where id_stasiun = '${id_stasiun}';` //query delete data stasiun
    const result = await db.query(query);
    if(result){
        return('deleted');
    }
    else{
        return('failed');
    }
}


module.exports = {
    deleteTarif,
    deleteAdmin,
    deleteKereta,
    deleteStasiun
}