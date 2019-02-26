//create server

const express = require('express'); // import module exporess
const app = express(); //mengeksekusi module express

//eksekusi express dengan memanggil variable app
app.get('/test', function(request, respone) {
    //simbol / yang beartyi "root" atau halaman utama, fuction req(request) dan res(respone)
    respone.send("halooooo!") //mengirimkan respone dari http dan dikembalikan

})
app.listen('12'); //defisini halaman port