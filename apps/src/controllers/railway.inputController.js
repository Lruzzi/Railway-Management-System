const railway = require('../models/railway.inputModel');

async function inputTarif(req,res){
    try{
        const result = await railway.inputTarif(req);
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

async function inputAdmin(req,res){
    try{
        const result = await railway.inputAdmin(req);
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

async function inputKereta(req,res){
    try{
        const result = await railway.inputKereta(req);
        console.log(result)
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

async function inputStasiun(req,res){
    try{
        const result = await railway.inputStasiun(req);
        console.log(result)
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

async function inputRute(req,res){
    try{
        const result = await railway.inputRute(req);
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

module.exports = {
    inputTarif,
    inputAdmin,
    inputKereta,
    inputStasiun,
    inputRute
}