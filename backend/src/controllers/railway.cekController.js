const railway = require('../models/railway.cekModel');

async function cekSuper(username){
    try{
        const result = await railway.cekSuper(username);
        console.log('contorl'+result)
        return result;
    }
    catch(err){
        return err;
    }
}

async function cekTarif(req,res){
    try{    
        const result = await railway.cekTarif(req);
        res.json(result)
    }
    catch(err){
        return err;
    }
}

module.exports = {
    cekSuper,
    cekTarif
}

