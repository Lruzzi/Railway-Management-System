const db = require('../configs/db.config');
const helper = require('../utils/helper.util');

async function getData() {
    const query = `Select * from daftar_rute`;
    const result = await db.query(query);
    if(result.rowCount === 0){
        return {
            status: false,
            message: 'Data not found'
        }
    }
    return result;
}

async function getKereta() {
    const query = `Select * from kereta`;
    const result = await db.query(query);
    if(result.rowCount === 0){
        return {
            status: false,
            message: 'Data not found'
        }
    }
    return result;
}

async function getStasiun(req, res) {
    const query = `Select * from stasiun`;
    const result = await db.query(query);
    if(result.rowCount === 0){
        return {
            status: false,
            message: 'Data not found'
        }
    }
    return result;
}

async function getRute(req, res) {
    const query = `Select * from rute`;
    const result = await db.query(query);
    if(result.rowCount === 0){
        return {
            status: false,
            message: 'Data not found'
        }
    }
    return result;
}

async function getTarif(req, res) {
    const query = `Select * from tarif`;
    const result = await db.query(query);
    if(result.rowCount === 0){
        return {
            status: false,
            message: 'Data not found'
        }
    }
    return result;
}

async function getAdmin(req, res) {
    const query = "select id_admin,username,super_admin from admin;";
    const result = await db.query(query);
    if(result.rowCount === 0){
        return {
            status: false,
            message: 'Data not found'
        }
    }
    return result;
}

module.exports = {
    getData,
    getKereta,
    getStasiun,
    getRute,
    getTarif,
    getAdmin
}