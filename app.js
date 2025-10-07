const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const PORT = 3000;

app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
    res.render('home', { 
      title: 'Tu Lista de contactos', 
      description: 'Administra todos tus contactos en un solo lugar: agrega, edita y elimina contactos fácilmente.' 
    });
});    

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});