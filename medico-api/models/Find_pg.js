var knex = require('knex')({
    client: 'pg',
    connection: require('../config/db_pg'),
   
})

class Find {
    async findHnByAn(an) {
        let raw = await knex('t_visit').where({ visit_an: an }).limit(1);
        return raw[0].visit_hn;
    }
}

module.exports = Find;