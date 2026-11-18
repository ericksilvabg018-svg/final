import express from 'express'
const app = express();
const PORT = 3000;

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'))



import Categoria from './models/Categoria.js'
import Carro from './models/Carro.js'
import Mecanico from './models/Mecanico.js'

app.get('/', (req, res) => {
    //envio de informacao para o EJS
    res.render("index");
})

app.get('/carro/add', async (req, res) => {
  const categorias = await Categoria.find()
    res.render("carro/add", {categorias});
})

app.get('/carro', async (req, res) => {
    const carros = await Carro.find()
    res.render("carro/lst", {carros});
})

//Rota POST pra gravar no Banco de Dados
app.post('/carro/add',  async (req, res) => {
  const {nomeDoCarro,marca,anoDeFabricacao,peso,anoDoModelo,motorizacao,descricao} = req.body
  await Carro.create({nomeDoCarro,marca,anoDeFabricacao,peso,anoDoModelo,motorizacao,descricao})
  res.redirect("/carro")
})
app.get('/carro/upd/:id', async  (req, res) => {
  const carro = await Carro.findById(req.params.id)
  const categorias = await Categoria.find()
  res.render("carro/upd", {carro, categorias});
})

app.post('/carro/upd/:id',  async (req, res) => {
  const {nomeDoCarro,categoria,anoDeFabricacao,peso,tabelaFipe,motorizacao,descricao} = req.body
  await carro.findByIdAndUpdate(req.params.id, {nomeDoCarro,categoria,anoDeFabricacao,peso,tabelaFipe,motorizacao,descricao})
  //listar espécies
  const carros= await Carro.find()
  res.render("carro/lst", {carros});

})

app.get('/carro/del/:id',  async (req, res) => {
  await Carro.findByIdAndDelete(req.params.id)
  res.redirect("/carro")
})
  //rota para pesquisar instrumento por nome
app.post('/carro', async (req, res) => {
  const { pesquisar } = req.body;
  const carros = await Carro.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("carro", { carros });
})


app.get('/categoria',  async (req, res) => {
 //listar categorias
 const categorias = await Categoria.find()
 res.render("categoria/lst", {categorias});

})

app.get('/categoria/del/:id',  async (req, res) => {
  await Categoria.findByIdAndDelete(req.params.id)
 //listar espécies
 const categorias = await Categoria.find()
 res.render("categoria/lst", {categorias});

})
app.get('/categoria/upd/:id', async  (req, res) => {
  //buscar o registro que quero alterar
  const categoria = await Categoria.findById(req.params.id)
  res.render("categoria/upd", {categoria});
})

app.post('/categoria/upd/:id',  async (req, res) => {
  
  const {id,nome,descricao} = req.body
  await Categoria.findByIdAndUpdate(id, {nome,descricao})
  //listar espécies
  const categorias = await Categoria.find()
  res.render("categoria/lst", {categorias});

})

app.get('/categoria/add',  (req, res) => {
  res.render("categoria/add");
})
//Rota POST pra gravar no Banco de Dados
app.post('/categoria/add', upload.single('foto'),  async (req, res) => {
  const {nome,descricao} = req.body
  let foto = null 
  if(req.file) foto = req.file.buffer
  await Categoria.create({nome,descricao,foto})
  res.render("categoria/add");
  })
  //rota para pesquisar instrumento por nome
app.post('/categoria', async (req, res) => {
  const { pesquisar } = req.body;
  const categorias = await Categoria.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("categoria", { categorias });
})


app.get('/mecanico',  async (req, res) => {
 //listar mecanicos
 const mecanicos = await Mecanico.find()
 res.render("mecanico/lst", {mecanicos});

})

app.get('/mecanico/add',  (req, res) => {
  res.render("mecanico/add");
})
//Rota POST pra gravar no Banco de Dados
app.post('/mecanico/add',  async (req, res) => {
  const {nome,idade,experiencia} = req.body
  await Mecanico.create({nome,idade,experiencia})
  res.redirect("/mecanico");
})
 app.get('/mecanico/upd/:id', async  (req, res) => {
  const mecanico = await Mecanico.findById(req.params.id)
  res.render("mecanico/upd", {mecanico});
})
app.post('/mecanico/upd/:id',  async (req, res) => {
  const {nome,idade,experiencia} = req.body
  await Mecanico.findByIdAndUpdate(req.params.id, {nome,idade,experiencia})
  res.redirect("/mecanico");
})

app.get('/mecanico/del/:id',  async (req, res) => {
  await Mecanico.findByIdAndDelete(req.params.id)
 const mecanicos = await Mecanico.find()
 res.render("mecanico/lst", {mecanicos});
})


app.post('/mecanico', async (req, res) => {
  const { pesquisar } = req.body;
  const mecanicos = await Mecanico.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("mecanico", { mecanicos });
}) 

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
})