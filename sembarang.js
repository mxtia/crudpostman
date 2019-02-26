//import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient; //import driver mongodb
const ObjectID = require('mongodb').ObjectID; //import objectID
const DBurl = "mongodb://127.0.0.1:27017/"; //url DB -> port mongo:27017
const DBname = "terserah";

let dbo = null; //object koneksi database
//koneksi database
MongoClient.connect(DBurl, (error, db) => {
    if(error) throw error;
    dbo = db.db(DBname);
});
app.use(bodyParser.urlencoded({extended: false}))

//end point get : mengambil data dari database yang dibuat sebelumnya
app.get('/siswa', (request, response) => {
    dbo.collection("apapun").find().toArray((err, res) => {
        //mengambil data collection dalam bentuk array
        if(err) throw err;
        response.json(res); //mengambilkan data
    })
});

//endpoint insert data ke database
app.post('/siswa', (request, response) =>{
    let namaSiswa = request.body.nama;
    let jurusanSiswa = request.body.jurusan;
    let alamatSiswa = request.body.alamat;
    dbo.collection("apapun").insertOne({
        nama : namaSiswa,
        jurusan : jurusanSiswa,
        alamat : alamatSiswa
    }, (err, res)=>{
        if(!err){
            response.json(res);
            response.end("Data berhasil masuk");
        }
        else{
            throw err; //apabila error akan dilempar ke nodejs
        }
    })
});

//endpoint delete data dari database

app.delete('/siswa/:id', (request, response) =>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("apapun").deleteOne({
        _id : id_object
    }, (err, res) => {
        if(err) throw err;
        response.end("Data berhasil dihapus");
    }
    )

})

//endpoint update data dari database
app.put('/siswa/:id', (request, response) => {
    let id = request.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = request.body.nama;
    let alamatSiswa = request.body.alamat;
    let jurusanSiswa = request.body.jurusan;

    dbo.collection("apapun").updateOne({
        _id : id_object
    }, {$set: {
        nama : namaSiswa,
        alamat : alamatSiswa,
        jurusan : jurusanSiswa
    }},
        (err, res) => {
            if(err) throw err;
            response.end("Data berhasil diupdate");
        })
})

//inisialisasi port
app.listen('1212');