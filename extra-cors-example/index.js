// 1. SETUP EXPRESS
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // enable cross origin resources sharing

// 1b. enable JSON processing (i.e allow clients to send JSON data to our server)
app.use(express.json());

app.get("/foobar", function(req,res){
    res.json({
        "message":"hello"
    })
})

// 3. START SERVER (Don't put any routes after this line)
app.listen(3000, function () {
    console.log("Server has started");
})