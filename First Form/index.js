//import packages
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const alert = require("alert");

//initialize the app as an express app
const app = express();
const router = express.Router();
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const { table } = require("console");
app.use("/images", express.static("images"));

//Insiasi koneksi ke database (AZURE DATABASE)
const db = new Client({
  user: "railway_database",
  host: "railway-database.postgres.database.azure.com",
  database: "railway_database",
  password: "SBD 8 w FS",
  prot: 5432,
  sslmode: "require",
  ssl: true,
});

//Melakukan koneksi dan menunjukkan indikasi database terhubung
db.connect((err) => {
  if (err) {
    console.log(err + "Database not connected");
    return;
  }
  console.log("Database berhasil terkoneksi");
});

//jalankan koneksi ke database

//middleware (session)
app.use(
  session({
    secret: "ini contoh secret",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var temp;

//Halaman untuk umum (home page) menampilkan informasi rute join table kereta, stasiun, dan tarif
router.get("/", (req, res) => {
  res.write(
    `<html>
        <head>
            <title>IKN Railway Management</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <style>
            .center {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              
              }
              .footer {
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                background-color: black;
                color: white;
                text-align: center;
              }</style>
            </head>
            <body>
                <header>
                <div class="container-fluid p-0" style="background-color:black">
                    <nav class="navbar navbar-expand-lg">
                        <img src="images/favicon-ikn.png" alt="logo ikn" width="50" height="50" >
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                      
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav mr-auto">
                          <li class="nav-item">
                              <a class="nav-link" href="/">HOME</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="/stasiun">STASIUN</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/kereta">KERETA</a>
                              </li>
                          </ul>
                          <form class="form-inline my-2 my-lg-0" action="/loginpage">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">LOGIN</button>
                          </form>
                        </div>
                      </nav>
              </div>
              </div>
                </header>
    
                <main>
                    <div class="container text-center">
                        <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12"></div>
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <h1>DAFTAR RUTE</h1>
                                <table class="table table-dark" id="daftar_rute">
                                <thead class="thead-light">
                                    <tr>
                                      <th scope="col">Nomor Rute</th>
                                      <th scope="col">Nama Kereta</th>
                                      <th scope="col">Harga</th>
                                      <th scope="col">Stasiun Keberangkatan</th>
                                      <th scope="col">Waktu Keberangkatan</th>
                                      <th scope="col">Stasiun Tujuan</th>
                                      <th scope="col">Waktu Tiba</th>
                                    </tr>
                                  </thead>
                                  <tbody>`
  );
  res.end(`</div>
                            <div class="col-md-2"></div>
                </main>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                  crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                  crossorigin="anonymous"></script>
                </body>
                <div class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12 text-left">
                          <h6>Copyright &copy; 2022</h6>
                                <p>UNIVERSITAS INDONESIA</p>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                                </div>
                            <div class="col-md-2 col-lg-2 col-sm-12 text-right">
                            <p> DEPOK </p>
                            <p> <span id="cdate"></span> </p>
                            <p> <span id="ctime"> </span></p>
                        </div>
                  </div>
                </div>          
                </div>
                <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                <script>
                    jQuery(document).ready(function($) {
                        $.post('/getdata', { }, function(data) {
                            $('#daftar_rute').html(data);
                        });
                    });
                    
                </script>
                <script>
                  var dt = new Date().toDateString();
                  document.getElementById("cdate").innerHTML = dt;
                  var time = setInterval(function(){
                    var dt = new Date();
                    document.getElementById("ctime").innerHTML = dt.toLocaleTimeString();
                  }, 1000);
                </script>
    </html>`);
});

//Halaman untuk umum menampilkan table kereta
router.get("/kereta", (req, res) => {
  res.write(
    `<html>
        <head>
            <title>IKN Railway Management</title>
            <style>
            .center {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              
              }
              .footer {
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                background-color: black;
                color: white;
                text-align: center;
              }</style>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            </head>
            <body>
                <header>
                <div class="container-fluid p-0" style="background-color:black">
                    <nav class="navbar navbar-expand-lg">
                        <img src="images/favicon-ikn.png" alt="logo ikn" width="50" height="50" >
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                      
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav mr-auto">
                          <li class="nav-item">
                              <a class="nav-link" href="/">HOME</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="/stasiun">STASIUN</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/kereta">KERETA</a>
                              </li>
                          </ul>
                          <form class="form-inline my-2 my-lg-0" action="/loginpage">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">LOGIN</button>
                          </form>
                        </div>
                      </nav>
              </div>
              </div>
                </header>
    
                <main>
                    <div class="container text-center">
                        <div class="row">
                        <div class="col-md-2"></div>
                            <div class="col-md-8 col-sm-12">
                                <h1>DAFTAR KERETA</h1>
                                <table class="table table-dark" id="kereta">
                                  <thead class="thead-light">
                                    <tr>
                                        <th scope="col">Nomor Rute</th>
                                        <th scope="col">Nama Kereta</th>
                                        <th scope="col">Harga</th>
                                        <th scope="col">Stasiun Keberangkatan</th>
                                        <th scope="col">Waktu Keberangkatan</th>
                                        <th scope="col">Stasiun Tujuan</th>
                                        <th scope="col">Waktu Tiba</th>
                                    </tr>
                                  </thead>
                                  <tbody>`
  );
  res.end(`</div>
                <div class="col-md-2"></div>
                </main>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                  crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                  crossorigin="anonymous"></script>
                </body>
                <div class="footer">
                <div class="container text-left">
                    <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12">
                          <h6>Copyright &copy; 2022</h6>
                                <p>UNIVERSITAS INDONESIA</p>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                                </div>
                            <div class="col-md-2 col-lg-2 col-sm-12 mx-auto">
                            <p> DEPOK </p>
                            <p> <span id="cdate"></span> </p>
                            <p> <span id="ctime"> </span></p>
                        </div>
                  </div>
                </div>          
                </div>
                <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                <script>
                    jQuery(document).ready(function($) {
                        $.post('/getkereta', { }, function(data) {
                            $('#kereta').html(data);
                        });
                    });
                </script>
                <script>
                  var dt = new Date().toDateString();
                  document.getElementById("cdate").innerHTML = dt;
                  var time = setInterval(function(){
                    var dt = new Date();
                    document.getElementById("ctime").innerHTML = dt.toLocaleTimeString();
                  }, 1000);
                </script>
    </html>`);
});

//Halaman untuk umun menampilkan table stasiun
router.get("/stasiun", (req, res) => {
  res.write(
    `<html>
        <head>
            <title>IKN Railway Management</title>
            <style>
            .center {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              
              }
              .footer {
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                background-color: black;
                color: white;
                text-align: center;
              }</style>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            </head>
            <body>
                <header>
                <div class="container-fluid p-0" style="background-color:black">
                    <nav class="navbar navbar-expand-lg">
                        <img src="images/favicon-ikn.png" alt="logo ikn" width="50" height="50" >
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                      
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav mr-auto">
                          <li class="nav-item">
                              <a class="nav-link" href="/">HOME</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="/stasiun">STASIUN</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/kereta">KERETA</a>
                              </li>
                          </ul>
                          <form class="form-inline my-2 my-lg-0" action="/loginpage">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">LOGIN</button>
                          </form>
                        </div>
                      </nav>
              </div>
              </div>
                </header>
    
                <main>
                    <div class="container text-center">
                        <div class="row">
                        <div class="col-md-2"></div>
                            <div class="col-md-8 col-sm-12">
                                <h1>DAFTAR STASIUN</h1>
                                <table class="table table-dark" id="stasiun">
                                  <thead class="thead-light">
                                    <tr>
                                        <th scope="col">Nomor Stasiun</th>
                                        <th scope="col">Nama Stasiun</th>
                                        <th scope="col">Daerah Stasiun</th>
                                        <th scope="col">Tanggal Dibangun</th>
                                    </tr>
                                  </thead>
                                  <tbody>`
  );
  res.end(`</div>
                <div class="col-md-2"></div>
                </main>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                  crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                  crossorigin="anonymous"></script>
                </body>
                <div class="footer">
                <div class="container text-left">
                    <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12">
                          <h6>Copyright &copy; 2022</h6>
                                <p>UNIVERSITAS INDONESIA</p>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                                </div>
                            <div class="col-md-2 col-lg-2 col-sm-12 mx-auto">
                            <p> DEPOK </p>
                            <p> <span id="cdate"></span> </p>
                            <p> <span id="ctime"> </span></p>
                        </div>
                  </div>
                </div>          
                </div>
                <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                <script>
                    jQuery(document).ready(function($) {
                        $.post('/getstasiun', { }, function(data) {
                            $('#stasiun').html(data);
                        });
                    });
                </script>
                <script>
                  var dt = new Date().toDateString();
                  document.getElementById("cdate").innerHTML = dt;
                  var time = setInterval(function(){
                    var dt = new Date();
                    document.getElementById("ctime").innerHTML = dt.toLocaleTimeString();
                  }, 1000);
                </script>
    </html>`);
});

//Halaman untuk Login
router.get("/loginpage", (req, res) => {
  temp = req.session;
  if (temp.username) {
    //jika admin terdaftar maka akan masuk ke halaman admin
    return res.redirect("/admin");
  } else {
    //jika admin belum login maka akan masuk ke halaman login
    res.end(
      `<html>
            <head>
                <title>IKN RAILWAY MANAGEMENT SYSTEM</title>
                <style>
                .center {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  
                  }
                  .footer {
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    background-color: black;
                    color: white;
                    text-align: center;
                  }</style>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            </head>
            <body>
            <header>
                <div class="container-fluid p-0" style="background-color:black">
                    <nav class="navbar navbar-expand-lg">
                        <img src="images/favicon-ikn.png" alt="logo ikn" width="50" height="50" >
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                      
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav mr-auto">
                          <li class="nav-item">
                              <a class="nav-link" href="/">HOME</a>
                            </li>
                          </ul>
                          <form class="form-inline my-2 my-lg-0" action="/">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">BACK</button>
                          </form>
                        </div>
                      </nav>
              </div>
              </div>
                </header>
            <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <h2 class="text-center text-dark mt-5">LOGIN ADMIN</h2>
                    <div class="text-center mb-5 text-dark">IKN RAILWAY MANAGEMENT SYSTEM</div>
                    <div class="card my-5">    
                      <form class="card-body cardbody-color p-lg-5">        
                        <div class="mb-3">
                            <input type="text" class="form-control" id="username" placeholder="Username"/><br />
                        </div>
                        <div class="mb-3">
                            <input type="password" class="form-control" id="password"  placeholder="password"/><br />
                        </div>
                        <div class="text-center">
                            <input type="button" value="LOGIN" class="btn btn-success" id="submits" />
                        </div>
                       </form>
                    </div>
                </div>
            </div>
            </div>
            </body>
            <div class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12 text-left">
                          <h6>Copyright &copy; 2022</h6>
                                <p>UNIVERSITAS INDONESIA</p>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                                </div>
                            <div class="col-md-2 col-lg-2 col-sm-12 text-right">
                            <p> DEPOK </p>
                            <p> <span id="cdate"></span> </p>
                            <p> <span id="ctime"> </span></p>
                        </div>
                  </div>
                </div>          
                </div>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
            <script>
                jQuery(document).ready(function($) {
                    var username, pass;
                    $('#submits').click(function() {
                        username = $('#username').val();
                        pass = $('#password').val();
                        
                        $.post('/login', { username: username, pass: pass }, function(data) {
                            if (data === 'done') {
                                window.location.href = '/admin';
                                window.alert('Login Sukses');
                            }
                            else if (data === 'fail'){
                                window.alert('Password Salah');
                            }
                            else if (data === 'notfound') {
                                window.alert('Username tidak ditemukan');
                            }
                            else if (data === 'empty') {
                                window.alert('Username dan Password tidak boleh kosong');
                            }
                            else {
                                window.alert('Login Gagal Terjadi kesalahan');
                            }
                        });
                    });
                });
            </script>
            <script>
                  var dt = new Date().toDateString();
                  document.getElementById("cdate").innerHTML = dt;
                  var time = setInterval(function(){
                    var dt = new Date();
                    document.getElementById("ctime").innerHTML = dt.toLocaleTimeString();
                  }, 1000);
                </script>
        </html>`
    );
  }
});

//Halam utama admin, untuk operasi CRUD table RUTE
router.get("/admin", (req, res) => {
  temp = req.session;
  if (temp.username) {
    //jika user terdaftar maka akan masuk ke halaman admin
    res.end(
      `<html>

      <head>
          <title>IKN Railway Management</title>
          <style>
          .center {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            
            }
            .footer {
              position: fixed;
              left: 0;
              bottom: 0;
              width: 100%;
              background-color: black;
              color: white;
              text-align: center;
            }</style>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      </head>
      
      <body>
          <header>
              <div class="container-fluid p-0" style="background-color:black">
                  <nav class="navbar navbar-expand-lg">
                      <img src="images/favicon-ikn.png" alt="logo ikn" width="50" height="50">
                      <button class="navbar-toggler" type="button" data-toggle="collapse"
                          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                          aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav mr-auto">
                              <li class="nav-item">
                                  <a class="nav-link" href="/admin">RUTE</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="/editstasiun">STASIUN</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="/editkereta">KERETA</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="/tarif">TARIF</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="/editadmin">ADMIN</a>
                              </li>
                          </ul>
                          <div class="mr-auto">
                              <p class="text-primary">Welcome ${temp.username}</p>
                            </div>  
                          <form class="form-inline my-2 my-lg-0" action="/logout">
                              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="logout">LOGOUT</button>
                          </form>
                      </div>
                  </nav>
              </div>
              </div>
          </header>
          <main>
              <div class="container-fluid text-center">
                  <div class="row py-2 my-auto mx-auto">
                      <div class="col-sm-12 col-md-1 col-lg-1"></div>
                      <div class="col-sm-12 col-md-2 col-lg-2">
                          <h3 class="font-weight-bold">INPUT DATA BARU</h3>
                          <table class="table table-striped mx-auto">
                              <tr>
                                  <td>
                                      <div>
                                          <form>
                                              <div class="mb-3 text-center">
                                                  <label for="kereta">ID KERETA</label>
                                                  <input type="text" class="form-control" id="id_kereta"
                                                      placeholder="ID KERETA" />
                                              </div>
                                              <div class="mb-3 text-center">
                                                  <label for="stasiunberangkat">ID STASIUN ASAL</label>
                                                  <input type="text" class="form-control" id="stasiun_ber"
                                                      placeholder="STASIUN AWAL" />
                                              </div>
                                              <div class="mb-3 text-center">
                                                  <label for="waktuberangkat">WAKTU KEBERANGKATAN</label>
                                                  <input type="text" class="form-control" id="waktu_ber"
                                                      placeholder="WAKTU BERANGKAT" />
                                              </div>
                                              <div class="mb-3 text-center">
                                                  <label for="stasiuntiba">ID STASIUN TUJUAN</label>
                                                  <input type="text" class="form-control" id="stasiun_tib"
                                                      placeholder="STASIUN TUJUAN" />
                                              </div>
                                              <div class="mb-3 text-center">
                                                  <label for="waktutiba">WAKTU TIBA</label>
                                                  <input type="text" class="form-control" id="waktu_tib"
                                                      placeholder="WAKTU TIBA" />
                                              </div>
                                              <div class="mb-3 text-center">
                                                  <label for="jarak">JARAK</label>
                                                  <input type="text" class="form-control" id="jarak"
                                                      placeholder="JARAK" />
                                              </div>
                                              <div class="text-center">
                                                  <input type="button" value="SUBMIT" class="btn btn-success"
                                                      id="submits" />
                                              </div>
                                          </form>
                                      </div>
                                  </td>
                              </tr>
                          </table>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6 text-center">
                          <h1 class="mx-auto font-weight-bold">DATA RUTE</h1>
                          <table class="table table-dark mx-auto" id="rute">
                              <thead>
                                  <tr>
                                      <th scope="col">ID RUTE</th>
                                      <th scope="col">ID KERETA</th>
                                      <th scope="col">ID STASIUN ASAL</th>
                                      <th scope="col">WAKTU KEBERANGKATAN</th>
                                      <th scope="col">ID STASIUN TUJUAN</th>
                                      <th scope="col">WAKTU TIBA</th>
                                      <th scope="col">JARAK</th>
                                  </tr>
                              </thead>
                          </table>
                      </div>
                      <div class="col-sm-12 col-md-2 col-lg-2">
                          <h3 class="font-weight-bold">UPDATE or DELETE</h3>
                          <table class="table table-striped mx-auto">
                              <tr>
                                  <td>
                                      <div>
                                          <form>
                                              <div class="mb-3 text-center">
                                                  <label for="id_rute">ID RUTE</label>
                                                  <input type="text" class="form-control" id="id_update"
                                                      placeholder="ID RUTE" /><br>
                                                  <div class="collapse" id="collapseinput">
                                                      <form>
                                                          <div class="mb-3 text-center">
                                                              <label for="id_kereta">ID KERETA</label>
                                                              <input type="text" class="form-control" id="ker_update"
                                                                  placeholder="ID Kereta" />
                                                          </div>
                                                          <div class="mb-3 text-center">
                                                              <label for="id_stasiun_ber">ID STASIUN ASAL</label>
                                                              <input type="text" class="form-control" id="sber_update"
                                                                  placeholder="ID Stasiun Asal" />
                                                          </div>
                                                          <div class="mb-3 text-center">
                                                              <label for="waktu_ber">WAKTU BERANGKAT</label>
                                                              <input type="text" class="form-control" id="wber_update"
                                                                  placeholder="Jam dan Menit Berangkat" />
                                                          </div>
                                                          <div class="mb-3 text-center">
                                                              <label for="sta_tuj">ID Stasiun Tujuan</label>
                                                              <input type="text" class="form-control" id="stuj_update"
                                                                  placeholder="Stasiun Tujuan" />
                                                          </div>
                                                          <div class="mb-3 text-center">
                                                              <label for="wak_tib">WAKTU TIBA</label>
                                                              <input type="text" class="form-control" id="wtib_update"
                                                                  placeholder="Waktu Tiba" />
                                                          </div>
                                                          <div class="mb-3 text-center">
                                                              <label for="jar_up">JARAK</label>
                                                              <input type="text" class="form-control" id="jar_update"
                                                                  placeholder="Jarak Rute" />
                                                          </div>
                                                          <div class="text-center">
                                                              <input type="button" value="UPDATE" class="btn btn-success"
                                                                  id="update" />
                                                          </div><br>
                                                      </form>
                                                  </div>
                                              </div>
                                              <div class="text-center">
                                                  <button type="button" onclick="myFunction()" class="btn btn-warning w-50"
                                                      data-toggle="collapse" data-target="#collapseinput"
                                                      aria-expanded="false" aria-controls="collapseinput"
                                                      id="edits">EDIT</button>
                                              </div><br>
                                              <div class="text-center">
                                                  <button type="button" class="btn btn-danger w-50 mx-auto"
                                                      id="deletes">Delete</button>
                                              </div>
                                          </form>
                                      </div>
                                  </td>
                              </tr>
                          </table>
                      </div>
                      <div class="col-sm-12 col-md-1 col-lg-1"></div>
                  </div>
          </main>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
              integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
          </script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
              integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
          </script>
      </body>
      <div class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12 text-left">
                          <h6>Copyright &copy; 2022</h6>
                                <p>UNIVERSITAS INDONESIA</p>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                                </div>
                            <div class="col-md-2 col-lg-2 col-sm-12 text-right">
                            <p> DEPOK </p>
                            <p> <span id="cdate"></span> </p>
                            <p> <span id="ctime"> </span></p>
                        </div>
                  </div>
                </div>          
                </div>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script>
          function myFunction() {
              var x = document.getElementById("deletes");
              if (x.style.display === "none") {
                  x.style.display = "block";
              } else {
                  x.style.display = "none";
              }
          }
      </script>
      <script>
          jQuery(document).ready(function ($) {
              $.post('/getrute', {}, function (data) {
                  $('#rute').html(data);
              });
          });
          $('#submits').click(function () {
              id_kereta = $('#id_kereta').val();
              stasiun_ber = $('#stasiun_ber').val();
              waktu_ber = $('#waktu_ber').val();
              stasiun_tib = $('#stasiun_tib').val();
              waktu_tib = $('#waktu_tib').val();
              jarak = $('#jarak').val();
      
              $.post('/inputrute', {
                  id_kereta: id_kereta,
                  stasiun_ber: stasiun_ber,
                  waktu_ber: waktu_ber,
                  stasiun_tib: stasiun_tib,
                  waktu_tib: waktu_tib,
                  jarak: jarak
              }, function (data) {
                  if (data === 'done') {
                      window.location.href = '/admin';
                      window.alert('Input Data Rute Sukses');
                  } else if(data === 'empty'){
                      window.alert('Data Tidak Boleh Kosong');
                  } else {
                      window.alert('Input Data Rute Gagal');
                  }
              });
          });
      
          $('#update').click(function () {
              id_rute = $('#id_update').val();
              $.post('/cekrute', {
                  id_rute: id_rute
              }, function (data) {
                  if (data === 'found') {
                      ker = $('#ker_update').val();
                      sber = $('#sber_update').val();
                      wber = $('#wber_update').val();
                      stuj = $('#stuj_update').val();
                      wtib = $('#wtib_update').val();
                      jar = $('#jar_update').val();
                      $.post('/updaterute', {
                          id_rute: id_rute,
                          ker: ker,
                          sber: sber,
                          wber:  wber,
                          stuj: stuj,
                          wtib: wtib,
                          jar: jar
                      }, function (data) {
                          if (data === 'updated') {
                              window.location.href = '/admin';
                              window.alert('Update Data Rute Sukses');
                          } else if (data === 'empty') {
                              window.alert('Input Tidak Boleh Kosong');
                          } else {
                              window.alert('Update Data Rute Gagal');
                          }
                      });
                  } else if (data === 'empty') {
                      window.alert('Input Tidak Boleh Kosong');
                  } else if (data === 'notfound') {
                      window.alert('ID Rute Tidak Ditemukan');
                  } else {
                      window.alert('ERROR');
                  }
              })
          });
      
          $('#deletes').click(function () {
              id_rute = $('#id_update').val();
              $.post('/cekrute', {
                  id_rute: id_rute
              }, function (data) {
                  if (data === 'found') {
                      if (window.confirm('Apakah Anda Yakin Ingin Menghapus Data Rute Ini?')) {
                          $.post('/deleterute', {
                              id_rute: id_rute
                          }, function (datas) {
                              if (datas === 'deleted') {
                                  window.location.href = '/admin';
                                  window.alert('Data Rute Berhasil Dihapus');
                              } else {
                                  window.alert('Data Rute Gagal Dihapus');
                              }
                          });
                      }
                  } else if (data === 'empty') {
                      window.alert('Input tidak boleh kosong');
                  } else {
                      window.alert('ERROR');
                  }
              })
          });
      </script>
      <script>
                  var dt = new Date().toDateString();
                  document.getElementById("cdate").innerHTML = dt;
                  var time = setInterval(function(){
                    var dt = new Date();
                    document.getElementById("ctime").innerHTML = dt.toLocaleTimeString();
                  }, 1000);
                </script>
      </html>`
    );
    //mengarahkan ke halaman login
  } else {
    res.redirect("/loginpage");
  }
});

//front-end untuk admin operasi CRUD TABLE STASIUN
router.get("/editstasiun", function (req, res, next) {
  temp = req.session;
  if (temp.username) {
    res.end(`
    <html>

    <head>
        <title>IKN Railway Management</title>
        <style>
        .center {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          
          }
          .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: black;
            color: white;
            text-align: center;
          }</style>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    
    <body>
        <header>
            <div class="container-fluid p-0" style="background-color:black">
                <nav class="navbar navbar-expand-lg">
                    <img src="images/favicon-ikn.png" alt="logo ikn" width="50" height="50">
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/admin">RUTE</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/editstasiun">STASIUN</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/editkereta">KERETA</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/tarif">TARIF</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/editadmin">ADMIN</a>
                            </li>
                        </ul>
                        <div class="mr-auto">
                              <p class="text-primary">Welcome ${temp.username}</p>
                            </div>
                        <form class="form-inline my-2 my-lg-0" action="/logout">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="logout">LOGOUT</button>
                        </form>
                    </div>
                </nav>
            </div>
            </div>
        </header>
        <main>
            <div class="container-fluid text-center">
                <div class="row py-2 my-auto mx-auto">
                    <div class="col-sm-12 col-md-1 col-lg-1"></div>
                    <div class="col-sm-12 col-md-2 col-lg-2">
                        <h3 class="font-weight-bold">INPUT DATA BARU</h3>
                        <table class="table table-striped mx-auto">
                            <tr>
                                <td>
                                    <div>
                                        <form>
                                            <div class="mb-3">
                                                <label for="kereta">NAMA STASIUN</label>
                                                <input type="text" class="form-control" id="nama_stasiun"
                                                    placeholder="NAMA STASIUN" />
                                            </div>
                                            <div class="mb-3">
                                                <label for="stasiunberangkat">DAERAH STASIUN</label>
                                                <input type="text" class="form-control" id="daerah_stasiun"
                                                    placeholder="DAERAH STASIUN" />
                                            </div>
                                            <div class="mb-3">
                                                <label for="waktuberangkat">TANGGAL DIBANGUN</label>
                                                <input type="text" class="form-control" id="tahun_dibangun"
                                                    placeholder="TANGGAL DIBANGUN" />
                                            </div>
                                            <div class="text-center">
                                                <input type="button" value="SUBMIT" class="btn btn-success" id="submits" />
                                            </div>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 text-center">
                        <h1 class="mx-auto font-weight-bold">DATA STASIUN</h1>
                        <table class="table table-dark mx-auto" id="stasiun">
                            <thead>
                                <tr>
                                    <th scope="col">Nomor Stasiun</th>
                                    <th scope="col">Nama Stasiun</th>
                                    <th scope="col">Daerah Stasiun</th>
                                    <th scope="col">Tanggal Dibangun</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="col-sm-12 col-md-2 col-lg-2">
                        <h3 class="font-weight-bold">UPDATE or DELETE</h3>
                        <table class="table table-striped mx-auto">
                            <tr>
                                <td>
                                    <div>
                                        <form>
                                            <div class="mb-3 text-center">
                                                <label for="id_stasiun">ID STASIUN</label>
                                                <input type="text" class="form-control" id="id_update"
                                                    placeholder="ID STASIUN" /><br>
                                                <div class="collapse" id="collapseinput">
                                                    <form>
                                                        <div class="mb-3 text-center">
                                                            <label for="nama_stasiun">NAMA STASIUN</label>
                                                            <input type="text" class="form-control" id="nama_update"
                                                                placeholder="ID RUTE" />
                                                        </div>
                                                        <div class="mb-3 text-center">
                                                            <label for="daerah_stasiun">DAERAH STASIUN</label>
                                                            <input type="text" class="form-control" id="daerah_update"
                                                                placeholder="HARGA" />
                                                        </div>
                                                        <div class="mb-3 text-center">
                                                            <label for="tahun_bangun">TANGGAL DIBANGUN</label>
                                                            <input type="text" class="form-control" id="tahun_update"
                                                                placeholder="TANGGAL DIBANGUN" />
                                                        </div>
                                                        <div class="text-center">
                                                            <input type="button" value="UPDATE" class="btn btn-success"
                                                                id="update" />
                                                        </div><br>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="text-center">
                                                <button type="button" onclick="myFunction()" class="btn btn-warning w-50"
                                                    data-toggle="collapse" data-target="#collapseinput"
                                                    aria-expanded="false" aria-controls="collapseinput"
                                                    id="edits">EDIT</button>
                                            </div><br>
                                            <div class="text-center">
                                                <button type="button" class="btn btn-danger w-50 mx-auto"
                                                    id="deletes">Delete</button>
                                            </div>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-sm-12 col-md-1 col-lg-1"></div>
                </div>
        </main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
        </script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
        </script>
    </body>
    <div class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12 text-left">
                          <h6>Copyright &copy; 2022</h6>
                                <p>UNIVERSITAS INDONESIA</p>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                                </div>
                            <div class="col-md-2 col-lg-2 col-sm-12 text-right">
                            <p> DEPOK </p>
                            <p> <span id="cdate"></span> </p>
                            <p> <span id="ctime"> </span></p>
                        </div>
                  </div>
                </div>          
                </div>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script>
        function myFunction() {
            var x = document.getElementById("deletes");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        }
    </script>
    <script>
        jQuery(document).ready(function ($) {
            $.post('/getstasiun', {}, function (data) {
                $('#stasiun').html(data);
            });
        });
        $('#submits').click(function () {
            nama_stasiun = $('#nama_stasiun').val();
            daerah_stasiun = $('#daerah_stasiun').val();
            tahun_dibangun = $('#tahun_dibangun').val();
    
            $.post('/inputstasiun', {
                nama_stasiun: nama_stasiun,
                daerah_stasiun: daerah_stasiun,
                tahun_dibangun: tahun_dibangun
            }, function (data) {
                if (data === 'done') {
                    window.location.href = '/editstasiun';
                    window.alert('Input Data Stasiun Sukses');
                } else if (data === 'empty') {
                    window.alert('Data Tidak Boleh Kosong');
                } else {
                    window.alert('Input Data Stasiun Gagal');
                }
            });
        });
    
        $('#update').click(function () {
            id_stasiun = $('#id_update').val();
            $.post('/cekstasiun', {
                id_stasiun: id_stasiun
            }, function (data) {
                if (data === 'found') {
                    nama_stasiun = $('#nama_update').val();
                    daerah_stasiun = $('#daerah_update').val();
                    tahun_bangun = $('#tahun_update').val();
                    $.post('/updatestasiun', {
                        id_stasiun: id_stasiun,
                        nama_stasiun: nama_stasiun,
                        daerah_stasiun: daerah_stasiun,
                        tahun_bangun: tahun_bangun
                    }, function (data) {
                        if (data === 'updated') {
                            window.location.href = '/editstasiun';
                            window.alert('Update Data Stasiun Sukses');
                        } else if (data === 'empty') {
                            window.alert('Input Data Tidak Boleh Kosong Semua');
                        } else {
                            window.alert('Update Data Stasiun Gagal');
                        }
                    });
                } else if (data === 'empty') {
                    window.alert('Input Tidak Boleh Kosong');
                } else if (data === 'notfound') {
                    window.alert('ID Stasiun Tidak Ditemukan');
                } else {
                    window.alert('ERROR');
                }
            })
        });
    
        $('#deletes').click(function () {
            id_stasiun = $('#id_update').val();
            $.post('/cekstasiun', {
                id_Stasiun: id_stasiun
            }, function (data) {
                if (data === 'found') {
                    if (window.confirm('Apakah Anda Yakin Ingin Menghapus Data Stasiun Ini?')) {
                        $.post('/deletestasiun', {
                            id_stasiun: id_stasiun
                        }, function (datas) {
                            if (datas === 'deleted') {
                                window.location.href = '/editstasiun';
                                window.alert('Data Stasiun Berhasil Dihapus');
                            } else {
                                window.alert('Data Stasiun Gagal Dihapus');
                            }
                        });
                    }
                } else if (data === 'empty') {
                    window.alert('Input tidak boleh kosong');
                } else {
                    window.alert('ERROR');
                }
            })
        });
    </script>
    <script>
                  var dt = new Date().toDateString();
                  document.getElementById("cdate").innerHTML = dt;
                  var time = setInterval(function(){
                    var dt = new Date();
                    document.getElementById("ctime").innerHTML = dt.toLocaleTimeString();
                  }, 1000);
                </script>
    </html>`);
    //mengarahkan ke halaman login
  } else {
    res.redirect("/loginpage");
  }
});

//Front-End untuk Admin operasi CRUD table Kereta
router.get("/editkereta", function (req, res, next) {
  temp = req.session;
  if (temp.username) {
    res.end(
      `<html>

      <head>
          <title>IKN Railway Management</title>
          <style>
          .center {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            
            }
            .footer {
              position: fixed;
              left: 0;
              bottom: 0;
              width: 100%;
              background-color: black;
              color: white;
              text-align: center;
            }</style>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      </head>
      
      <body>
          <header>
              <div class="container-fluid p-0" style="background-color:black">
                  <nav class="navbar navbar-expand-lg">
                      <img src="images/favicon-ikn.png" alt="logo ikn" width="50" height="50">
                      <button class="navbar-toggler" type="button" data-toggle="collapse"
                          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                          aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav mr-auto">
                              <li class="nav-item">
                                  <a class="nav-link" href="/admin">RUTE</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="/editstasiun">STASIUN</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="/editkereta">KERETA</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="/tarif">TARIF</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="/editadmin">ADMIN</a>
                              </li>
                          </ul>
                          <div class="mr-auto">
                              <p class="text-primary">Welcome ${temp.username}</p>
                            </div>
                          <form class="form-inline my-2 my-lg-0" action="/logout">
                              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="logout">LOGOUT</button>
                          </form>
                      </div>
                  </nav>
              </div>
              </div>
          </header>
          <main>
              <div class="container-fluid text-center">
                  <div class="row py-2 my-auto mx-auto">
                      <div class="col-sm-12 col-md-1 col-lg-1"></div>
                      <div class="col-sm-12 col-md-2 col-lg-2">
                          <h3 class="font-weight-bold">INPUT DATA BARU</h3>
                          <table class="table table-striped mx-auto">
                              <tr>
                                  <td>
                                      <div>
                                          <form>
                                              <div class="mb-3">
                                                  <label for="kereta">NAMA KERETA</label>
                                                  <input type="text" class="form-control" id="nama_kereta"
                                                      placeholder="NAMA KERETA" />
                                              </div>
                                              <div class="mb-3">
                                                  <label for="stasiunberangkat">KAPASITAS PENUMPANG</label>
                                                  <input type="text" class="form-control" id="kapasitas"
                                                      placeholder="KAPASITAS" />
                                              </div>
                                              <div class="mb-3">
                                                  <label for="tahunbuat">TANGGAL PEMBUATAN</label>
                                                  <input type="text" class="form-control" id="tahun_pembuatan"
                                                      placeholder="TANGGAL PEMBUATAN" />
                                              </div>
                                              <div class="mb-3">
                                                <label for="waktuberangkat">TANGGAL AKTIF</label>
                                                <input type="text" class="form-control" id="tahun_aktif"
                                                    placeholder="TANGGAL Beroperasi" />
                                            </div>
                                              <div class="text-center">
                                                  <input type="button" value="SUBMIT" class="btn btn-success"
                                                      id="submits" />
                                              </div>
                                          </form>
                                      </div>
                                  </td>
                              </tr>
                          </table>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6 text-center">
                          <h1 class="mx-auto font-weight-bold">DATA KERETA</h1>
                          <table class="table table-dark mx-auto" id="kereta">
                              <thead>
                                  <tr>
                                      <th scope="col">Nomor Kereta</th>
                                      <th scope="col">Nama Kereta</th>
                                      <th scope="col">Kapasitas Penumpang</th>
                                      <th scope="col">TANGGAL Pembuatan</th>
                                      <th scope="col">Tanggal Beroperasi</th>
                                  </tr>
                              </thead>
                          </table>
                      </div>
                      <div class="col-sm-12 col-md-2 col-lg-2">
                          <h3 class="font-weight-bold">UPDATE or DELETE</h3>
                          <table class="table table-striped mx-auto">
                              <tr>
                                  <td>
                                      <div>
                                          <form>
                                              <div class="mb-3 text-center">
                                                  <label for="id_kereta">ID KERETA</label>
                                                  <input type="text" class="form-control" id="id_update"
                                                      placeholder="ID KERETA" /><br>
                                                  <div class="collapse" id="collapseinput">
                                                      <form>
                                                          <div class="mb-3 text-center">
                                                              <label for="nama_kereta">NAMA KERETA</label>
                                                              <input type="text" class="form-control" id="nama_update"
                                                                  placeholder="nama kereta" />
                                                          </div>
                                                          <div class="mb-3 text-center">
                                                              <label for="kapasitas">KAPITAS KERETA</label>
                                                              <input type="text" class="form-control" id="kapa_update"
                                                                  placeholder="KAPASITAS KERETA" />
                                                          </div>
                                                          <div class="mb-3 text-center">
                                                              <label for="daerah_stasiun">TANGGAL DIBUAT</label>
                                                              <input type="text" class="form-control" id="buat_update"
                                                                  placeholder="TANGGAL PEMBUATAN" />
                                                          </div>
                                                          <div class="mb-3 text-center">
                                                              <label for="tangalaktif">TANGGAL AKTIF</label>
                                                              <input type="text" class="form-control" id="aktif_update"
                                                                  placeholder="TANGGAL BEROPERASI" />
                                                          </div>
                                                          <div class="text-center">
                                                              <input type="button" value="UPDATE" class="btn btn-success"
                                                                  id="update" />
                                                          </div><br>
                                                      </form>
                                                  </div>
                                              </div>
                                              <div class="text-center">
                                                  <button type="button" onclick="myFunction()" class="btn btn-warning w-50"
                                                      data-toggle="collapse" data-target="#collapseinput"
                                                      aria-expanded="false" aria-controls="collapseinput"
                                                      id="edits">EDIT</button>
                                              </div><br>
                                              <div class="text-center">
                                                  <button type="button" class="btn btn-danger w-50 mx-auto"
                                                      id="deletes">Delete</button>
                                              </div>
                                          </form>
                                      </div>
                                  </td>
                              </tr>
                          </table>
                      </div>
                      <div class="col-sm-12 col-md-1 col-lg-1"></div>
                  </div>
          </main>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
              integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
          </script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
              integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
          </script>
      </body>
      <div class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12 text-left">
                          <h6>Copyright &copy; 2022</h6>
                                <p>UNIVERSITAS INDONESIA</p>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                                </div>
                            <div class="col-md-2 col-lg-2 col-sm-12 text-right">
                            <p> DEPOK </p>
                            <p> <span id="cdate"></span> </p>
                            <p> <span id="ctime"> </span></p>
                        </div>
                  </div>
                </div>          
                </div>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script>
          function myFunction() {
              var x = document.getElementById("deletes");
              if (x.style.display === "none") {
                  x.style.display = "block";
              } else {
                  x.style.display = "none";
              }
          }
      </script>
      <script>
          jQuery(document).ready(function ($) {
              $.post('/getkereta', {}, function (data) {
                  $('#kereta').html(data);
              });
          });
          $('#submits').click(function () {
              nama_kereta = $('#nama_kereta').val();
              kapasitas = $('#kapasitas').val();
              tahun_pembuatan = $('#tahun_pembuatan').val();
              tahun_aktif = $('#tahun_aktif').val();
      
              $.post('/inputkereta', {
                nama_kereta:  nama_kereta,
                kapasitas: kapasitas,
                tahun_pembuatan: tahun_pembuatan,
                tahun_aktif:tahun_aktif
              }, function (data) {
                  if (data === 'done') {
                      window.location.href = '/editkereta';
                      window.alert('Input Data Kereta Sukses');
                  } else if(data === 'empty'){
                      window.alert('Data Tidak Boleh Kosong');
                  } else {
                      window.alert('Input Data Kereta Gagal');
                  }
              });
          });
      
          $('#update').click(function () {
              id_kereta = $('#id_update').val();
              $.post('/cekkereta', {
                  id_kereta: id_kereta
              }, function (data) {
                  if (data === 'found') {
                      nama_kereta = $('#nama_update').val();
                      kapasitas_kereta = $('#kapa_update').val();
                      tahun_buat = $('#buat_update').val();
                      tahun_aktif = $('#aktif_update').val();
                      $.post('/updatekereta', {
                          id_kereta: id_kereta,
                          nama_kereta: nama_kereta,
                          kapasitas_kereta: kapasitas_kereta,
                          tahun_buat:  tahun_buat,
                          tahun_aktif: tahun_aktif
                      }, function (data) {
                          if (data === 'updated') {
                              window.location.href = '/editkereta';
                              window.alert('Update Data Kereta Sukses');
                          } else if (data === 'empty') {
                              window.alert('Input Data Tidak Boleh Kosong');
                          } else {
                              window.alert('Update Data Kereta Gagal');
                          }
                      });
                  } else if (data === 'empty') {
                      window.alert('Input Tidak Boleh Kosong');
                  } else if (data === 'notfound') {
                      window.alert('ID Tidak Ditemukan');
                  } else {
                      window.alert('ERROR');
                  }
              })
          });
      
          $('#deletes').click(function () {
              id_kereta = $('#id_update').val();
              $.post('/cekkereta', {
                  id_kereta: id_kereta
              }, function (data) {
                  if (data === 'found') {
                      if (window.confirm('Apakah Anda Yakin Ingin Menghapus Data Ini?')) {
                          $.post('/deletekereta', {
                              id_kereta: id_kereta
                          }, function (datas) {
                              if (datas === 'deleted') {
                                  window.location.href = '/editkereta';
                                  window.alert('Data Kereta Berhasil Dihapus');
                              } else {
                                  window.alert('Data Kereta Gagal Dihapus');
                              }
                          });
                      }
                  } else if (data === 'empty') {
                      window.alert('Input tidak boleh kosong');
                  } else {
                      window.alert('ERROR');
                  }
              })
          });
      </script>
      <script>
                  var dt = new Date().toDateString();
                  document.getElementById("cdate").innerHTML = dt;
                  var time = setInterval(function(){
                    var dt = new Date();
                    document.getElementById("ctime").innerHTML = dt.toLocaleTimeString();
                  }, 1000);
                </script>
      </html>`
    );
    //Mengarahkan ke halaman login
  } else {
    res.redirect("/loginpage");
  }
});

//Front-end halaman admin untuk operasi CRUD table tarif
router.get("/tarif", function (req, res, next) {
  temp = req.session;
  if (temp.username) {
    res.send(`
    <html>

<head>
    <title>IKN Railway Management</title>
    <style>
    .center {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      
      }
      .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: black;
        color: white;
        text-align: center;
      }</style>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
    <header>
        <div class="container-fluid p-0" style="background-color:black">
            <nav class="navbar navbar-expand-lg">
                <img src="images/favicon-ikn.png" alt="logo ikn" width="50" height="50">
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/admin">RUTE</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/editstasiun">STASIUN</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/editkereta">KERETA</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/tarif">TARIF</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/editadmin">ADMIN</a>
                        </li>
                    </ul>
                    <div class="mr-auto">
                              <p class="text-primary">Welcome ${temp.username}</p>
                            </div>
                    <form class="form-inline my-2 my-lg-0" action="/logout">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="logout">LOGOUT</button>
                    </form>
                </div>
            </nav>
        </div>
        </div>
    </header>
    <main>
        <div class="container-fluid text-center">
            <div class="row py-2 my-auto mx-auto">
                <div class="col-sm-12 col-md-1 col-lg-1"></div>
                <div class="col-sm-12 col-md-2 col-lg-2">
                    <h3 class="font-weight-bold">INPUT DATA BARU</h3>
                    <table class="table table-striped mx-auto">
                        <tr>
                            <td>
                                <div>
                                    <form>
                                        <div class="mb-3 text-center">
                                            <label for="kereta">ID RUTE</label>
                                            <input type="text" class="form-control" id="id_rute"
                                                placeholder="ID RUTE" />
                                        </div>
                                        <div class="mb-3 text-center">
                                            <label for="stasiunberangkat">HARGA</label>
                                            <input type="text" class="form-control" id="harga" placeholder="HARGA" />
                                        </div>
                                        <div class="text-center">
                                            <input type="button" value="SUBMIT" class="btn btn-success" id="submits" />
                                        </div>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6">
                    <h1 class="mx-auto font-weight-bold">DATA TARIF</h1>
                    <table class="table table-dark w-50 mx-auto" id="tarif">
                        <thead>
                            <tr>
                                <th class="text-center">ID TARIF</th>
                                <th class="text-center">ID RUTE</th>
                                <th class="text-center">HARGA</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="col-sm-12 col-md-2 col-lg-2">
                    <h3 class="font-weight-bold">UPDATE or DELETE</h3>
                    <table class="table table-striped mx-auto">
                        <tr>
                            <td>
                                <div>
                                    <form>
                                        <div class="mb-3 text-center">
                                            <label for="id_tarif">ID TARIF</label>
                                            <input type="text" class="form-control" id="id_tarif"
                                                placeholder="ID TARIF" /><br>
                                            <div class="collapse" id="collapseinput">
                                                <form>
                                                    <div class="mb-3 text-center">
                                                        <label for="id_rute">ID RUTE</label>
                                                        <input type="text" class="form-control" id="rute_update"
                                                            placeholder="ID RUTE" />
                                                    </div>
                                                    <div class="mb-3 text-center">
                                                        <label for="harga">HARGA</label>
                                                        <input type="text" class="form-control" id="harga_update"
                                                            placeholder="HARGA" />
                                                    </div>
                                                    <div class="text-center">
                                                        <input type="button" value="UPDATE" class="btn btn-success"
                                                            id="update" />
                                                    </div><br>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <button type="button" onclick="myFunction()" class="btn btn-warning w-50"
                                                data-toggle="collapse" data-target="#collapseinput"
                                                aria-expanded="false" aria-controls="collapseinput"
                                                id="edits">EDIT</button>
                                        </div><br>
                                        <div class="text-center">
                                            <button type="button" class="btn btn-danger w-50 mx-auto"
                                                id="deletes">Delete</button>
                                        </div>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-12 col-md-1 col-lg-1"></div>
            </div>
    </main>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
</body>
<div class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12 text-left">
                          <h6>Copyright &copy; 2022</h6>
                                <p>UNIVERSITAS INDONESIA</p>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                                </div>
                            <div class="col-md-2 col-lg-2 col-sm-12 text-right">
                            <p> DEPOK </p>
                            <p> <span id="cdate"></span> </p>
                            <p> <span id="ctime"> </span></p>
                        </div>
                  </div>
                </div>          
                </div>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script>
    function myFunction() {
        var x = document.getElementById("deletes");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
</script>
<script>
    jQuery(document).ready(function ($) {
        $.post('/gettarif', {}, function (data) {
            $('#tarif').html(data);
        });
    });
    $('#submits').click(function () {
        id_rute = $('#id_rute').val();
        harga = $('#harga').val();
        $.post('/inputtarif', {
            id_rute: id_rute,
            harga: harga
        }, function (data) {
            if (data === 'done') {
                window.location.href = '/tarif';
                window.alert('Input Data Tarif Sukses');
            } else if (data === 'empty') {
                window.alert('Data Tidak Boleh Kosong');
            } else {
                window.alert('Input Data Tarif Gagal');
            }
        });
    });

    $('#update').click(function () {
        id_tarif = $('#id_tarif').val();
        $.post('/cektarif', {
            id_tarif: id_tarif
        }, function (data) {
            if (data === 'found') {
                id_rute = $('#rute_update').val();
                harga = $('#harga_update').val();
                $.post('/updatetarif', {
                    id_tarif: id_tarif,
                    id_rute: id_rute,
                    harga: harga
                }, function (data) {
                    if (data === 'updated') {
                        window.location.href = '/tarif';
                        window.alert('Update Data Tarif Sukses');
                    } else if (data === 'empty') {
                        window.alert('Data Tidak Boleh Kosong');
                    } else {
                        window.alert('Update Data Tarif Gagal');
                    }
                });
            } else if (data == 'empty') {
                window.alert('Input Tidak Boleh Kosong');
            } else if ('notfound') {
                window.alert('Data Tidak Ditemukan');
            } else {
                window.alert('ERROR');
            }
        })
    });

    $('#deletes').click(function () {
        id_tarif = $('#id_tarif').val();
        $.post('/cektarif', {
            id_tarif: id_tarif
        }, function (data) {
            if (data === 'found') {
                if (window.confirm('Apakah Anda Yakin Ingin Menghapus Data Ini?')) {
                    $.post('/deletetarif', {
                        id_tarif: id_tarif
                    }, function (datas) {
                        if (datas === 'deleted') {
                            window.location.href = '/tarif';
                            window.alert('Data Tarif Berhasil Dihapus');
                        } else {
                            window.alert('Data Tarif Gagal Dihapus');
                        }
                    });
                }
            } else if (data === 'empty') {
                window.alert('Data tidak boleh kosong');
            } else {
                window.alert('ERROR');
            }
        })
    });
</script>
<script>
                  var dt = new Date().toDateString();
                  document.getElementById("cdate").innerHTML = dt;
                  var time = setInterval(function(){
                    var dt = new Date();
                    document.getElementById("ctime").innerHTML = dt.toLocaleTimeString();
                  }, 1000);
                </script>
</html>`);
    //Mengarahkan ke halaman login
  } else {
    res.redirect("/loginpage");
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
          res.end(
            `<html>

          <head>
              <title>IKN Railway Management</title>
              <style>
              .center {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                
                }
                .footer {
                  position: fixed;
                  left: 0;
                  bottom: 0;
                  width: 100%;
                  background-color: black;
                  color: white;
                  text-align: center;
                }</style>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          </head>
          
          <body>
              <header>
                  <div class="container-fluid p-0" style="background-color:black">
                      <nav class="navbar navbar-expand-lg">
                          <img src="images/favicon-ikn.png" alt="logo ikn" width="50" height="50">
                          <button class="navbar-toggler" type="button" data-toggle="collapse"
                              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                              aria-label="Toggle navigation">
                              <span class="navbar-toggler-icon"></span>
                          </button>
                          <div class="collapse navbar-collapse" id="navbarSupportedContent">
                              <ul class="navbar-nav mr-auto">
                                  <li class="nav-item">
                                      <a class="nav-link" href="/admin">RUTE</a>
                                  </li>
                                  <li class="nav-item">
                                      <a class="nav-link" href="/editstasiun">STASIUN</a>
                                  </li>
                                  <li class="nav-item">
                                      <a class="nav-link" href="/editkereta">KERETA</a>
                                  </li>
                                  <li class="nav-item">
                                      <a class="nav-link" href="/tarif">TARIF</a>
                                  </li>
                                  <li class="nav-item">
                                      <a class="nav-link" href="/editadmin">ADMIN</a>
                                  </li>
                              </ul>
                              <div class="mr-auto">
                              <p class="text-primary">Welcome ${temp.username}</p>
                            </div>
                              <form class="form-inline my-2 my-lg-0" action="/logout">
                                  <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="logout">LOGOUT</button>
                              </form>
                          </div>
                      </nav>
                  </div>
                  </div>
              </header>
              <main>
                  <div class="container-fluid text-center">
                      <div class="row py-2 my-auto mx-auto">
                          <div class="col-sm-12 col-md-1 col-lg-1"></div>
                          <div class="col-sm-12 col-md-2 col-lg-2">
                              <h3 class="font-weight-bold">INPUT DATA BARU</h3>
                              <table class="table table-striped mx-auto">
                                  <tr>
                                      <td>
                                          <div>
                                              <form>
                                                  <div class="mb-3">
                                                      <label for="kereta">USERNAME</label>
                                                      <input type="text" class="form-control" id="username"
                                                          placeholder="USERNAME" />
                                                  </div>
                                                  <div class="mb-3">
                                                      <label for="stasiunberangkat">PASSOWRD</label>
                                                      <input type="password" class="form-control" id="password"
                                                          placeholder="PASSWORD" />
                                                  </div>
                                                  <div class="text-center">
                                                      <input type="button" value="REGISTER" class="btn btn-success"
                                                          id="submits" />
                                                  </div>
                                              </form>
                                          </div>
                                      </td>
                                  </tr>
                              </table>
                          </div>
                          <div class="col-sm-12 col-md-6 col-lg-6 text-center">
                              <h1 class="mx-auto font-weight-bold">DATA ADMIN</h1>
                              <table class="table table-dark mx-auto" id="admin">
                                  <thead>
                                      <tr>
                                          <th scope="col">ID ADMIN</th>
                                          <th scope="col">USERNAME</th>
                                          <th scope="col">SUPER ADMIN</th>
                                      </tr>
                                  </thead>
                              </table>
                          </div>
                          <div class="col-sm-12 col-md-2 col-lg-2">
                              <h3 class="font-weight-bold">UPDATE or DELETE</h3>
                              <table class="table table-striped mx-auto">
                                  <tr>
                                      <td>
                                          <div>
                                              <form>
                                                  <div class="mb-3 text-center">
                                                      <label for="id_admin">ID ADMIN</label>
                                                      <input type="text" class="form-control" id="id_update"
                                                          placeholder="ID ADMIN" /><br>
                                                      <div class="collapse" id="collapseinput">
                                                          <form>
                                                              <div class="mb-3 text-center">
                                                                  <label for="username">USERNAME</label>
                                                                  <input type="text" class="form-control" id="user_update"
                                                                      placeholder="USERNAME" />
                                                              </div>
                                                              <div class="mb-3 text-center">
                                                                  <label for="password">PASSWORD</label>
                                                                  <input type="password" class="form-control" id="pass_update"
                                                                      placeholder="password" />
                                                              </div>
                                                              <div class="text-center">
                                                                  <input type="button" value="UPDATE" class="btn btn-success"
                                                                      id="update" />
                                                              </div><br>
                                                          </form>
                                                      </div>
                                                  </div>
                                                  <div class="text-center">
                                                      <button type="button" onclick="myFunction()" class="btn btn-warning w-50"
                                                          data-toggle="collapse" data-target="#collapseinput"
                                                          aria-expanded="false" aria-controls="collapseinput"
                                                          id="edits">EDIT</button>
                                                  </div><br>
                                                  <div class="text-center">
                                                      <button type="button" class="btn btn-danger w-50 mx-auto"
                                                          id="deletes">Delete</button>
                                                  </div>
                                              </form>
                                          </div>
                                      </td>
                                  </tr>
                              </table>
                          </div>
                          <div class="col-sm-12 col-md-1 col-lg-1"></div>
                      </div>
              </main>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
                  integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
              </script>
              <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                  integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
              </script>
          </body>
          <div class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12 text-left">
                          <h6>Copyright &copy; 2022</h6>
                                <p>UNIVERSITAS INDONESIA</p>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                                </div>
                            <div class="col-md-2 col-lg-2 col-sm-12 text-right">
                            <p> DEPOK </p>
                            <p> <span id="cdate"></span> </p>
                            <p> <span id="ctime"> </span></p>
                        </div>
                  </div>
                </div>          
                </div>
          <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
          <script>
              function myFunction() {
                  var x = document.getElementById("deletes");
                  if (x.style.display === "none") {
                      x.style.display = "block";
                  } else {
                      x.style.display = "none";
                  }
              }
          </script>
          <script>
              jQuery(document).ready(function ($) {
                  $.post('/getadmin', {}, function (data) {
                      $('#admin').html(data);
                  });
              });
              $('#submits').click(function () {
                  username = $('#username').val();
                  password = $('#password').val();
          
                  $.post('/inputadmin', {
                    username:  username,
                    password: password
                  }, function (data) {
                      if (data === 'done') {
                          window.location.href = '/editadmin';
                          window.alert('Input Data Admin Sukses');
                      } else if(data === 'empty'){
                          window.alert('Data Tidak Boleh Kosong');
                      } else {
                          window.alert('Input Data Admin Gagal');
                      }
                  });
              });
          
              $('#update').click(function () {
                  id_admin = $('#id_update').val();
                  $.post('/cekadmin', {
                      id_admin: id_admin
                  }, function (data) {
                      if (data === 'found') {
                          username = $('#user_update').val();
                          password = $('#pass_update').val();
                          $.post('/updateadmin', {
                              id_admin: id_admin,
                              username: username,
                              password: password
                          }, function (data) {
                              if (data === 'updated') {
                                  window.location.href = '/editadmin';
                                  window.alert('Update Data Admin Sukses');
                              } else if (data === 'empty') {
                                  window.alert('Input Data Tidak Boleh Kosong');
                              } else {
                                  window.alert('Update Data Admin Gagal');
                              }
                          });
                      } else if (data === 'empty') {
                          window.alert('Input Tidak Boleh Kosong');
                      } else if (data ==='notfound') {
                          window.alert('Data Admin Tidak Ditemukan');
                      }else if(data === 'super'){
                          window.alert('Data Super Admin Tidak Bisa Di Update');
                      } else {
                          window.alert('ERROR');
                      }
                  })
              });
          
              $('#deletes').click(function () {
                  id_admin = $('#id_update').val();
                  $.post('/cekadmin', {
                      id_admin: id_admin
                  }, function (data) {
                      if (data === 'found') {
                          if (window.confirm('Apakah Anda Yakin Ingin Menghapus Data Ini?')) {
                              $.post('/deleteadmin', {
                                  id_admin: id_admin
                              }, function (datas) {
                                  if (datas === 'deleted') {
                                      window.location.href = '/editadmin';
                                      window.alert('Data Admin Berhasil Dihapus');
                                  } else {
                                      window.alert('Data Admin Gagal Dihapus');
                                  }
                              });
                          }
                      } else if(data === 'super'){
                          window.alert('Data Super Admin Tidak Bisa Di Hapus');
                      }
                       else if (data === 'empty') {
                          window.alert('Data tidak boleh kosong');
                      } else {
                          window.alert('ERROR');
                      }
                  })
              });
          </script>
          <script>
                  var dt = new Date().toDateString();
                  document.getElementById("cdate").innerHTML = dt;
                  var time = setInterval(function(){
                    var dt = new Date();
                    document.getElementById("ctime").innerHTML = dt.toLocaleTimeString();
                  }, 1000);
                </script>
          </html>`
          );
          //Jika Bukan Super Admin, tidak dapat mengakses /editadmin
        } else {
          res.end(
            `<html>
          <head>
              <title>IKN Railway Management</title>
              <style>
              .center {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                
                }
                .footer {
                  position: fixed;
                  left: 0;
                  bottom: 0;
                  width: 100%;
                  background-color: black;
                  color: white;
                  text-align: center;
                }</style>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
              </head>
              <body>
                  <header>
                  <div class="container-fluid p-0" style="background-color:black">
                      <nav class="navbar navbar-expand-lg">
                          <img src="images/favicon-ikn.png" alt="logo ikn" width="50" height="50" >
                          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                          </button>
                        
                          <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/admin">RUTE</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="/editstasiun">STASIUN</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="/editkereta">KERETA</a>
                                </li>
                            </ul>
                            <div class="mr-auto">
                              <p class="text-primary">Welcome ${temp.username}</p>
                            </div>
                            <form class="form-inline my-2 my-lg-0" action="/logout">
                              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="submits">LOGOUT</button>
                            </form>
                          </div>
                        </nav>
                </div>
                </div>
                  </header>
      
                  <main>
                      <div class="container text-center">
                          <div class="row">
                              <div class="col-md-12">
                              <br>
                              <br>
                              <br>
                                <h1>ANDA TIDAK DAPAT MENGAKSES HALAMAN INI</h1>
                                <div>
                                  <h2>SILAHKAN KEMBALI KE MENU AWAL</h2>
                                </div>
                                <div>
                                  <a href="/admin" class="btn btn-primary">KEMBALI</a>
                                </div>
                              </div>
                          </div>
                      </div>
                  </main>
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                    crossorigin="anonymous"></script>
                  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                    crossorigin="anonymous"></script>
                  </body>
                  <div class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2 col-lg-2 col-sm-12 text-left">
                          <h6>Copyright &copy; 2022</h6>
                                <p>UNIVERSITAS INDONESIA</p>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                                </div>
                            <div class="col-md-2 col-lg-2 col-sm-12 mx-auto text-right">
                            <p> DEPOK </p>
                            <p> <span id="cdate"></span> </p>
                            <p> <span id="ctime"> </span></p>
                        </div>
                  </div>
                </div>          
                </div>
                  <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                  <script>
                  var dt = new Date().toDateString();
                  document.getElementById("cdate").innerHTML = dt;
                  var time = setInterval(function(){
                    var dt = new Date();
                    document.getElementById("ctime").innerHTML = dt.toLocaleTimeString();
                  }, 1000);
                </script>
      
      </html>`
          );
        }
      }
    );

    //Mengarahkan ke halaman login jika belum login atau session habis
  } else {
    res.redirect("/loginpage");
  }
});

