import app from "./app.js";
import sequelize from './database/database.js';
import 'dotenv/config';
import logger from "./logs/logger.js";
async function main() {
    await sequelize.sync({force:false});
    const port=process.env.PORT;
    app.listen(port);
    logger.info('Servidor Inicializado en el:' + port);
}
main();
