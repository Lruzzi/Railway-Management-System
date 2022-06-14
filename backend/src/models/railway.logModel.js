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

module.exports = {
    login
}