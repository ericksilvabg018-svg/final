import conexao from "../config/conexao.js";
const CategoriaSchema = new conexao.Schema({
  nome: { type: String,required: true},
  descricao: {type: String,required: true},
  foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
    }
})

  

const Categoria = 
conexao.model("Categoria", CategoriaSchema);
export default Categoria;