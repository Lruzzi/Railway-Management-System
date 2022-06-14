const db = require('../configs/db.config');
const helper = require('../utils/helper.util');

async function inputTarif(req) {
    var id_rute = req.body.id_rute;
    var harga = req.body.harga;
    console.log(id_rute, harga);
    if (id_rute && harga) {
        const query = `insert into tarif (id_rute,harga) values ('${id_rute}','${harga}');`; //query insert data tarif

        //mengecek informasi yang dimasukkan user apakah terdaftar pada database
        const result = await db.query(query);
        if (result) {
            return ('done');
        } else {
            return ('faile');
        }
    } else {
        return ('empty');
    }
}

async function inputAdmin(req) {
    var username = req.body.username;
    var password = req.body.password;
    if(username && password){
        hash = await helper.hashPassword(password);
        const query = `insert into admin (username,password,super_admin) values ('${username}','${hash}',false);`; //query insert data admin
        const result = await db.query(query);
        if(result){
            return('done');
        }
        else{
            return('faile');
        }
    }
    else{
        return('empty');
    }
}



module.exports = {
    inputTarif,
    inputAdmin
}