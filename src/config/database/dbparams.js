'use strict';

require('dotenv').config();

module.exports={
    database: {
        host: process.env.HOSTDB,
        port: process.env.PORTDB,
        user: process.env.USERDB,
        password: process.env.PASSDB,
        database: process.env.DATADB,
    }
}
