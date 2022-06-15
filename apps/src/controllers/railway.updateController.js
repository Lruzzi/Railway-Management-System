const railway = require('../models/railway.updateModel');

async function updateTarif(req,res){
    try{
        const result = await railway.updateTarif(req);
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

async function updateAdmin(req,res){
    try{
        const result = await railway.updateAdmin(req);
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

async function updateKereta(req,res){
    try{
        const result = await railway.updateKereta(req);
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

module.exports = {
    updateTarif,
    updateAdmin,
    updateKereta
}