//Menampilkan view daftar_rute dari database berisi informasi rute, tarif, nama stasiun, dan nama kereta
router.post("/getdata", (req, res) => {
  const query = "SELECT * from daftar_rute;"; // query ambil data
  //mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
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
  });
});

//Back-end untuk Table Tarif
//menampilkan table tarif
router.post("/gettarif", (req, res) => {
  const query = "select * from tarif;"; // query ambil data
  //mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    res.write(`<table>
    <tr>
      <th scope="col">ID TARIF</th>
      <th scope="col">ID RUTE</th>
      <th scope="col">HARGA</th>
    </tr>`);
    for (row of results.rows) {
      res.write(`<tr>
                    <td>${row["id_tarif"]}</td>
                    <td>${row["id_rute"]}</td>
                    <td>${row["harga"]}</td>
                </tr>`);
    }
    res.end(`</tbody>
    </table>`);
  });
});

//input data baru ke table tarif
router.post("/inputtarif", (req, res) => {
  var id_rute = req.body.id_rute;
  var harga = req.body.harga;

  if (id_rute.length > 0 && harga.length > 0) {
    const query = `insert into tarif (id_rute,harga) values ('${id_rute}','${harga}');`; //query tambahkan user baru ke database
    db.query(query, (err, results) => {
      if (err) {
        res.end("fail");
      }
      res.end("done");
    });
  } else {
    res.end("empty");
  }
});

//update atau mengubah isi table tarif
router.post("/updatetarif", (req, res) => {
  var id_tarif = req.body.id_tarif;
  var id_rute = req.body.id_rute;
  var harga = req.body.harga;
  if (id_rute && harga) {
    const query = `update tarif set id_rute = ${id_rute}, harga = ${harga} where id_tarif = ${id_tarif};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  } else if (harga) {
    const query = `update tarif set harga = ${harga} where id_tarif = ${id_tarif};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  } else if (id_rute) {
    const query = `update tarif set id_rute = ${id_rute} where id_tarif = ${id_tarif};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  } else {
    res.end("empty");
  }
});

