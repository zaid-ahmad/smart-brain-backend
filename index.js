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
  connection: process.env.DATABASE_URL,
})

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json('welcome to smart brain api')
})

app.post('/signin', (req, res) => {
  handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
  console.log(req.body)
  handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  handleProfile(req, res)
})

app.put('/image', (req, res) => {
  handleImage(req, res, db)
})

app.listen(port, () => console.log(`app is running on port ${port}`))

/*
    / --> res = this is working
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT --> user 
 */
