var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: require('../config/db_pg'), 
})

router.post('/login',async (req,res)=>{
    const data = req.body
    let sql = `select count(employee_login) as logged from b_employee where employee_login= '${data.username}'`;
    sql+= `and employee_password = md5('${data.password}')`;
    let raw = await knex.raw(sql)
    res.send(raw.rows[0].logged)
});

router.get('/test',(req,res)=>{
    res.json({"test":"ok"})
});

module.exports = router;