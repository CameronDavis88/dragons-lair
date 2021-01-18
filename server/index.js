require('dotenv').config()
const express = require('express')
  const   session = require('express-session')
   const  massive = require('massive')
   const authCtrl = require('./controllers/authController')


    const port = 4000
    const app = express()
    app.use(express.json())
const {CONNECTION_STRING, SESSION_SECRET}  = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  })
  .then(db => {
    app.set('db', db);
    console.log('db connected')
  }).catch(err => console.log(err))

  app.use(
    session({
      resave: true,
      saveUninitialized: false,
      secret: SESSION_SECRET,
    })
  );
  app.post('/auth/register', authCtrl.register);


  

    app.listen(port, ( ) => console.log(`Listening on port: ${port}`))