//Delete data dari table tarif
router.post("/deletetarif", (req, res) => {
  var id_tarif = req.body.id_tarif;

  const query = `delete from tarif where id_tarif = ${id_tarif};`;
  if (id_tarif.length > 0) {
    db.query(query, (err, results) => {
      if (results) {
        res.send("deleted");
      } else {
        res.send("failed");
      }
    });
  } else {
    res.end("empty");
  }
});

//Cek ID Tarif
router.post("/cektarif", (req, res) => {
  var id_tarif = req.body.id_tarif;
  const query = `select * from tarif where id_tarif = '${id_tarif}';`;
  if (id_tarif) {
    db.query(query, (err, results) => {
      if (results.rowCount > 0) {
        res.end("found");
      } else {
        res.end("notfound");
      }
    });
  } else {
    res.end("empty");
  }
});

//Back-end untuk Table Stasiun
//menampilkan table stasiun
router.post("/getstasiun", (req, res) => {
  const query = "select * from stasiun;"; // query ambil data
  //mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    res.write(`<table>
    <tr>
        <th scope="col">Nomor Stasiun</th>
        <th scope="col">Nama Stasiun</th>
        <th scope="col">Daerah Stasiun</th>
        <th scope="col">Tanggal Dibangun</th>
    </tr>`);
    for (row of results.rows) {
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
  });
});

//Input data baru ke table stasiun
router.post("/inputstasiun", (req, res) => {
  var nama_stasiun = req.body.nama_stasiun;
  var daerah_stasiun = req.body.daerah_stasiun;
  var tahun_dibangun = req.body.tahun_dibangun;

  if (
    nama_stasiun.length > 0 &&
    daerah_stasiun.length &&
    tahun_dibangun.length > 0
  ) {
    const query = `insert into stasiun (nama_stasiun,daerah_stasiun,tahun_bangun) values ('${nama_stasiun}','${daerah_stasiun}','${tahun_dibangun}');`; //query tambahkan user baru ke database
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("done");
    });
  } else {
    res.end("empty");
  }
});

//Update data dari table stasiun
router.post("/updatestasiun", (req, res) => {
  var id_stasiun = req.body.id_stasiun;
  var nama_stasiun = req.body.nama_stasiun;
  var daerah_stasiun = req.body.daerah_stasiun;
  var tahun_bangun = req.body.tahun_bangun;

  if (nama_stasiun && daerah_stasiun && tahun_bangun) {
    const query = `update stasiun set nama_stasiun = '${nama_stasiun}', daerah_stasiun = '${daerah_stasiun}', tahun_bangun = '${tahun_bangun}' where id_stasiun = ${id_stasiun};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  } else if (nama_stasiun && daerah_stasiun) {
    const query = `update stasiun set nama_stasiun = '${nama_stasiun}', daerah_stasiun = '${daerah_stasiun}' where id_stasiun = ${id_stasiun};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  } else if (nama_stasiun && tahun_bangun) {
    const query = `update stasiun set nama_stasiun = '${nama_stasiun}', tahun_bangun = '${tahun_bangun}' where id_stasiun = ${id_stasiun};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  } else if (daerah_stasiun && tahun_bangun) {
    const query = `update stasiun set daerah_stasiun = '${daerah_stasiun}', tahun_bangun = '${tahun_bangun}' where id_stasiun = ${id_stasiun};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  } else if (nama_stasiun) {
    const query = `update stasiun set nama_stasiun = '${nama_stasiun}' where id_stasiun = ${id_stasiun};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  } else if (daerah_stasiun) {
    const query = `update stasiun set daerah_stasiun = '${daerah_stasiun}' where id_stasiun = ${id_stasiun};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  } else if (tahun_bangun) {
    const query = `update stasiun set tahun_bangun = '${tahun_bangun}' where id_stasiun = ${id_stasiun};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  } else {
    res.send("empty");
  }
});

