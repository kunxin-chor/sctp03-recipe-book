const express = require('express');
const hbs = require('hbs');

const app = express();

// inform express that we are using hbs as the template engine
app.set('view engine', 'hbs');

// enable express to use static files
// the first parameter is the folder to put all the static files
app.use(express.static('public'));

// enable processing forms by express
// now express is able to process forms submitted by browsers
app.use(express.urlencoded());

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

// one route will be used for displaying the form
app.get('/food-sighting/create', function(req,res){
    res.render('create-food-sighting');
})

app.post('/food-sighting/create', function(req,res){
    console.log(req.body);

    // for ingredients, if there's none selected => []
    // if one selected => [ "meat" ]
    //  if many selected => [ "meat", "seafood"]

    // let title = req.body.title;
    // let location = req.body.location;
    // let cuisine = req.body.cuisine;
    let {title, location, cuisine} = req.body;

    let ingredients = req.body.ingredients;
    if (ingredients) {
        if (!Array.isArray(ingredients)) {
            //if ingredients is not an array and is not undefined
            // then it has to be a string
            ingredients = [ ingredients ];
        }
    } else {
        ingredients = [];
    }
    console.log(ingredients);

    // todo: insert the food sighting into the database
    // example: 
    // await db.collection("food_sightings").insertOne({
    //     title, location, cuisine, ingredients
    // })

    res.send("form recieved");
})

app.listen(3000, function(){
    console.log("server has started");
});