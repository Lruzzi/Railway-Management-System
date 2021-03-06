const db = require('../configs/db.config');
const helper = require('../utils/helper.util');
const tarif = require('../middleware/railway.tarifquery');
const admin = require('../middleware/railway.adminquery');
const kereta = require('../middleware/railway.keretaquery');
const stasiun = require('../middleware/railway.stasiunquery');
const rute = require('../middleware/railway.rutequery');

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

async function updateStasiun(req) {
    var id_stasiun = req.body.id_stasiun;
    var nama_stasiun = req.body.nama_stasiun;
    var daerah_stasiun = req.body.daerah_stasiun;
    var tahun_bangun = req.body.tahun_bangun;

    console.log(id_stasiun, nama_stasiun, daerah_stasiun, tahun_bangun);

    const query = await stasiun.query(id_stasiun, nama_stasiun, daerah_stasiun, tahun_bangun);
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

async function updateRute(req) {
    var id_rute = req.body.id_rute;
    var id_kereta = req.body.ker;
    var id_stasiun_ber = req.body.sber;
    var waktu_ber = req.body.wber;
    var id_stasiun_tib = req.body.stuj;
    var waktu_tib = req.body.wtib;
    var jarak = req.body.jar;

    const query = await rute.query(id_rute, id_kereta, id_stasiun_ber, waktu_ber, id_stasiun_tib, waktu_tib, jarak);
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
    updateKereta,
    updateStasiun,
    updateRute
}