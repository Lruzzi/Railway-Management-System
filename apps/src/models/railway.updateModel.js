const db = require('../configs/db.config');
const helper = require('../utils/helper.util');
const tarif = require('../middleware/railway.tarifquery');
const admin = require('../middleware/railway.adminquery');
const kereta = require('../middleware/railway.keretaquery');

async function updateTarif(req) {
    var id_tarif = req.body.id_tarif;
    var id_rute = req.body.id_rute;
    var harga = req.body.harga;
    const query = await tarif.query(id_tarif, id_rute, harga);
    if(query=== 'empty'){
        return ('empty');
    }
    const result = await db.query(query);
    if(result){
        return('updated');
    }
    else{
        return('faile');
    }
}

async function updateAdmin(req) {
    var id_admin = req.body.id_admin;
    var username = req.body.username;
    var password = req.body.password;
    hash = await helper.hashPassword(password);

    const query = await admin.query(id_admin,username, hash);
    if(query=== 'empty'){
        return ('empty');
    }
    const result = await db.query(query);
    if(result){
        return('updated');
    }
    else{
        return('failed');
    }
}

async function updateKereta(req) {
    var id_kereta = req.body.id_kereta;
    var nama_kereta = req.body.nama_kereta;
    var kapasitas_kereta = req.body.kapasitas_kereta;
    var tahun_buat = req.body.tahun_buat;
    var tahun_aktif = req.body.tahun_aktif;

    const query = await kereta.query(id_kereta, nama_kereta, kapasitas_kereta, tahun_buat, tahun_aktif);
    if(query=== 'empty'){
        return ('empty');
    }
    const result = await db.query(query);
    if(result){
        return('updated');
    }
    else{
        return('failed');
    }
}


module.exports = {
    updateTarif,
    updateAdmin,
    updateKereta
}