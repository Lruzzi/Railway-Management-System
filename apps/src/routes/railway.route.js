const express = require('express');
const router = express.Router();
const tableController = require('../controllers/railway.tableController');
const logController = require('../controllers/railway.logController');
const inputController = require('../controllers/railway.inputController');
const updateController = require('../controllers/railway.updateController');
const deleteController = require('../controllers/railway.deleteController');
const cekController = require('../controllers/railway.cekController');
const path = require('path');
const { cekTarif } = require('../models/railway.cekModel');
var temp

//Halaman untuk umum (home page) menampilkan informasi rute join table kereta, stasiun, dan tarif
router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/view/home.html'));
  });
  
  //Halaman untuk umum menampilkan table kereta
router.get("/kereta", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/view/kereta.html'));
});
  
  //Halaman untuk umun menampilkan table stasiun
  router.get("/stasiun", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/view/stasiun.html'));
  });
  
  //Halaman untuk Login
  router.get("/loginpage", (req, res) => {
    temp = req.session;
    if (temp.username) {
      //jika admin terdaftar maka akan masuk ke halaman admin
      return res.redirect("/railway/editrute");
    } else {
      //jika admin belum login maka akan masuk ke halaman login
      res.sendFile(path.join(__dirname, '../frontend/view/loginpage.html'));
    }
  });
  
  //Halam utama admin, untuk operasi CRUD table RUTE
  router.get("/editrute", (req, res) => {
    temp = req.session;
    if (temp.username) {
      //jika user terdaftar maka akan masuk ke halaman admin
      res.sendFile(path.join(__dirname, '../frontend/view/editrute.html'));
      //mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname, '../frontend/view/loginpage.html'));
    }
  });
  
  //front-end untuk admin operasi CRUD TABLE STASIUN
  router.get("/editstasiun", function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      res.sendFile(path.join(__dirname, '../frontend/view/editstasiun.html'));
      //mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname, '../frontend/view/loginpage.html'));
    }
  });
  
  //Front-End untuk Admin operasi CRUD table Kereta
  router.get("/editkereta", function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      res.sendFile(path.join(__dirname, '../frontend/view/editkereta.html'));
      //Mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname, '../frontend/view/loginpage.html'));
    }
  });
  
  //Front-end halaman admin untuk operasi CRUD table tarif
  router.get("/tarif", function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      res.sendFile(path.join(__dirname, '../frontend/view/edittarif.html'));
      //Mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname, '../frontend/view/loginpage.html'));
    }
  });
  
  //Front-End untuk halaman edit data admin (Operasi CRUD)
  router.get("/editadmin", async function (req, res, next) {
    temp = req.session;
    if (temp.username) {
      cek = await cekController.cekSuper(temp.username);
      if(cek === 'super'){
        res.sendFile(path.join(__dirname, '../frontend/view/admin.html'));
      }
      else{
        res.sendFile(path.join(__dirname, '../frontend/view/notadmin.html'));
      }
      //Mengarahkan ke halaman login
    } else {
      res.sendFile(path.join(__dirname, '../frontend/view/loginpage.html'));
    }
  });

  //get data
  router.post("/getData", tableController.getData);
  router.post("/getKereta", tableController.getKereta);
  router.post("/getStasiun", tableController.getStasiun);
  router.post("/getRute", tableController.getRute);
  router.post("/getTarif", tableController.getTarif);
  router.post("/getAdmin", tableController.getAdmin);
  router.post("/getuser", logController.getUser);

  //input
  router.post("/inputtarif", inputController.inputTarif);
  router.post("/inputadmin", inputController.inputAdmin);
  router.post("/inputkereta", inputController.inputKereta);

  //update
  router.post("/updatetarif", updateController.updateTarif);
  router.post("/updateadmin", updateController.updateAdmin);
  router.post("/updatekereta", updateController.updateKereta);

  //delete
  router.post("/deletetarif", deleteController.deleteTarif);
  router.post("/deleteadmin", deleteController.deleteAdmin);
  router.post("/deletekereta", deleteController.deleteKereta);


  //cek
  router.post("/cektarif", cekController.cekTarif);
  router.post("/cekidrute", cekController.cekIdRute);
  router.post("/cekadmin", cekController.cekAdmin);
  router.post("/cekusername", cekController.cekUsername);
  router.post("/cekkereta", cekController.cekKereta);

  //Log
  router.post("/login", logController.login);

  router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect("/railway/home");
    });
  });


module.exports = router;