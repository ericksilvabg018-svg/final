import conexao from "../config/conexao.js";
const MecanicoSchema = new conexao.Schema({
  nome: { type: String,required: true},
  idade: {type: Number,required: false},
  experiencia: {type: Number,required: true}
});
const Mecanico = 
conexao.model("Mecanico", MecanicoSchema);
export default Mecanico;