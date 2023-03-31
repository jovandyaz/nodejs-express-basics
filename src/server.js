require('dotenv').config();
require("ejs");
const express = require("express");
const path = require('path');
// const { fileURLToPath } = require("url");
const morgan = require("morgan");
const connectDB = require('./db');
const HomeRoutes = require('./routes/home');
const UsersRoutes = require('./routes/users');

connectDB();

const app = express();
const port = process.env.PORT || 3000;
// const currentDir = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

/* SETTINGS */

app.set('appName', 'Express Basics');
app.set('altPort', 4200);

/* EJS */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* MIDDLEWARES */

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     console.log("🚀 ~ req.url:", req.url)
//     console.log("🚀 ~ req.method:", req.method)
//     console.log('This is a middleware fn (using next parameter)')
//     next()
// })

// app.use((req, res, next) => {
//     if (req.query.login === 'thejam_17@hotmail.com') next()
//     else res.send('User no authorized')
// })

/* THIRD PARTY MIDDLEWARES */

app.use(morgan('dev'));

// Set MIME type for CSS file
app.get('/public/style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, '/public/style.css'));
  });

/* ROUTES */
app.use(HomeRoutes);
app.use(UsersRoutes);

/* METHODS */

app.get('/', (req, res) => {
    // res.sendFile('./public/index.html', { root: currentDir });
    res.send('Hey world!')
});

app.get('/products', (req, res) => {
    res.send('Getting products');
});

// app.post('/products', (req, res) => {
//     res.send('Posting product')
// })

// app.put('/products', (req, res) => {
//     res.send('Updating product')
// })

app.all('/allmethod', (req, res) => {
    res.send('All method');
});

/* PARAMS */

app.get('/params/:user', (req, res) => {
    console.log(req.params)
    const { user } = req.params
    res.send(`Getting user: ${user.toUpperCase()}`)
})

app.get('/params/:photo/photo', (req, res) => {
    const { photo } = req.params
    console.log("🚀 ~ file: index.js:73 ~ app.get ~ photo:", photo)
    if (photo === 'pathfinder') return res.sendFile('./images/pathfinder.png', { root: currentDir })
    res.send('User doesnt have photo')
})

/* QUERIES */

app.get('/queries/:query', (req, res) => {
    // http://localhost:3000/queries/a?user=jhon&id=123
    console.log(req.query)
    const { user, id } = req.query
    res.send(`Getting user: ${user} - ${id}`)
})

// app.use((req, res) => {
//     res.status(404).send('There is not such page');
// });

app.listen(port, () => console.log(`Running server on port ${port}. App: ${app.get('appName')}. Alt Port: ${app.get('altPort')}`));