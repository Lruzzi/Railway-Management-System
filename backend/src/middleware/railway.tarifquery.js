async function query(id_tarif, id_rute, harga) {
    if(id_rute && harga){
        return(`update tarif set id_rute = ${id_rute}, harga = ${harga} where id_tarif = ${id_tarif};`);
    }
    else if(id_rute){
        return(`update tarif set id_rute = ${id_rute} where id_tarif = ${id_tarif};`);
    }
    else if(harga){
        return(`update tarif set harga = ${harga} where id_tarif = ${id_tarif};`);
    }
    else{
        return('empty');
    }
}

module.exports = {
    query
}