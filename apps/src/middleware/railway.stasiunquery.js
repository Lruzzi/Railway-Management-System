async function query(id_stasiun, nama_stasiun, daerah_stasiun, tahun_bangun) {

    if(nama_stasiun && daerah_stasiun && tahun_bangun){
        return(`update stasiun set nama_stasiun = '${nama_stasiun}', daerah_stasiun = '${daerah_stasiun}', tahun_bangun = '${tahun_bangun}' where id_stasiun = ${id_stasiun};`);
    }
    else if(nama_stasiun && daerah_stasiun){
        return(`update stasiun set nama_stasiun = '${nama_stasiun}', daerah_stasiun = '${daerah_stasiun}' where id_stasiun = ${id_stasiun};`);
    }
    else if(nama_stasiun && tahun_bangun){
        return(`update stasiun set nama_stasiun = '${nama_stasiun}', tahun_bangun = '${tahun_bangun}' where id_stasiun = ${id_stasiun};`);
    }
    else if(daerah_stasiun && tahun_bangun){
        return(`update stasiun set daerah_stasiun = '${daerah_stasiun}', tahun_bangun = '${tahun_bangun}' where id_stasiun = ${id_stasiun};`);
    }
    else if(nama_stasiun){
        return(`update stasiun set nama_stasiun = '${nama_stasiun}' where id_stasiun = ${id_stasiun};`);
    }
    else if(daerah_stasiun){
        return(`update stasiun set daerah_stasiun = '${daerah_stasiun}' where id_stasiun = ${id_stasiun};`);
    }
    else if(tahun_bangun){
        return(`update stasiun set tahun_bangun = '${tahun_bangun}' where id_stasiun = ${id_stasiun};`);
    }
    else{
        return('empty');
    }
}

module.exports = {
    query
}