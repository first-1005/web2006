const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const auth= require('./auth');
const debug = require('debug')('my-application')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use('/api',auth);
// cors跨域处理
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3005");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})



app.listen(3005,()=>{
   debug(3005)
})