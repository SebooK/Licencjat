import {readFile} from "fs/promises";
import {Sequelize} from "sequelize";

const env = process.env.NODE_ENV || 'development';
const dbConfig = JSON.parse(await readFile('./config/config.json', (err, data) => {
    if (err) throw err;
}));

const {development} = dbConfig;
const {production} = dbConfig;
let sequelize;
if (env === 'development') {
    sequelize = new Sequelize(development.database, development.username, development.password, {
        host: development.host,
        dialect: development.dialect,
        port: development.port
    });
} else {
    sequelize = new Sequelize(production.database, production.username, production.password, {
        host: production.host,
        dialect: production.dialect,
        port: production.port
    });
}
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully'))
    .catch(err => console.error('Unable to connect to the database:', err));
export {sequelize}
