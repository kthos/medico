var knex = require('knex')({
    client: 'mysql',
    connection: require('../config/db')
})

class Find {
    async findHnByAn(an){
        let raw = await knex('an_stat').where({ an: an }).limit(1);
        return raw;
    }
}

module.exports = Find;