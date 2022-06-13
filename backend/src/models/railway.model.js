const db = require('../configs/db.config');
const helper = require('../utils/helper.util');

async function login(railway) {
    const {username, password} = railway;
    console.log(railway);
    const query = `SELECT password FROM admin WHERE username = '${username}'`;
    const result = await db.query(query);
    if(result.rowCount === 0){
        return {
            status: false,
            message: 'Username not found'
        }
    }else{
        if (await helper.comparePassword(password, result.rows[0].password)){
            return {message: 'login success'};
        }
        else{
            return {message: 'wrong password'};
        }
    }
}

    async function home(railway) {
        const query = `Select * from daftar_rute`;
        const result = await db.query(query);
        if(result.rowCount === 0){
            return {
                status: false,
                message: 'Data not found'
            }
        }
        else{
              res.write(`<table>
                <tr>
                    <th scope="col">Nomor Rute</th>
                    <th scope="col">Nama Kereta</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Stasiun Keberangkatan</th>
                    <th scope="col">Waktu Keberangkatan</th>
                    <th scope="col">Stasiun Tujuan</th>
                    <th scope="col">Waktu Tiba</th>
                </tr>`);
              for (row of results.rows) {
                res.write(`<tr>
                                <td>${row["no_rute"]}</td>
                                <td>${row["nama_kereta"]}</td>
                                <td>${row["harga"]}</td>
                                <td>${row["stasiun_keberangkatan"]}</td>
                                <td>${row["waktu_berangkat"]}</td>
                                <td>${row["stasiun_tiba"]}</td>
                                <td>${row["waktu_tiba"]}</td>
                            </tr>`);
              }
              res.end(`</tbody>
                </table>`);
            }
        }
    


module.exports = {
    login,
    home
}