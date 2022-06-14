const express = require('express');
const router = express.Router();
const tableController = require('../controllers/railway.tableController');
const logController = require('../controllers/railway.logController');
const inputController = require('../controllers/railway.inputController');
const updateController = require('../controllers/railway.updateController');
const deleteController = require('../controllers/railway.deleteController');
const cekController = require('../controllers/railway.cekController');
const path = require('path');
var temp

//Halaman untuk umum (home page) menampilkan informasi rute join table kereta, stasiun, dan tarif
router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/src/home.html'));
  });
  
  //Halaman untuk umum menampilkan table kereta
router.get("/kereta", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/kereta.html'));
});
  
  //Halaman untuk umun menampilkan table stasiun
  router.get("/stasiun", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/src/stasiun.html'));
  });
  
  //Halaman untuk Login
  router.get("/loginpage", (req, res) => {
    temp = req.session;
    if (temp.username) {
      //jika admin terdaftar maka akan masuk ke halaman admin
      return res.redirect("/railway/editrute");
    } else {
      //jika admin belum login maka akan masuk ke halaman login
      res.sendFile(path.join(__dirname, '../frontend/src/loginpage.html'));
    }
  });
  
  //Halam utama admin, untuk operasi CRUD table RUTE
  router.get("/editrute", (req, res) => {
    temp = req.session;
    if (temp.username) {
      //jika user terdaftar maka akan masuk ke halaman admin
      res.sendFile(path.join(__dirname, '../frontend/src/editrute.html'));
      //mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname, '../frontend/src/loginpage.html'));
    }
  });
  
  //front-end untuk admin operasi CRUD TABLE STASIUN
  router.get("/editstasiun", function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      res.sendFile(path.join(__dirname, '../frontend/src/editstasiun.html'));
      //mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname, '../frontend/src/loginpage.html'));
    }
  });
  
  //Front-End untuk Admin operasi CRUD table Kereta
  router.get("/editkereta", function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      res.sendFile(path.join(__dirname, '../frontend/src/editkereta.html'));
      //Mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname, '../frontend/src/loginpage.html'));
    }
  });
  
  //Front-end halaman admin untuk operasi CRUD table tarif
  router.get("/tarif", function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      res.sendFile(path.join(__dirname, '../frontend/src/edittarif.html'));
      //Mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname, '../frontend/src/loginpage.html'));
    }
  });
  
  //Front-End untuk halaman edit data admin (Operasi CRUD)
  router.get("/editadmin", async function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      cek = await cekController.cekSuper(temp.username);
      if(cek === 'super'){
        res.sendFile(path.join(__dirname, '../frontend/src/admin.html'));
      }
      else{
        res.sendFile(path.join(__dirname, '../frontend/src/notadmin.html'));
      }
      //Mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname, '../frontend/src/loginpage.html'));
    }
  });

  router.post("/getData", tableController.getData);

  router.post("/getKereta", tableController.getKereta);

  router.post("/getStasiun", tableController.getStasiun);

  router.post("/login", logController.login);

  router.post("/getRute", tableController.getRute);

  router.post("/getTarif", tableController.getTarif);

  router.post("/getAdmin", tableController.getAdmin);

  router.post("/getuser", logController.getUser);

  router.post("/inputtarif", inputController.inputTarif);

  router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect("/railway/home");
    });
  });


module.exports = router;