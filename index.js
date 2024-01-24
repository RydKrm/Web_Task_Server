require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

const userRouter=require('./users');

app.use(cors())
app.use(express.json())

  app.use('/api',userRouter);



app.get('/', (req, res) => {
    res.send({status:true,text:' Website Running!'});
})

app.listen(port, () => {
    console.log(` Website listening on port ${port}`)
})
