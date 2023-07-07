import express from 'express'
import cors from 'cors'
import knex from 'knex'
import bcrypt from 'bcrypt-nodejs'
import 'dotenv/config'

/* CONTROLLERS */
import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import handleProfile from './controllers/profile.js'
import handleImage from './controllers/image.js'

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
})

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: '*',
  })
)

app.get('/', (req, res) => {
  res.json('welcome to smart brain api')
})

app.post('/signin', (req, res) => {
  handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  handleProfile(req, res)
})

app.put('/image', (req, res) => {
  handleImage(req, res, db)
})

app.listen(process.env.PORT, () => console.log('app is running on port 3000'))

/*
    / --> res = this is working
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT --> user 
 */
