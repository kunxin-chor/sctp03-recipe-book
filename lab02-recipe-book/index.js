// 1. SETUP EXPRESS
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const dbname = "sctp05-recipes"; // CHANGE THIS TO YOUR ACTUAL DATABASE NAME

// enable dotenv (allow Express application to read .env files)
require('dotenv').config();

// set the mongoUri to be MONGO_URI from the .env file
// make sure to read data from process.env AFTER `require('dotenv').config()`
const mongoUri = process.env.MONGO_URI;

// 1a. create the app
const app = express();
app.use(cors()); // enable cross origin resources sharing

// 1b. enable JSON processing (i.e allow clients to send JSON data to our server)
app.use(express.json());

// uri = connection string
async function connect(uri, dbname) {
    // Create a Mongo Client
    // a client is a software or driver that allows us to communicate with a database
    // (i.e like the Mongo Shell)
    let client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    });
    let db = client.db(dbname); // same as  'USE <database>' in Mongo Shell
    return db;
}

 // 2. CREATE ROUTES
 // All routes will be created in the `main` function
async function main() {

    // connect to the mongo database
    let db = await connect(mongoUri, dbname);

    app.get('/', function (req, res) {
        res.json({
            "message": "Hello World!"
        });
    });


    // There's a convention for RESTFul API when it comes to writing the URL
    // The URL should function like a file path  (always a resource, a noun)
    app.get("/recipes", async function(req,res){
        try {
            // mongo shell: db.recipes.find({},{name:1, cuisine:1, tags:1, prepTime:1})
            let recipes = await db.collection("recipes").find()
                .project({
                    "name": 1,
                    "cuisine": 1,
                    "tags": 1,
                    "prepTime": `1`
                }).toArray();
            res.json({
                'recipes': recipes
            })
        } catch (error) {
            console.error("Error fetching recipes:", error);
            res.status(500);
        }
    })
}
main();


// 3. START SERVER (Don't put any routes after this line)
app.listen(3000, function () {
    console.log("Server has started");
})