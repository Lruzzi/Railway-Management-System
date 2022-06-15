async function query(id_rute, id_kereta, id_stasiun_ber, waktu_ber, id_stasiun_tib, waktu_tib, jarak) {
    if (id_kereta && id_stasiun_ber && waktu_ber && id_stasiun_tib && waktu_tib && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_ber && waktu_ber && id_stasiun_tib && waktu_tib) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_ber && waktu_ber && id_stasiun_tib && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_ber && waktu_ber && waktu_tib && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_ber && id_stasiun_tib && waktu_tib && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && waktu_ber && id_stasiun_tib && waktu_tib && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && waktu_ber && id_stasiun_tib && waktu_tib && jarak) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_kereta && id_stasiun_ber && waktu_ber && id_stasiun_tib) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_kereta && id_stasiun_ber && waktu_ber && waktu_tib) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_kereta && id_stasiun_ber && waktu_ber && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_kereta && id_stasiun_ber && id_stasiun_tib && waktu_tib){
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_kereta && id_stasiun_ber && id_stasiun_tib && jarak){
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_kereta && id_stasiun_ber && waktu_tib && jarak){
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_kereta && waktu_ber && id_stasiun_tib && waktu_tib){
        const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_kereta && waktu_ber && id_stasiun_tib && jarak){
        const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_kereta && waktu_ber && waktu_tib && jarak){
        const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_kereta && id_stasiun_tib && waktu_tib && jarak){
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_stasiun_ber && waktu_ber && id_stasiun_tib && waktu_tib){
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_stasiun_ber && waktu_ber && id_stasiun_tib && jarak){
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_stasiun_ber && waktu_ber && waktu_tib && jarak){
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(id_stasiun_ber && id_stasiun_tib && waktu_tib && jarak){
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(waktu_ber && id_stasiun_tib && waktu_tib && jarak){
        const query = `update rute set waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
    
      else if (id_kereta && id_stasiun_ber && waktu_ber) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_ber && id_stasiun_tib) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_ber && waktu_tib) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_ber && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && waktu_ber && id_stasiun_tib) {
        const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && waktu_ber && waktu_tib) {
        const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && waktu_ber && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_tib && waktu_tib) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_tib && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && waktu_tib && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && waktu_ber && id_stasiun_tib) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && waktu_ber && waktu_tib) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && waktu_ber && jarak) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && id_stasiun_tib && waktu_tib) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && id_stasiun_tib && jarak) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && waktu_tib && jarak) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (waktu_ber && id_stasiun_tib && waktu_tib) {
        const query = `update rute set waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if(waktu_ber && id_stasiun_tib && jarak) {
        const query = `update rute set waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (waktu_ber && waktu_tib && jarak) {
        const query = `update rute set waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_tib && waktu_tib && jarak) {
        const query = `update rute set id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_ber) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && waktu_ber) {
        const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && id_stasiun_tib) {
        const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && waktu_tib) {
        const query = `update rute set id_kereta = '${id_kereta}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta && jarak) {
        const query = `update rute set id_kereta = '${id_kereta}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && waktu_ber) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && id_stasiun_tib) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && waktu_tib) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber && jarak) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (waktu_ber && id_stasiun_tib) {
        const query = `update rute set waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (waktu_ber && waktu_tib) {
        const query = `update rute set waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (waktu_ber && jarak) {
        const query = `update rute set waktu_berangkat = '${waktu_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_tib && waktu_tib) {
        const query = `update rute set id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_tib && jarak) {
        const query = `update rute set id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (waktu_tib && jarak) {
        const query = `update rute set waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_kereta) {
        const query = `update rute set id_kereta = '${id_kereta}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_ber) {
        const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (waktu_ber) {
        const query = `update rute set waktu_berangkat = '${waktu_ber}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (id_stasiun_tib) {
        const query = `update rute set id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (waktu_tib) {
        const query = `update rute set waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
        return query;
      }
      else if (jarak) {
        const query = `update rute set jarak = '${jarak}' where id_rute = ${id_rute};`;
        return query;
      }
      else {
        res.send("empty");
      }
}

module.exports = {
    query
}