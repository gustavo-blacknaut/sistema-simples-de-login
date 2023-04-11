const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const SimplDB = require('simpl.db');
const db = new SimplDB();

const api = express();
api.use(bodyParser.json());
api.use(express.static('static'));
api.use(express.urlencoded({ extended: false }));
api.set('view engine', 'ejs');
api.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
}))

api.get('/', (req, res) => {
  res.render('index');
})

api.post('/', (req,res) => {
  if(db.has(`${req.body.user}`) === false) return res.render('erroraccount')

  if(req.body.senha === db.get(`${req.body.user}`)) res.render('sucess')
  else res.render('error');
})

api.get('/register', (req, res) => {
  res.render('register');
})

api.post('/register', (req,res) => {
  if(db.has(`${req.body.user}`) === true) return res.render('contajaexiste');
  db.set(`${req.body.user}`, `${req.body.senha}`)
  return res.render('sucessregister');
})

api.listen(3000, async() => console.log(`http://localhost:3000`))