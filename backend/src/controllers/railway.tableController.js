const railway = require('../models/railway.tableModel');

async function getData(req,res){
    try{
        const result = await railway.getData();
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
        for (row of result.rows) {
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
    catch(err){
        res.json(err);
    }
}

async function getKereta(req,res){
    try{
        const result = await railway.getKereta();
        res.write(`<table>
                        <tr>
                            <th scope="col">Nomor Kereta</th>
                            <th scope="col">Nama Kereta</th>
                            <th scope="col">Kapasitas Penumpang</th>
                            <th scope="col">Tanggal Pembuatan</th>
                            <th scope="col">Tanggal Beroperasi</th>
                        </tr>`);
                        for (row of result.rows) {
                        var date = new Date(row["tahun_buat"]).toDateString();
                        var dateOnly = new Date(row["tahun_aktif"]).toLocaleDateString();
                        row["tahun_buat"] = date;
                        row["tahun_aktif"] = dateOnly;
        res.write(`<tr>
                        <td>${row["id_kereta"]}</td>
                        <td>${row["nama_kereta"]}</td>
                        <td>${row["kapasitas_kereta"]}</td>
                        <td>${row["tahun_buat"]}</td>
                        <td>${row["tahun_aktif"]}</td>
                    </tr>`);
        }
        res.end(`</tbody>
        </table>`);
    }
    catch(err){
        res.json(err);
    }
}

async function getStasiun(req,res){
    try{
        const result = await railway.getStasiun();
        res.write(`<table>
        <tr>
            <th scope="col">Nomor Stasiun</th>
            <th scope="col">Nama Stasiun</th>
            <th scope="col">Daerah Stasiun</th>
            <th scope="col">Tanggal Dibangun</th>
        </tr>`);
        for (row of result.rows) {
          var dateOnly = new Date(row["tahun_bangun"]).toLocaleDateString();
          row["tahun_bangun"] = dateOnly;
          res.write(`<tr>
                        <td>${row["id_stasiun"]}</td>
                        <td>${row["nama_stasiun"]}</td>
                        <td>${row["daerah_stasiun"]}</td>
                        <td>${row["tahun_bangun"]}</td>
                    </tr>`);
        }
        res.end(`</tbody>
        </table>`);
    }
    catch(err){
        res.json(err);
    }
}

async function getRute(req,res){
    try{
        const result = await railway.getRute();
        res.write(`<table>
                    <tr>
                    <th scope="col">ID RUTE</th>
                    <th scope="col">ID KERETA</th>
                    <th scope="col">ID STASIUN KEBERANGKATAN</th>
                    <th scope="col">WAKTU KEBERANGKATAN</th>
                    <th scope="col">ID STASIUN TUJUAN</th>
                    <th scope="col">WAKTU TIBA</th>
                    <th scope="col">JARAK</th>
                    </tr>`);
        for (row of result.rows) {
            res.write(`<tr>
                        <td>${row["id_rute"]}</td>
                        <td>${row["id_kereta"]}</td>
                        <td>${row["id_stasiun_berangkat"]}</td>
                        <td>${row["waktu_berangkat"]}</td>
                        <td>${row["id_stasiun_tiba"]}</td>
                        <td>${row["waktu_tiba"]}</td>
                        <td>${row["jarak"]}</td>
                        </tr>`
                    );
        }
    res.end(`</tbody>
            </table>`);
    }
    catch(err){
        res.json(err);
    }
}

async function getTarif(req,res){
    try{
        const result = await railway.getTarif();
        res.write(`<table>
                    <tr>
                    <th scope="col">ID TARIF</th>
                    <th scope="col">ID RUTE</th>
                    <th scope="col">HARGA</th>
                    </tr>`);
        for (row of result.rows) {
            res.write(`<tr>
                        <td>${row["id_tarif"]}</td>
                        <td>${row["id_rute"]}</td>
                        <td>${row["harga"]}</td>
                        </tr>`);
        }
        res.end(`</tbody>
                </table>`);
    }
    catch(err){
        res.json(err);
    }
}

async function getAdmin(req,res){
    try{
        const result = await railway.getAdmin();
        console.log(result)
        res.write(`<table>
                    <tr>
                    <th scope="col">ID ADMIN</th>
                    <th scope="col">USERNAME</th>
                    <th scope="col">SUPER ADMIN</th>
                    </tr>`);
        for (row of result.rows) {
        res.write(`<tr>
                    <td>${row["id_admin"]}</td>
                    <td>${row["username"]}</td>
                    <td>${row["super_admin"]}</td>
                    </tr>`);
        }
        res.end(`</tbody>
                </table>`);
    }
    catch(err){
        res.json(err);
    }
}

module.exports = {
    getData,
    getKereta,
    getStasiun,
    getRute,
    getTarif,
    getAdmin,
}