var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'mysql',
  connection: require('../config/db'),
  pool:{
	  afterCreate:(conn,done)=>{
		  conn.query("SET NAMES UTF8",(err)=>{
			  done(err,conn);
		  })
	  }
  }
})

const mon_th = ['มค.', 'กพ.', 'มีค.', 'เมย.', 'พค.', 'มิย.', 'กค.', 'สค.', 'กย.', 'ตค.', 'พย.', 'ธค.'];


router.get('/day/:hn', async (req, res) => {
  let hn = req.params.hn;
  console.log('req day hn',hn);
  // list year-mon
  let sql = "SELECT  t.hn,left(t.visit_admit_date,4) y ,month(t.visit_admit_date) m\n" +
    ",left(t.visit_admit_date,7) ym FROM medico_scan_doc t \n" +
    "WHERE t.hn = ?  GROUP BY ym ORDER BY ym DESC";
  let raw = await knex.raw(sql, [hn]);
  let row = raw[0];
  let tree = { name: hn, toggled: true, children: [] };

  for (let i = 0; i < row.length; i++) {
    let yy = row[i].y * 1 + 543;
    if (i === 0) {
      tree.children.push({
        name: mon_th[row[i].m - 1] + yy,
        ym: row[i].ym,
        toggled: true,
        children: []
      })
    } else {
      tree.children.push({
        name: mon_th[row[i].m - 1] + yy,
        ym: row[i].ym,
        children: []
      })
    }

  }

  // list day

  for (let i = 0; i < tree.children.length; i++) {
    let sql = "SELECT  t.hn,date(t.visit_admit_date) dddd,year(t.visit_admit_date)+543 y \n" +
      ",year(t.visit_admit_date) yy,month(t.visit_admit_date) m ,DAY(t.visit_admit_date) d\n" +
      "from medico_scan_doc t WHERE t.hn = ? AND left(t.visit_admit_date,7) =? \n" +
      "GROUP BY  dddd ORDER BY dddd DESC";
    let raw = await knex.raw(sql, [hn, tree.children[i].ym])
    let data = raw[0];

    for (let j = 0; j < data.length; j++) {
      let day_th = data[j].d + ' ' + mon_th[data[j].m - 1] + '' + data[j].y;
      let day = data[j].yy + '-' + data[j].m + '-' + data[j].d;
      tree.children[i].children.push({
        name: day_th,
        day: day,
        children: []
      });

      let sql = "SELECT  t.hn,t.department,t.visit_admit_date vdate,t.doc_type,c.doc_name,c.no,t.file_name \n" +
      "from medico_scan_doc t INNER JOIN medico_scan_code c on c.code = t.doc_type \n" +
      "WHERE t.hn=? AND t.visit_admit_date = ? \n" +
      "ORDER BY t.department ASC,c.no ASC";
      let raw = await knex.raw(sql, [hn, day])
      let row = raw[0];

      for (let index = 0; index < row.length; index++) {
        tree.children[i].children[j].children.push({
          name: '('+row[index].department+') '+row[index].doc_name,
          paper: true,
          'hn': row[index].hn,
          date: day,
          file: hn + '/' + row[index].department + '/' + row[index].file_name
        })
      }
    }
  }

  res.json(tree)
});

router.get('/type/:hn', async (req, res) => {
  let hn = req.params.hn;
  console.log('req type hn',hn);
  let tree = {name:hn,toggled:true,children:[]}
  let sql = "SELECT t.hn,t.department,t.doc_type,c.doc_name,c.code from medico_scan_doc t \n" +
  "INNER JOIN medico_scan_code c on t.doc_type = c.`code`\n" +
  "WHERE t.hn = ? GROUP BY t.doc_type \n" +
  "ORDER BY t.department ASC,c.`no` ASC" ;
  let raw = await knex.raw(sql,[hn]);
  let row=raw[0];
  for (let index = 0; index < row.length; index++) {
    tree.children.push({
      name:'('+row[index].department+') '+row[index].doc_name,
      children:[],
      hn:row[index].hn,
      department:row[index].department,
      doc_type:row[index].doc_type
    })    
  }

  for (let i = 0; i < tree.children.length; i++) {
    let doc_type = tree.children[i].doc_type;
    let department = tree.children[i].department;
    let sql ="SELECT t.hn,t.visit_admit_date vdate,t.department,t.doc_type \n" +
    ",year(t.visit_admit_date) yy,year(t.visit_admit_date)+543 y,month(t.visit_admit_date) m\n" +
    ",day(t.visit_admit_date) d ,t.file_name \n" +
    "FROM medico_scan_doc t LEFT JOIN medico_scan_code c ON c.`code` = t.doc_type\n" +
    "WHERE t.hn = ? AND t.doc_type = ? \n" +
    "ORDER BY vdate DESC";
    let raw = await knex.raw(sql,[hn,doc_type]);
    let data = raw[0];

    for (let index = 0; index < data.length; index++) {
      let day = data[index].yy + '-' + data[index].m + '-' + data[index].d;
      let day_th = data[index].d +' '+mon_th[data[index].m - 1] +' '+data[index].y;
      tree.children[i].children.push({
        name:day_th,
        paper:true,
        vdate:day,
        file: hn + '/' + data[index].department + '/' + data[index].file_name
      })      
    }
   


  }

  res.json(tree)
});

module.exports = router;