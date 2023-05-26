const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Setando o CORS para nos seja permitido acessar o conteudo de http://localhost:8081
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Configurando para que seja realizado o PARSE de JSON
app.use(express.json());

// Configurando para que seja realizado o PARSE de APPLICATION/-www-form-urlencoded, que é enviado pelo HTML
app.use(express.urlencoded({ extended: true }));

//Conectando a DB
const db = require("./app/models");
            //Conectando ao URL da DB
db.mongoose.connect(db.url, {
    useNewUrlParser: true,     // Ambos os atributos devem ser TRUE,
    useUnifiedTopology: true   // para que não haja problemas no funcionamento e na ultilização de PROMISSES
  })
  .then(() => {   //Ultilizando ASYNC para verificar se houve algum erro ao conectar
    console.log("Conectado ao DB!");
  })
  .catch(err => {  //Realizando o CATCH de possiveis erros
    console.log("Não foi possivel conectar, erro : ", err);
    process.exit();
  });

// GET para a ROOT
app.get("/", (req, res) => {
  res.json({ message: "OLA" });
});

// Fazendo o require do ROUTER, que ira tratar qualquer request que va para "root/api/tutoriais"
require("./app/routes/tutorials.route")(app);

// Abrindo o PORT no LOCALHOST 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor aberto em ${PORT}.`);
});

