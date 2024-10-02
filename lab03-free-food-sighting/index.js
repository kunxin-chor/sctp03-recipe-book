const express = require('express');
const hbs = require('hbs');

const app = express();

// inform express that we are using hbs as the template engine
app.set('view engine', 'hbs');

// enable express to use static files
// the first parameter is the folder to put all the static files
app.use(express.static('public'));

// routes
app.get('/', function(req,res){
    // res.send can be used to send back HTML
    res.send("<h1>Free Food Sighting Website</h1>")
})

app.get('/about-us', function(req,res){
   
    let todayDate = new Date();
   
    // res.render will send back the content of a .hbs file
    // the first paramter is the file path RELATIVE to /views folder
    // the second parameter allows us define placeholders in the hbs file
    res.render("index", {
        "date": todayDate
    });
})

app.get('/lucky', function(req,res){
    let number = Math.floor(Math.random() * 9999 + 999);
    res.send("<h1>Your lucky number is " + number +"</h1>");
})

app.listen(3000, function(){
    console.log("server has started");
});