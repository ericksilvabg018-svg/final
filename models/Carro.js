import conexao from "../config/conexao.js";
const CarroSchema = new conexao.Schema({
  nomeDoCarro: { type: String,required: true},
  marca: {type: String,required: true},
  anoDeFabricacao:{type:Number, required:false},
  peso:{type:Number, required:false},
  anoDoModelo:{type:Number, required:false},
  motorização:{type:Number,required:false},
  descricao:{type:String,required:false}
  
});
const Carro = 
conexao.model("Carro", CarroSchema);
export default Carro;