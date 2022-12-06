const express = require('express')
const {Router} = require ('express')
const { engine } = require ('express-handlebars')
const app = express()
const api = Router()
api.use(express.json())
api.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use('/api',api)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', './views')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
//-------------------------------------------------------


api.use(session({
    /* ----------------------------------------------------- */
    /*           Persistencia por redis database             */
    /* ----------------------------------------------------- */
    store: MongoStore.create({
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb+srv://eze:floki123@cluster0.4j7mzjp.mongodb.net/?retryWrites=true&w=majority'
        ,mongoOptions: advancedOptions
    }),
    /* ----------------------------------------------------- */

    secret: 'secretum',
    resave: false,
    saveUninitialized: false/* ,
    cookie: {
        maxAge: 40000
    } */
}))


let productos = []

api.post('/formularios',(req,res)=>{
   req.session.usuario = req.body
    res.redirect('/api/formulario')
    console.log(req.session.usuario)
    


})

api.get('/Productos',(req,res)=>{
   res.render('listado',{productos})
   
})

api.post('/productos',(req,res)=>{
     let id = productos.length + 1
     req.body.id = id
     productos.push(req.body)
    let prod = req.body
     res.render('productos',{ prod })
  

})    

 api.get('/formulario',(req,res)=>{
    let usuario = req.session.usuario
    res.render('formulario',{usuario})
    
})



const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
