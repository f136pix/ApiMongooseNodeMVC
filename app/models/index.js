// Importando o OBJETO que estamos ultilizando para configurar o DB
const dbConfig = require("../config/db.config.js");

// Configurando o Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const db = {
    mongoose : mongoose,
    url : dbConfig.url,
    tutorials : require("./tutorial.model.js")(mongoose)
};

// Exportando o OBJETO com as configs da DB prontas
module.exports = db;