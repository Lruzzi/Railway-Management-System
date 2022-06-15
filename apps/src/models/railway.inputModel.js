const db = require('../configs/db.config');
const helper = require('../utils/helper.util');
const cek = require('../Controllers/railway.cekController');

async function inputTarif(req) {
    var id_rute = req.body.id_rute;
    var harga = req.body.harga;
    const check = await cek.cekIdRute(id_rute);
    if(check === 'exist'){
        return ('fail');
    }
    else{
        if (id_rute && harga) {
            const query = `insert into tarif (id_rute,harga) values ('${id_rute}','${harga}');`; //query insert data tarif

            //mengecek informasi yang dimasukkan user apakah terdaftar pada database
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
}

async function inputAdmin(req) {
    var username = req.body.username;
    var password = req.body.password;
    
    
    if(username && password){
        var check = await cek.cekUser(username);
        if(check === 'taken'){
            return ('taken');
        }
        else{
            var regex = await helper.matchPattern(username, password);
            if(regex === 'false'){
                hash = await helper.hashPassword(password);
                const query = `insert into admin (username,password,super_admin) values ('${username}','${hash}',false);`; //query insert data admin
                const result = await db.query(query);
                if(result){
                    return('done');
                }
                else{
                    return('fail');
                }
            }
            else if(regex === 'uptrue'){
                return('uptrue');
            }
            else if(regex === 'utrue'){
                return('utrue');
            }
            else if(regex === 'ptrue'){
                return('ptrue');
            }
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
    

    if (nama_kereta && kapasitas && tahun_pembuatan && tahun_aktif) {
        var check = await cek.cekNamaKereta(nama_kereta);
        if(check === 'found'){
            return ('exist');
        }
        else{
            const query = `insert into kereta (nama_kereta,kapasitas_kereta,tahun_buat,tahun_aktif) values ('${nama_kereta}','${kapasitas}','${tahun_pembuatan}', '${tahun_aktif}');`; //query insert data kereta
            const result = await db.query(query);
            
            if (result) {
                return ('done');
            } else {
                return ('fail');
            } 
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
        var check = await cek.cekNamaStasiun(nama_stasiun);
        console.log('cek'+ check);
        if(check === 'found'){
            return ('exist');
        }
        else{
            const query = `insert into stasiun (nama_stasiun,daerah_stasiun,tahun_bangun) values ('${nama_stasiun}','${daerah_stasiun}','${tahun_dibangun}');`; //query insert data stasiun
            const result = await db.query(query);
            if(result){
                return('done');
            }
            else{
                return('fail');
            }
        }
    }
    else{
        return('empty');
    }
}

async function inputRute(req) {
    var id_kereta = req.body.id_kereta;
    var id_stasiun_ber = req.body.stasiun_ber;
    var waktu_ber = req.body.waktu_ber;
    var id_stasiun_tib = req.body.stasiun_tib;
    var waktu_tib = req.body.waktu_tib;
    var jarak = req.body.jarak;

    if(id_kereta && id_stasiun_ber && waktu_ber && id_stasiun_tib && waktu_tib && jarak){
        const query = `insert into rute (id_kereta, id_stasiun_berangkat, waktu_berangkat, id_stasiun_tiba, waktu_tiba, jarak) values ('${id_kereta}','${id_stasiun_ber}','${waktu_ber}','${id_stasiun_tib}','${waktu_tib}', '${jarak}');`; //query tambahkan user baru ke database
        const result = await db.query(query);
        if (result) {
            return ('done');
        } else {
            return ('fail');
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
    inputStasiun,
    inputRute
}