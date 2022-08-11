const express = require('express');
const handlebars = require('express-handlebars')
const app = express();
const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', './src/views/layouts');
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "",
        layoutsDir: __dirname + "src/views/partials"
    })
)

app.get('/', async (req,res) => {
    const producto = await contenedor.getAll();
    res.render('index', {
        list: producto,
        listExist: true,
        producto: true
    })
})

app.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll();
    res.render('productos',{
        titulo: "Productos varios",
        list: producto,
        producto:true
    })
})

app.post('/productos', async(req,res) => {
    const {body} = req;
    await contenedor.save(body);
    res.redirect('/productos');
})

const port = process.env.PORT || 8080
app.listen(port, err => {
	if (err) throw new Error(`Error al iniciar el servidor: ${err}`);
	console.log(`Server is running on port ${port}`);
});