const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./db_connection/user.js')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const dbConnection = require('./db_connection/db.js');

async function dbCollection() {
    const db = await dbConnection();
    const collectionData = db.collection('users');
    return collectionData;
}

//registratiom
app.post('/registration', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username);
        const collection = await dbCollection();
        const user = User({ username, password })

        const existingUserName = await collection.findOne({ username: { $eq: username } })
        if (existingUserName) {
            if (username === existingUserName.username) {
                res.status(200).json("Already username is there" )
            }
        } else {
            await collection.insertOne(user);
            // await user.save();
            res.status(200).json("Successful register" )
            console.log("Successful register")
        }

    } catch (error) {
        console.log(error);
    }
});

//login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = await dbConnection();
        const collection = db.collection('users');
        const existingUser = await collection.findOne({ username: { $eq: username } })
        if(!existingUser){
            res.status(200).json("username is not exist" )
        }else{
            if(existingUser.username === username && existingUser.password === password){
                res.status(200).json("succefully login");
            }else{
                res.status(200).json("username or password is invalid");
            }
        }
    } catch (error) {
        console.log(error);
    }
});

app.listen(8000, (req, res) => {
    console.log("Server Start");

})

app.get('/', (req, res) => {
    res.send("Hello");
})