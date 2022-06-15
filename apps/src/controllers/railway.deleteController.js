const railway = require('../models/railway.deleteModel');

async function deleteTarif(req,res){
    try{
        const result = await railway.deleteTarif(req);
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

async function deleteAdmin(req,res){
    try{
        const result = await railway.deleteAdmin(req);
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

async function deleteKereta(req,res){
    try{
        const result = await railway.deleteKereta(req);
        console.log(result)
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

async function deleteStasiun(req,res){
    try{
        const result = await railway.deleteStasiun(req);
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}


module.exports = {
    deleteTarif,
    deleteAdmin,
    deleteKereta,
    deleteStasiun
}