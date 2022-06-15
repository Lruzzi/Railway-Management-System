const db = require('../configs/db.config');
const helper = require('../utils/helper.util');

async function cekSuper(username) {
    const query = `Select super_admin from admin where username like '${username}'`;
    const result = await db.query(query);
    if(result.rowCount === 0){
        return {
            status: false,
            message: 'Data not found'
        }
    }
    if(result.rows[0].super_admin === true){
        return ('super')
    }
    else{
        return ('notsuper')
    }
}

async function cekTarif(req){
    var id_tarif = req.body.id_tarif;
    if(id_tarif){
        const query = `select * from tarif where id_tarif = ${id_tarif};`
        const result = await db.query(query);
        if(result.rowCount === 0){
            return ('notfound')
        }
        return ('found')
    }
    else{
        return('empty')
    }
    
}

async function cekIdRute(req){
    var id_rute = req.body.id_rute;
    console.log(id_rute)
    const query = `select * from tarif where id_rute = ${id_rute};`
    const result = await db.query(query);
    if(result.rowCount === 0){
        return ('notfound')
    }
    else{
        return ('exist')
    }
    
}

async function cekAdmin(req){
    var id_admin = req.body.id_admin;
    console.log(id_admin)
    const query = `select * from admin where id_admin = '${id_admin}';`
    const result = await db.query(query);
    if(id_admin){
        if(result.rowCount === 0){
            return ('notfound')
        }
        else{
            return ('found')
        }
    }
    else{
        return('empty')
    }
    
}

async function cekUsername(req){
    var username = req.body.username;
    const query = `select * from admin where username like '${username}';`
    const result = await db.query(query);
    if(result.rowCount === 0){
        return ('nottaken')
    }
    else{
        return ('taken')
    }
}

async function cekKereta(req){
    var id_kereta = req.body.id_kereta;
    const query = `select * from kereta where id_kereta = '${id_kereta}';`
    const result = await db.query(query);
    if(id_kereta){
        if(result.rowCount === 0){
            return ('notfound')
        }
        else{
            return ('found')
        }
    }
    else{
        return('empty')
    }    
}

async function cekStasiun(req){
    var id_stasiun = req.body.id_stasiun;
    const query = `select * from stasiun where id_stasiun = '${id_stasiun}';`
    const result = await db.query(query);
    if(id_stasiun){
        if(result.rowCount === 0){
            return ('notfound')
        }
        else{
            return ('found')
        }
    }
    else{
        return('empty')
    }
}

async function cekRute(req){
    var id_rute = req.body.id_rute;
    const query = `select * from rute where id_rute = '${id_rute}';`
    const result = await db.query(query);
    if(id_rute){
        if(result.rowCount === 0){
            return ('notfound')
        }
        else{
            return ('found')
        }
    }
    else{
        return('empty')
    }
}

async function cekNamaKereta(nama_kereta){
    const query = `select * from kereta where nama_kereta like '${nama_kereta}';`
    const result = await db.query(query);
    if(nama_kereta){
        if(result.rowCount === 0){
            return ('notfound')
        }
        else{
            return ('found')
        }
    }
    else{
        return('empty')
    }
}

async function cekNamaStasiun(nama_stasiun){
    const query = `select * from stasiun where nama_stasiun like '${nama_stasiun}';`
    const result = await db.query(query);
    if(nama_stasiun){
        if(result.rowCount === 0){
            return ('notfound')
        }
        else{
            return ('found')
        }
    }
    else{
        return('empty')
    }
}

async function cekUser(username){
    const query = `select * from admin where username like '${username}';`
    const result = await db.query(query);
    if(result.rowCount === 0){
        return ('notfound')
    }
    else{
        return ('taken')
    }
}

module.exports = {
    cekSuper,
    cekTarif,
    cekIdRute,
    cekAdmin,
    cekUsername,
    cekKereta,
    cekStasiun,
    cekRute,
    cekNamaKereta,
    cekNamaStasiun,
    cekUser
}