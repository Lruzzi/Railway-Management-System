const express = require('express');
const router = express.Router();
const railwayController = require('../controllers/railway.controller');
const path = require('path');
const home = path.join(__dirname, '../frontend/src/home.html');

//Halaman untuk umum (home page) menampilkan informasi rute join table kereta, stasiun, dan tarif
router.get("/home", (req, res) => {
    res.sendFile(home);
  });
  
  //Halaman untuk umum menampilkan table kereta
router.get("/kereta", (req, res) => {
    res.sendFile(path.join(__dirname + ".../frontend/kereta.html"));
});
  
  //Halaman untuk umun menampilkan table stasiun
  router.get("/stasiun", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/stasiun.html"));
  });
  
  //Halaman untuk Login
  router.get("/loginpage", (req, res) => {
    temp = req.session;
    if (temp.username) {
      //jika admin terdaftar maka akan masuk ke halaman admin
      return res.redirect("/admin");
    } else {
      //jika admin belum login maka akan masuk ke halaman login
      res.sendFile(path.join(__dirname + "/frontend/loginpage.html"));
    }
  });
  
  //Halam utama admin, untuk operasi CRUD table RUTE
  router.get("/admin", (req, res) => {
    temp = req.session;
    if (temp.username) {
      //jika user terdaftar maka akan masuk ke halaman admin
      res.sendFile(path.join(__dirname + "/frontend/src/admin.html"));
      //mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname + "/frontend/loginpage.html"));
    }
  });
  
  //front-end untuk admin operasi CRUD TABLE STASIUN
  router.get("/editstasiun", function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      res.sendFile(path.join(__dirname + "/frontend/editstasiun.html"));
      //mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname + "/frontend/loginpage.html"));
    }
  });
  
  //Front-End untuk Admin operasi CRUD table Kereta
  router.get("/editkereta", function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      res.sendFile(path.join(__dirname + "/frontend/editkereta.html"));
      //Mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname + "/frontend/loginpage.html"));
    }
  });
  
  //Front-end halaman admin untuk operasi CRUD table tarif
  router.get("/tarif", function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      res.sendFile(path.join(__dirname + "/frontend/edittarif.html"));
      //Mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname + "/frontend/loginpage.html"));
    }
  });
  
  //Front-End untuk halaman edit data admin (Operasi CRUD)
  router.get("/editadmin", function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      db.query(
        `select super_admin from admin where username = '${temp.username}'`,
        function (err, result) {
          if (result.rows[0].super_admin == true) {
            res.sendFile(path.join(__dirname + "/frontend/admin.html"));
            //Jika Bukan Super Admin, tidak dapat mengakses /editadmin
          } else {
            res.sendFile(path.join(__dirname + "/frontend/notadmin.html"));
          }
        }
      );
  
      //Mengarahkan ke halaman login jika belum login atau session habis
    } else {
      res.sendFile(path.join(__dirname + "/frontend/loginpage.html"));
    }
  });

module.exports = router;