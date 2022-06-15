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

async function cekIdRute(req,res){
    try{
        const result = await railway.cekIdRute(req);
        console.log(result)
        res.json(result)
    }
    catch(err){
        return err;
    }
}

async function cekAdmin(req,res){
    try{
        const result = await railway.cekAdmin(req);
        console.log(result)
        res.json(result)
    }
    catch(err){
        return err;
    }
}

async function cekUsername(req,res){
    try{
        const result = await railway.cekUsername(req);
        console.log(result)
        res.json(result)
    }
    catch(err){
        return err;
    }
}

async function cekKereta(req,res){
    try{
        const result = await railway.cekKereta(req);
        res.json(result)
    }
    catch(err){
        return err;
    }
}

async function cekStasiun(req,res){
    try{
        const result = await railway.cekStasiun(req);
        res.json(result)
    }
    catch(err){
        return err;
    }
}

async function cekRute(req,res){
    try{
        const result = await railway.cekRute(req);
        res.json(result)
    }
    catch(err){
        return err;
    }
}

async function cekNamaKereta(nama_kereta){
        const result = await railway.cekNamaKereta(nama_kereta);
        return(result);
}

async function cekNamaStasiun(nama_stasiun){
        const result = await railway.cekNamaStasiun(nama_stasiun);
        return(result);
}

async function cekUser(username){
        const result = await railway.cekUser(username);
        return(result);
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