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

module.exports = {
    cekSuper,
    cekTarif,
    cekIdRute
}