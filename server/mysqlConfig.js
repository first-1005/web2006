const mysql = require('mysql');

const clinet = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ego06'
})
function sqlFn(sql,arr,callback){
    clinet.query(sql,arr,(error,result)=>{
        if(error){
            return;
        }
        callback(result)
    })

}
module.exports = sqlFn;