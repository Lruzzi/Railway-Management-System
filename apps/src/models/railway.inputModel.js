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

async function inputKereta(req) {
    var nama_kereta = req.body.nama_kereta;
    var kapasitas = req.body.kapasitas;
    var tahun_pembuatan = req.body.tahun_pembuatan;
    var tahun_aktif = req.body.tahun_aktif;

    console.log(nama_kereta, kapasitas, tahun_pembuatan, tahun_aktif);

    if (nama_kereta && kapasitas && tahun_pembuatan && tahun_aktif) {
        const query = `insert into kereta (nama_kereta,kapasitas_kereta,tahun_buat,tahun_aktif) values ('${nama_kereta}','${kapasitas}','${tahun_pembuatan}', '${tahun_aktif}');`; //query insert data kereta
        const result = await db.query(query);
        if (result) {
            return ('done');
        } else {
            return ('fail');
        }
    } else {
        return ('empty');
    }
}

async function inputStasiun(req) {
    var nama_stasiun = req.body.nama_stasiun;
    var daerah_stasiun = req.body.daerah_stasiun;
    var tahun_dibangun = req.body.tahun_dibangun;

    if(nama_stasiun && daerah_stasiun && tahun_dibangun){
        const query = `insert into stasiun (nama_stasiun,daerah_stasiun,tahun_bangun) values ('${nama_stasiun}','${daerah_stasiun}','${tahun_dibangun}');`; //query insert data stasiun
        const result = await db.query(query);
        if(result){
            return('done');
        }
        else{
            return('fail');
        }
    }
    else{
        return('empty');
    }
}

module.exports = {
    inputTarif,
    inputAdmin,
    inputKereta,
    inputStasiun
}