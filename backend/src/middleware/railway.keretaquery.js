async function query(id_kereta, nama_kereta, kapasitas_kereta, tahun_buat, tahun_aktif) {
    if(nama_kereta && kapasitas_kereta && tahun_buat && tahun_aktif){
        return(`update kereta set nama_kereta = '${nama_kereta}', kapasitas_kereta = ${kapasitas_kereta}, tahun_buat = ${tahun_buat}, tahun_aktif = ${tahun_aktif} where id_kereta = ${id_kereta};`);
    }
    else if(nama_kereta && kapasitas_kereta && tahun_buat){
        return(`update kereta set nama_kereta = '${nama_kereta}', kapasitas_kereta = ${kapasitas_kereta}, tahun_buat = ${tahun_buat} where id_kereta = ${id_kereta};`);
    }
    else if(nama_kereta && kapasitas_kereta && tahun_aktif){
        return(`update kereta set nama_kereta = '${nama_kereta}', kapasitas_kereta = ${kapasitas_kereta}, tahun_aktif = ${tahun_aktif} where id_kereta = ${id_kereta};`);
    }
    else if(nama_kereta && tahun_buat && tahun_aktif){
        return(`update kereta set nama_kereta = '${nama_kereta}', tahun_buat = ${tahun_buat}, tahun_aktif = ${tahun_aktif} where id_kereta = ${id_kereta};`);
    }
    else if(kapasitas_kereta && tahun_buat && tahun_aktif){
        return(`update kereta set kapasitas_kereta = ${kapasitas_kereta}, tahun_buat = ${tahun_buat}, tahun_aktif = ${tahun_aktif} where id_kereta = ${id_kereta};`);
    }
    else if(nama_kereta && kapasitas_kereta){
        return(`update kereta set nama_kereta = '${nama_kereta}', kapasitas_kereta = ${kapasitas_kereta} where id_kereta = ${id_kereta};`);
    }
    else if(nama_kereta && tahun_buat){
        return(`update kereta set nama_kereta = '${nama_kereta}', tahun_buat = ${tahun_buat} where id_kereta = ${id_kereta};`);
    }
    else if(nama_kereta && tahun_aktif){
        return(`update kereta set nama_kereta = '${nama_kereta}', tahun_aktif = ${tahun_aktif} where id_kereta = ${id_kereta};`);
    }
    else if(kapasitas_kereta && tahun_buat){
        return(`update kereta set kapasitas_kereta = ${kapasitas_kereta}, tahun_buat = ${tahun_buat} where id_kereta = ${id_kereta};`);
    }
    else if(kapasitas_kereta && tahun_aktif){
        return(`update kereta set kapasitas_kereta = ${kapasitas_kereta}, tahun_aktif = ${tahun_aktif} where id_kereta = ${id_kereta};`);
    }
    else if(tahun_buat && tahun_aktif){
        return(`update kereta set tahun_buat = ${tahun_buat}, tahun_aktif = ${tahun_aktif} where id_kereta = ${id_kereta};`);
    }
    else if(nama_kereta){
        return(`update kereta set nama_kereta = '${nama_kereta}' where id_kereta = ${id_kereta};`);
    }
    else if(kapasitas_kereta){
        return(`update kereta set kapasitas_kereta = ${kapasitas_kereta} where id_kereta = ${id_kereta};`);
    }
    else if(tahun_buat){
        return(`update kereta set tahun_buat = ${tahun_buat} where id_kereta = ${id_kereta};`);
    }
    else if(tahun_aktif){
        return(`update kereta set tahun_aktif = ${tahun_aktif} where id_kereta = ${id_kereta};`);
    }
    else{
        return('empty');
    }
}

module.exports = {
    query
}