import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { MongoClient } from 'mongodb';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import jwt from 'jsonwebtoken'; 
const secret = 'asdfjkjlj3453';

const corsOptions = {
    credentials:true, 
    origin: ['http://localhost:5173'], 
    methods: ["POST", "GET", "PUT"]
}
const app = express()
app.use(cors(corsOptions))
app.use(express.json())
const CONNECTION_STRING="mongodb+srv://cars:K1rJ8piRkt6UVLqh@cluster0.57lvsy8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASENAME="user";

MongoClient.connect(CONNECTION_STRING)
.then(client=>{
    console.log("Connected to MongoDB")
    app.listen(3000, ()=>{
        console.log("Listning!")
    })

    const database = client.db(DATABASENAME);
    const usercollection = database.collection('usercollection')

    app.post('/usersignup', async(req,res)=>{
        const {username, password} = req.body
        
        try{const userDoc = await usercollection.insertOne({
            username, password : bcrypt.hashSync(password, salt),
        })
        jwt.sign({username, id: userDoc._id},
            secret,
            {},
            (err, token)=>{
                if(err) throw err
                res.cookie('token', token.json({
                    id: userDoc._id,
                    username
                }))
            })
        res.json(userDoc)
        }catch(e){
                res.status(400).json(e)
            }
    })

    app.post('/userlogin', async(req,res)=>{
        const {username, password} = req.body
        try{
        const userDoc = await usercollection.findOne({username})
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(passOk){
        jwt.sign(
            {username, id:userDoc._id}, //payload
            secret, 
            {},   
            (err, token)=>{ 
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            })
        })
        }
        // res.json(userDoc)
        }catch(e){
            res.status(500).json(e)
        }
    })

})





// K1rJ8piRkt6UVLqh
// cars
// mongodb+srv://cars:K1rJ8piRkt6UVLqh@cluster0.57lvsy8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0