//Delete data dari table stasiun
router.post("/deletestasiun", (req, res) => {
  var id_stasiun = req.body.id_stasiun;
  const query = `delete from stasiun where id_stasiun = ${id_stasiun};`;
  db.query(query, (err, results) => {
    if (results) {
      res.send("deleted");
    } else {
      res.send("failed");
    }
  });
});

//CEK ID STASIUN
router.post("/cekstasiun", (req, res) => {
  var id_stasiun = req.body.id_stasiun;
  const query = `select * from stasiun where id_stasiun = ${id_stasiun};`;
  if (id_stasiun) {
    db.query(query, (err, results) => {
      if (results.rowCount > 0) {
        res.send("found");
      } else {
        res.send("notfound");
      }
    });
  } else {
    res.send("empty");
  }
});

//Back-end untuk Table Rute
//menampilkan table rute
router.post("/getrute", (req, res) => {
  const query = "select * from rute;"; // query ambil data
  //mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
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
    for (row of results.rows) {
      res.write(`<tr>
                    <td>${row["id_rute"]}</td>
                    <td>${row["id_kereta"]}</td>
                    <td>${row["id_stasiun_berangkat"]}</td>
                    <td>${row["waktu_berangkat"]}</td>
                    <td>${row["id_stasiun_tiba"]}</td>
                    <td>${row["waktu_tiba"]}</td>
                    <td>${row["jarak"]}</td>
                </tr>`);
    }
    res.end(`</tbody>
    </table>`);
  });
});

