require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

const userRouter=require('./users');

app.use(cors())
app.use(express.json())

  app.use('/',userRouter);



app.get('/', (req, res) => {
    res.send({status:true,text:'Empower Rise Website Running!'});
})

app.listen(port, () => {
    console.log(`Empower Rise Website listening on port ${port}`)
})
