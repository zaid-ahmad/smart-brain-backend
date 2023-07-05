import express from 'express'
import cors from 'cors'
import knex from 'knex'
import bcrypt from 'bcrypt-nodejs'

/* CONTROLLERS */
import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import handleProfile from './controllers/profile.js'
import handleImage from './controllers/image.js'

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'test',
    database: 'smart-brain',
  },
})

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', handleSignin(db, bcrypt))

app.post('/register', handleRegister(db, bcrypt))

app.get('/profile/:id', handleProfile())

app.put('/image', handleImage(db))

app.listen(3000, () => console.log('app is running on port 3000'))

/*
    / --> res = this is working
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT --> user 
 */
