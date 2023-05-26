const db = require("../models");
const Tutorial = db.tutorials;

// Estamos criando e fazendo o export de todas as funções para router

// Note que por vezes direcionamos o user para uma URL com os parametros do TUTORIAL que sera modificado, então chamamos estas funções,
// por isso o uso de req.params e req.query

// Criar e salvar novo tutorial
exports.criar = (req, res) => {
  // Verificando se há um titulo
  if (!req.body.titulo) {
    res.status(400).send({ message: "Ttitulo não pode ser vazio!" }); //Enviando um 400 caso não haja um titulo
    return;
  }

  // Criando um novo tutorial baseado no schema
  const tutorial = new Tutorial({
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    publicado: req.body.publicado ? req.body.publicado : false // Ultilizando ternario para verificar se o atributo publicado é TRUE,
  });                                                          // Caso o resultado seja algo que não TRUE, iremos atrubuir o valor FALSE

  // Salvando o TUTORIAL na DB
  tutorial.save(tutorial)
    .then(data => { // Verificando se deu tudo certo
      res.send(data);
    })
    .catch(err => { // Caso haja algum erro,enviando erro 500 alertando sobre o erro
      res.status(500).send({
        message:
          err.message || "Houve um erro ao salvar o TUTORIAL." 
      });
    });
};

// Selecionar todos os tutoriais do DB, com certo titulo passado em parametro, ou nenhum caso nenhum seja passado
exports.encontrarTodos = (req, res) => {
    const titulo = req.query.titulo;  

    // O req.query puxa tudo na URL que vem após o "?", ou seja os parametros / querys passados na URL
    // EX :http://siteDeLivros/biblioteca?titulo=senhorDosAneis&publicado=true
    // req.query.titulo neste caso retornara : "senhorDosAneis", pois o req.query retorna STRING

    //Verificando se ha um titulo, caso haja, criando o query para passarmos ao metodo FIND
    var condicao = titulo ? { titulo: { $regex: new RegExp(titulo), $options: "i" } } : {};
  
    Tutorial.find(condicao) //Realizando o FIND com as condicoes passadas, no caso o titulo
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({ //Caso haja algum error, enviando um erro do tipo 500
          message:
            err.message || "Houve algum erro ao pesquisar pelos Tutoriais"
        });
      });
  };

// Encontrar um tutorial especifico pelo ID
exports.encontrarUm = (req, res) => {

  // Realizando o req dos parametros, como explicado acima  
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)  // Verificando se foi encontrado algum tutorial com o ID
        res.status(404).send({ message: "Não há nenhum tutorial com o ID : " + id });
      else res.send(data);  // Caso tenha sido encontrado, enviaremos a DATA
    })
    .catch(err => {   //Fazendo o CATCH do erro e enviando um erro 500 caso o mesmo ocorra
      res.status(500)
        .send({ message: "Houve um erro ao encontrar tutoriais com o ID : " + id });
    });
};

// Atualizar um tutorial através do ID
exports.atualizar = (req, res) => {
  {
    if (!req.body) { //Verificando se não estamos recebendo um PARSE vazio
      return res.status(400).send({
        message: "Sem nenhum dado para ser atualizado!"
      });
    }
  
    const id = req.params.id; //Descobrindo o ID na URL
        //id que sera atualizado / data que sera inserida
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false }) //Nao ultilizamos o FindAndModify pois ele pode criar um novo RECORD acidentalmente
      .then(data => {   
        if (!data) {  //Caso nenhuma data seja econtrada, enviaremos um erro do tipo 404
          res.status(404).send({
            message: `Não podemos atualizar o Tutorial com id : ${id}, pois não encontramos o mesmo`
          });     
        } else res.send({ message: "Tuturial atualizado." }); //Caso os dados sejam encontrados 
      })
      .catch(err => {  //Caso sejam encontrados dados e haja um erro
        res.status(500).send({    
          message: "Houve um erro ao atualziar o tutorial : " + id
        });
      });
  };
  
  
};

// Deletar um tutorial ultilzando o ID
exports.delete = (req, res) => {
  const id = req.params.id; //Pegando o ID na URL

  Tutorial.findByIdAndRemove(id)
    .then(data => {
      if (!data) { //Caso não encontremos nenhum dado
        res.status(404).send({
          message: `Não há nenhum tutorial com o id=${id}. O tutorial pode ter sido deletado!`
        });
      } else { //Caso algum dado seja encontrado
        res.send({
          message: "O tutorial foi deletado com sucesso!"
        });
      }
    })
    .catch(err => { //Realizando o catch de possiveis erros
      res.status(500).send({ //Throwing um erro 500
        message: "Houve um erro ao deletar o tutorial com o ID : " + id
      });
    });
};

// Deletar todos os tutoriais da DB / DROP.
exports.deleteTodos = (req, res) => {
  Tutorial.deleteMany({}) //Deletando todos com o parametro passado, no caso, nenhum, para que sejam selecionados todos os ITEMS no DB
    .then(data => { //Caso não haja nenhum erro
      res.send({ //Numero de tutoriais deletados
        message: `${data.deletedCount} Tuturiais foram deletados`
      });
    })
    .catch(err => {
      res.status(500).send({ //Caso haja um erro, throwing um error do tipo 500
        message: "Ocorreu algum erro ao apagar os tutoriais." 
      });
    });
};

// Encontrar todos os tutoriais em que a prop PUBLIC = TRUE
exports.encontrarTodosOsPublicados = (req, res) => {
  Tutorial.find({ publicado: true }) //Encontrando todos os tutoriais onde o paramtreo PUBLICADO = TRUE
    .then(data => { //Caso não haja um erro
      res.send(data); 
    })
    .catch(err => {  //Realizando o CATCH para possiveis erros
      res.status(500).send({ //Throwing um erro 500, caso haja algum erro durante o processo da FUNC
        message:
          err.message || "Hove um erro ao encontrar os dados"
      });
    });
};