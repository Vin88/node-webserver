const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set("view engine", "hbs");
//Setup middleware
app.use(express.static(__dirname+'/public'));

//Registering Middleware
app.use((req, res, next) => {
    let _date = new Date().toString();
    console.log(_date);
    fs.appendFile("server.log", _date + "\n", (err) => {
        if(err){
            console.log(err);
        }
    });
    next();
});

app.get("/", (req, res) => {
    // res.send("Happy World");
    res.render('home.hbs', {
        pageTitle: "Home Page !!!",
        welcomeMsg: "WElcome to the world !!!"
    });
});
app.get("/userInfo", (req, res) => {
    res.send({
        name: "Vinothini",
        work: "Senior Software Engg"
    });
});
app.get("/about", (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page !!!"
    });
});
app.get("/projects", (req, res) => {
    res.render('projects.hbs', {
        pageTitle: "Projects"
    });
});
//HBS Helper functions
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.listen(PORT, () => {
    console.log("Server is up on port 3000");
});