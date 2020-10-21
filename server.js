// Dependencies
var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Reservation Data and Variables
var waitList = [];

var tables = [
    //indvidual array information will go into here 
    {
        name: "name", 
        phoneNum: "123456789",
        email: "email",
        id: "ID"
    }
];

// Routes

// / takes us to the home page 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

// /make will take us to the Make.html , make a reservation page 
app.get("/make", function(req, res) {
    res.sendFile(path.join(__dirname, "Make.html"))
})

// /tables will take us to the tables.html where we see all reservations and waitlist
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"))
})

// api route to store the json of all reservations in the tables array 
app.get("/api/tables", function(req, res){
    res.json(tables);
})

// api route to store the json of all reservations in the waitlist array 
app.get("/api/waitlist", function(req, res) {
    res.json(waitList);
})

// this is adding the newTable element to ethier the tables or waitlist array every time the route is sent a POST request
app.post("/api/tables", function(req, res) {
    console.log(req.body)
    if (tables.length < 5) {
        tables.push(req.body);
        return res.json(true);
    } else {
        waitList.push(req.body);
        return res.json(false);
    }
})



app.listen(PORT, function() {
    console.log("App listening on PORT, http://localhost:" + PORT);
  });