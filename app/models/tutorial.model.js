module.exports = mongoose => {      // Iremos exportar todo o conteudo desta página
// Criando um mongoose MODEL para os tutoriais
    const Tutorial = mongoose.model(
      //Essa sera a collection em que iremos salvar no Mongoose
      "tutorial", //No caso sera salva como tutorials, pois o mongoose autoaticamente coloca no plural
      mongoose.Schema(
        {
          titulo: String,
          descricao: String,  //SCHEMA DO MODEL
          publicado: Boolean
        },
        { timestamps: true }  //TIMESTAMPS true irão criar os atributos CreatedAt e MofifiedAt nos RECORDS criados
      )
    );
  
    return Tutorial;
  };