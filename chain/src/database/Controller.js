//Constantes
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const models=require('../../models');
const { useReducer } = require('react');

const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let usuario=models.Usuario;
let categoria=models.Categoria;
let link=models.Link;

//Verifica se o usuário e a senha estão corretos
app.post('/login', async (req, res) => {
    let response = await usuario.findOne({
        where: {name: req.body.user, password: req.body.password}
    })
    if (response === null){
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }
});

//Verifica se há um usuário com o mesmo email no banco
app.post('/register', async (req, res) => {
    let email = await usuario.findOne({
        where: {email: req.body.email}
    })
    let user = await usuario.findOne({
        where: {name: req.body.user}
    })
    if (email == null && user == null ){
        console.log("Não há usuário igual")
        res.send(JSON.stringify('nao'));
    } else {
        console.log("Há usuário igual")
        res.send(JSON.stringify('tem'));
    }
});

//Cria o usuário no banco
app.post('/createUser', async (req, res) => {
    let create= await usuario.create({
    name: req.body.user,
    email: req.body.email,
    password: req.body.password
    })
    res.send(JSON.stringify('Novo usuario criado'));
})

//Faz um select das categorias do usuário
app.post('/slctCategories', async (req, res) => {
    let select = await categoria.findAll({
        where: {userName: req.body.user}
    })
    res.send(select)
    console.log(JSON.stringify("Categorias encontradas"))
})

//Cria uma nova categoria no banco
app.post('/crtCategories', async (req, res) => {
    let create = await categoria.create({
        userName: req.body.user,
        category: req.body.category,
        color: req.body.color
    })
    res.send(JSON.stringify('Nova categoria criada'));
})


//Verifica se o usuário já criou a categoria
app.post('/chckCategories', async (req, res) => {
    let response = await categoria.findOne({
        where: {userName: req.body.user, category: req.body.category}
    })
    if (response === null){
        console.log(JSON.stringify("Não há categoria"))
        res.send(JSON.stringify('nao'));
    } else {
        console.log(JSON.stringify("Há categoria"))
        res.send(JSON.stringify("tem"));
    }
});

app.post('/dltCategories', async (req, res) => {
    let deletar = await categoria.destroy({
        where: {userName: req.body.user, category: req.body.category}
    })
})

//Faz um select dos links do usuário
app.post('/slctLink', async (req, res) => {
    let select = await link.findAll({
        where: {userName: req.body.user}
    })
    res.send(select)
    console.log(JSON.stringify("Links encontrados"))
})

//Cria uma nova categoria no banco
app.post('/crtLink', async (req, res) => {
    let create = await link.create({
        userName: req.body.user,
        title: req.body.title,
        link: req.body.link,
        categories: req.body.category,
    })
    res.send(JSON.stringify('Novo link criado'));
})

//Verifica se o usuário já criou a categoria
app.post('/chckLink', async (req, res) => {
    let response = await link.findOne({
        where: {userName: req.body.user, link: req.body.link}
    })
    if (response === null){ 
        console.log(JSON.stringify("Não há link"))
        res.send(JSON.stringify('error'));
    } else {
        console.log(JSON.stringify("Há link"))
        res.send(response);
    }
});

//Deletar link pelo nome de usuário recebido
app.post('/updtLink', async (req, res) => {
    let update = await link.findOne({
        where: {userName: req.body.user, link: req.body.link}
    }).then((response) => {
        let newCategory = response.categories.split(",")
        const index = newCategory.indexOf(req.body.category)
        if (index > -1) {
            newCategory.splice(index, 1);
        }
        newCategory = newCategory.join(" ");
        response.categories = newCategory;
        response.save();
    })
})

//Deletar todos os links de uma categoria
app.post('/dltLinkByUser', async (req, res) => {
    let deletar = await link.destroy({
        where: {userName: req.body.user, link: req.body.link}
    })
})

//Remove a categoria pedida dos links com mais de 1 categoria
app.post('/dltLinkByCategory', async (req, res) => {
    let deletar = await link.destroy({
        where: {categories: req.body.category}
    })
})

let port = process.env.PORT || 3000;
app.listen(port,(req, res) => {
    console.log("Servidor conectado");
})