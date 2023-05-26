module.exports = app => {
  //Importando todos os metodos que exportamos em contrroller
  const tutoriais = require("../controllers/tutorial.controller.js");

  //Criandoo ROUTER 
  var router = require("express").Router();

  //Entendam que todos os metodos abaixo funcionam para : http://ROOT:8080/api/tutoriais
  //Onde ultilizamos :id, tudo o que vem apos /tutoriais sera puxado no req.params.id, no controller

  // Criando um tutorial
  router.post("/", tutoriais.criar);  

  // Pegando todos os tutoriais
  router.get("/", tutoriais.encontrarTodos);

  // Pegando todos os tutoriais publicados
  router.get("/published", tutoriais.encontrarTodosOsPublicados);

  // Pegar todos os elementos baseados em ID
  router.get("/:id", tutoriais.encontrarUm);

  // Atualizar tutorial baseado em ID
  router.put("/:id", tutoriais.atualizar);

  // Deletar tutorial baseado em ID
  router.delete("/:id", tutoriais.delete);

  // Deletar todos os tutoriais
  router.delete("/", tutoriais.deleteTodos);

  // Definindo que qualquer request para '/api/tutoriais' sera tratado pelo ROUTER
  app.use('/api/tutoriais', router);
};