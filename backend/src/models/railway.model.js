const db = require('../configs/db.config');
const helper = require('../utils/helper.util');

async function login(req) {
    var temp = req.session
    temp.username = req.body.username;
    temp.password = req.body.pass;
    console.log(temp.username, temp.password);
    if (temp.username.length > 0 && temp.password.length > 0) {
        const query = `select password from admin where username like '${temp.username}'`; //query ambil data user untuk login
    
        //mengecek informasi yang dimasukkan user apakah terdaftar pada database
        const result = await db.query(query);
        if (result.rowCount === 0) {
            return('notfound');
          } else {
            if (await helper.comparePassword(temp.password, result.rows[0].password)){
                return ('done');
            }
            else{
                return ('fail');
            }
            }
      } else {
        return ('empty');
      }
}

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

async function cekSuper(username) {
    const query = `Select super_admin from admin where username like '${username}'`;
    const result = await db.query(query);
    if(result.rowCount === 0){
        return {
            status: false,
            message: 'Data not found'
        }
    }else{
        return('super');
    }
}

module.exports = {
    login,
    getData,
    getKereta,
    getStasiun,
    getRute,
    getTarif,
    cekSuper
}