const { Client } = require("pg");
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

module.exports = db;
  