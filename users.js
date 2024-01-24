const { ObjectId } = require('mongodb');
const client = require('./client');
const express = require('express');
const userRouter = express.Router();
 function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
         client.connect();
        const usersCollection = client.db('empowerRise').collection('logInUsers');

        userRouter.route('/login')
        .post(async(req,res)=>{
        try {
        const email = req.body.email;
        const password = req.body.password;
        const findUser = await usersCollection.findOne({email});
        if(findUser){
            res.send(false);
        } else {
           await usersCollection.insertOne({email,password});
           console.log("User registered successfully");
           res.send(true);
        }
        } catch (error) {
        console.error("Error inserting login data:", error.message);
        }
        })

        userRouter.route('/users')
        .post(async(req,res) => {
          try {
            const user = req.body;
          await usersCollection.insertOne(user); 
          res.send(true)
          } catch (error) {
            console.log(error);
          }
        })

        userRouter.route('/getUser')
        .post(async(req,res) =>{
            try{
                const email = req.body.email;
                const password = req.body.password;
                const user =  usersCollection.findOne({email});
                res.send(user);
            } catch(error){
                console.log('Internal Server Errors',error.message);
            }
        })
     
        // Send a ping to confirm a successful connection
         client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);
module.exports = userRouter;
