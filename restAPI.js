//import modules
const express = require('express');
const app = express();

//method get
app.get('/test', (req, res)=>{
    res.end("get XIRPL 6");
});

//method post
app.post('/test', (req, res)=>
{
    res.end("post xirpl6");
});

//inisialitasi port
app.listen('8080', (e)=>
{
    console.log(e);
});