//Input data baru ke table rute
router.post("/inputrute", (req, res) => {
  var id_kereta = req.body.id_kereta;
  var id_stasiun_ber = req.body.stasiun_ber;
  var waktu_ber = req.body.waktu_ber;
  var id_stasiun_tib = req.body.stasiun_tib;
  var waktu_tib = req.body.waktu_tib;
  var jarak = req.body.jarak;
  console.log(id_kereta, id_stasiun_ber, waktu_ber, id_stasiun_tib, waktu_tib, jarak);
  if (
    id_kereta &&
    id_stasiun_ber &&
    waktu_ber &&
    id_stasiun_tib &&
    waktu_tib &&
    jarak
  ) {
    const query = `insert into rute (id_kereta, id_stasiun_berangkat, waktu_berangkat, id_stasiun_tiba, waktu_tiba, jarak) values ('${id_kereta}','${id_stasiun_ber}','${waktu_ber}','${id_stasiun_tib}','${waktu_tib}', '${jarak}');`; //query tambahkan user baru ke database
    db.query(query, (err, results) => {
      if (results) {
        res.end("done");
      } else {
        res.end("fail");
      }
    });
  } else {
    res.end("empty");
  }
});

//Update data dari table rute
router.post("/updaterute", (req, res) => {
  var id_rute = req.body.id_rute;
  var id_kereta = req.body.ker;
  var id_stasiun_ber = req.body.sber;
  var waktu_ber = req.body.wber;
  var id_stasiun_tib = req.body.stuj;
  var waktu_tib = req.body.wtib;
  var jarak = req.body.jar;
  console.log(id_rute + 'idrute');
  console.log(id_kereta + 'idkereta');
  console.log(id_stasiun_ber + 'idstasiunber');
  console.log(waktu_ber + 'waktuber');
  console.log(id_stasiun_tib + 'idstasiuntib');
  console.log(waktu_tib + 'waktu tib');
  console.log(jarak + 'jarak');

  if (id_kereta && id_stasiun_ber && waktu_ber && id_stasiun_tib && waktu_tib && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && id_stasiun_ber && waktu_ber && id_stasiun_tib && waktu_tib) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    }
    );
  }
  else if (id_kereta && id_stasiun_ber && waktu_ber && id_stasiun_tib && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && id_stasiun_ber && waktu_ber && waktu_tib && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && id_stasiun_ber && id_stasiun_tib && waktu_tib && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && waktu_ber && id_stasiun_tib && waktu_tib && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && waktu_ber && id_stasiun_tib && waktu_tib && jarak) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_kereta && id_stasiun_ber && waktu_ber && id_stasiun_tib) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_kereta && id_stasiun_ber && waktu_ber && waktu_tib) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_kereta && id_stasiun_ber && waktu_ber && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_kereta && id_stasiun_ber && id_stasiun_tib && waktu_tib){
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_kereta && id_stasiun_ber && id_stasiun_tib && jarak){
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_kereta && id_stasiun_ber && waktu_tib && jarak){
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_kereta && waktu_ber && id_stasiun_tib && waktu_tib){
    const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_kereta && waktu_ber && id_stasiun_tib && jarak){
    const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_kereta && waktu_ber && waktu_tib && jarak){
    const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_kereta && id_stasiun_tib && waktu_tib && jarak){
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_stasiun_ber && waktu_ber && id_stasiun_tib && waktu_tib){
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_stasiun_ber && waktu_ber && id_stasiun_tib && jarak){
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_stasiun_ber && waktu_ber && waktu_tib && jarak){
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(id_stasiun_ber && id_stasiun_tib && waktu_tib && jarak){
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(waktu_ber && id_stasiun_tib && waktu_tib && jarak){
    const query = `update rute set waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }

  else if (id_kereta && id_stasiun_ber && waktu_ber) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && id_stasiun_ber && id_stasiun_tib) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && id_stasiun_ber && waktu_tib) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && id_stasiun_ber && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && waktu_ber && id_stasiun_tib) {
    const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && waktu_ber && waktu_tib) {
    const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && waktu_ber && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && id_stasiun_tib && waktu_tib) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && id_stasiun_tib && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && waktu_tib && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && waktu_ber && id_stasiun_tib) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && waktu_ber && waktu_tib) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && waktu_ber && jarak) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && id_stasiun_tib && waktu_tib) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && id_stasiun_tib && jarak) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && waktu_tib && jarak) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (waktu_ber && id_stasiun_tib && waktu_tib) {
    const query = `update rute set waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if(waktu_ber && id_stasiun_tib && jarak) {
    const query = `update rute set waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (waktu_ber && waktu_tib && jarak) {
    const query = `update rute set waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_tib && waktu_tib && jarak) {
    const query = `update rute set id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && id_stasiun_ber) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_berangkat = '${id_stasiun_ber}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && waktu_ber) {
    const query = `update rute set id_kereta = '${id_kereta}', waktu_berangkat = '${waktu_ber}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && id_stasiun_tib) {
    const query = `update rute set id_kereta = '${id_kereta}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && waktu_tib) {
    const query = `update rute set id_kereta = '${id_kereta}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta && jarak) {
    const query = `update rute set id_kereta = '${id_kereta}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && waktu_ber) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_berangkat = '${waktu_ber}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && id_stasiun_tib) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && waktu_tib) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber && jarak) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (waktu_ber && id_stasiun_tib) {
    const query = `update rute set waktu_berangkat = '${waktu_ber}', id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (waktu_ber && waktu_tib) {
    const query = `update rute set waktu_berangkat = '${waktu_ber}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (waktu_ber && jarak) {
    const query = `update rute set waktu_berangkat = '${waktu_ber}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_tib && waktu_tib) {
    const query = `update rute set id_stasiun_tiba = '${id_stasiun_tib}', waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_tib && jarak) {
    const query = `update rute set id_stasiun_tiba = '${id_stasiun_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (waktu_tib && jarak) {
    const query = `update rute set waktu_tiba = '${waktu_tib}', jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_kereta) {
    const query = `update rute set id_kereta = '${id_kereta}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_ber) {
    const query = `update rute set id_stasiun_berangkat = '${id_stasiun_ber}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (waktu_ber) {
    const query = `update rute set waktu_berangkat = '${waktu_ber}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (id_stasiun_tib) {
    const query = `update rute set id_stasiun_tiba = '${id_stasiun_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (waktu_tib) {
    const query = `update rute set waktu_tiba = '${waktu_tib}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else if (jarak) {
    const query = `update rute set jarak = '${jarak}' where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results) {
        res.send("updated");
      } else {
        res.send("failed");
      }
    });
  }
  else {
    res.send("empty");
  }
});

//Delete data dari table rute
router.post("/deleterute", (req, res) => {
  var id_rute = req.body.id_rute;
  console.log(id_rute + "delet");
  const query = `delete from rute where id_rute = ${id_rute};`;
  db.query(query, (err, results) => {
    if (results) {
      res.send("deleted");
    } else {
      res.send("failed");
    }
  });
});

//cek id rute
router.post("/cekrute", (req, res) => {
  var id_rute = req.body.id_rute;
  if (id_rute) {
    const query = `select * from rute where id_rute = ${id_rute};`;
    db.query(query, (err, results) => {
      if (results.rowCount > 0) {
        res.send("found");
      } else {
        res.send("notfound");
      }
    });
  } else {
    res.send("empty");
  }
});

//Back-end untuk Table Kereta
//menampilkan table kereta
router.post("/getkereta", (req, res) => {
  const query = "select * from kereta;"; // query ambil data
  //mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    res.write(`<table>
      <tr>
          <th scope="col">Nomor Kereta</th>
          <th scope="col">Nama Kereta</th>
          <th scope="col">Kapasitas Penumpang</th>
          <th scope="col">Tanggal Pembuatan</th>
          <th scope="col">Tanggal Beroperasi</th>
      </tr>`);
    for (row of results.rows) {
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
  });
});

//Input data baru ke table kereta
router.post("/inputkereta", (req, res) => {
  var nama_kereta = req.body.nama_kereta;
  var kapasitas = req.body.kapasitas;
  var tahun_pembuatan = req.body.tahun_pembuatan;
  var tahun_aktif = req.body.tahun_aktif;

  if (
    nama_kereta.length > 0 &&
    kapasitas.length > 0 &&
    tahun_pembuatan.length > 0 &&
    tahun_aktif.length > 0
  ) {
    const query = `insert into kereta (nama_kereta,kapasitas_kereta,tahun_buat,tahun_aktif) values ('${nama_kereta}','${kapasitas}','${tahun_pembuatan}', '${tahun_aktif}');`; //query tambahkan user baru ke database
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("done");
    });
  } else {
    res.end("empty");
  }
});

//Update data dari table kereta
router.post("/updatekereta", (req, res) => {
  var id_kereta = req.body.id_kereta;
  var nama_kereta = req.body.nama_kereta;
  var kapasitas_kereta = req.body.kapasitas_kereta;
  var tahun_buat = req.body.tahun_buat;
  var tahun_aktif = req.body.tahun_aktif;

  if (nama_kereta && kapasitas_kereta && tahun_buat && tahun_aktif) {
    const query = `update kereta set nama_kereta = '${nama_kereta}', kapasitas_kereta = '${kapasitas_kereta}', tahun_buat = '${tahun_buat}', tahun_aktif = '${tahun_aktif}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (nama_kereta && kapasitas_kereta && tahun_buat) {
    const query = `update kereta set nama_kereta = '${nama_kereta}', kapasitas_kereta = '${kapasitas_kereta}', tahun_buat = '${tahun_buat}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (nama_kereta && kapasitas_kereta && tahun_aktif) {
    const query = `update kereta set nama_kereta = '${nama_kereta}', kapasitas_kereta = '${kapasitas_kereta}', tahun_aktif = '${tahun_aktif}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (kapasitas_kereta && tahun_buat && tahun_aktif) {
    const query = `update kereta set kapasitas_kereta = '${kapasitas_kereta}', tahun_buat = '${tahun_buat}', tahun_aktif = '${tahun_aktif}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (nama_kereta && kapasitas_kereta) {
    const query = `update kereta set nama_kereta = '${nama_kereta}', kapasitas_kereta = '${kapasitas_kereta}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (nama_kereta && tahun_buat) {
    const query = `update kereta set nama_kereta = '${nama_kereta}', tahun_buat = '${tahun_buat}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (nama_kereta && tahun_aktif) {
    const query = `update kereta set nama_kereta = '${nama_kereta}', tahun_aktif = '${tahun_aktif}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (kapasitas_kereta && tahun_buat) {
    const query = `update kereta set kapasitas_kereta = '${kapasitas_kereta}', tahun_buat = '${tahun_buat}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (kapasitas_kereta && tahun_aktif) {
    const query = `update kereta set kapasitas_kereta = '${kapasitas_kereta}', tahun_aktif = '${tahun_aktif}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (tahun_buat && tahun_aktif) {
    const query = `update kereta set tahun_buat = '${tahun_buat}', tahun_aktif = '${tahun_aktif}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (nama_kereta) {
    const query = `update kereta set nama_kereta = '${nama_kereta}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (kapasitas_kereta) {
    const query = `update kereta set kapasitas_kereta = '${kapasitas_kereta}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (tahun_buat) {
    const query = `update kereta set tahun_buat = '${tahun_buat}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (tahun_aktif) {
    const query = `update kereta set tahun_aktif = '${tahun_aktif}' where id_kereta = '${id_kereta}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else {
    res.end("empty");
  }
});

//Delete data dari table kereta
app.post("/deletekereta", (req, res) => {
  const id_kereta = req.body.id_kereta;
  const query = `delete from kereta where id_kereta = '${id_kereta}';`;
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.end("fail");
    }
    res.end("deleted");
  });
});

//Cek ID kereta
router.post("/cekkereta", (req, res) => {
  var id_kereta = req.body.id_kereta;
  if (id_kereta) {
    const query = `select * from kereta where id_kereta = '${id_kereta}';`; // query ambil data
    db.query(query, (err, results) => {
      if (results.rowCount > 0) {
        res.end("found");
      } else {
        res.end("notfound");
      }
    });
  } else {
    res.end("empty");
  }
});

//Back-end untuk Table Admin
//menampilkan table admin
router.post("/getadmin", (req, res) => {
  const query = "select id_admin,username,super_admin from admin;"; // query ambil data
  //mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    res.write(`<table>
    <tr>
      <th scope="col">ID ADMIN</th>
      <th scope="col">USERNAME</th>
      <th scope="col">SUPER ADMIN</th>
    </tr>`);
    for (row of results.rows) {
      res.write(`<tr>
                    <td>${row["id_admin"]}</td>
                    <td>${row["username"]}</td>
                    <td>${row["super_admin"]}</td>
                </tr>`);
    }
    res.end(`</tbody>
    </table>`);
  });
});

//Input data baru ke table admin
router.post("/inputadmin", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (username.length > 0 && password.length > 0) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (hash) {
        const query = `insert into admin (username, password, super_admin) values ('${username}','${hash}','false');`; //query tambahkan user baru ke database
        db.query(query, (err, results) => {
          if (results) {
            res.end("done");
          } else {
            res.end("fail");
          }
        });
      } else {
        res.end("failhash");
      }
    });
  } else {
    res.end("empty");
  }
});

//Update data dari table admin
router.post("/updateadmin", (req, res) => {
  var id_admin = req.body.id_admin;
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (hash) {
        const query = `update admin set username = '${username}', password = '${hash}' where id_admin = '${id_admin}';`;
        db.query(query, (err, results) => {
          if (err) {
            console.log(err);
            res.end("fail");
          }
          res.end("updated");
        });
      } else {
        res.end("failhash");
      }
    });
  } else if (username) {
    const query = `update admin set username = '${username}' where id_admin = '${id_admin}';`;
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.end("fail");
      }
      res.end("updated");
    });
  } else if (password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (hash) {
        const query = `update admin set password = '${hash}' where id_admin = '${id_admin}';`;
        db.query(query, (err, results) => {
          if (err) {
            console.log(err);
            res.end("fail");
          }
          res.end("updated");
        });
      } else {
        res.end("failhash");
      }
    });
  } else {
    res.end("empty");
  }
});

//Delete data dari table admin
router.post("/deleteadmin", (req, res) => {
  const id_admin = req.body.id_admin;
  const query = `delete from admin where id_admin = '${id_admin}';`;
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.end("fail");
    }
    res.end("deleted");
  });
});

//cek admin
router.post("/cekadmin", (req, res) => {
  var id_admin = req.body.id_admin;
  if (id_admin) {
    if (id_admin == 1) {
      res.end("super");
    }
    const query = `select * from admin where id_admin = '${id_admin}';`; // query ambil data
    db.query(query, (err, results) => {
      if (results.rowCount > 0) {
        res.end("found");
      } else {
        res.end("notfound");
      }
    });
  } else {
    res.end("empty");
  }
});

//Back-end untuk melakukan login
router.post("/login", (req, res) => {
  temp = req.session;
  temp.username = req.body.username;
  temp.password = req.body.pass;
  console.log(temp.username);
  console.log(temp.password);
  if (temp.username.length > 0 && temp.password.length > 0) {
    const query = `select password from admin where username like '${temp.username}'`; //query ambil data user untuk login

    //mengecek informasi yang dimasukkan user apakah terdaftar pada database
    db.query(query, (err, results) => {
      if (results.rowCount == 0) {
        res.end("notfound");
      } else {
        bcrypt.compare(
          temp.password,
          results.rows[0].password,
          (err, result) => {
            if (result) {
              res.end("done");
            } else {
              res.end("fail");
            }
          }
        );
      }
    });
  } else {
    res.end("empty");
  }
});

//Back-end untuk melakukan log out
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});

app.use("/", router);
//Port yang digunakan
app.listen(process.env.PORT || 8888, () => {
  console.log(`App Started on PORT ${process.env.PORT || 8888}`);
});