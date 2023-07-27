const express = require("express");
// import express from "express";
const bodyParser = require("body-parser");

const app = express();

var items =[];
var workitems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    var today = new Date();

    var options = {
        weekday : "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-IN", options);

    res.render("list", {
         listtitle: day,
         newlistitems: items
        });

});

app.post("/",function (req,res) {
    let item = req.body.newitem;

    if(req.body.list === "work")
    {
        workitems.push(items);
        res.redirect("/work");
    }
    else
    {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",function (req,res) {
    res.render("list", {listtitle: "Work list", newlistitems: workitems});    
});

app.post("/work", function (req, res) {
    let item = req.body.newitem;
    workitems.push(item);
    res.redirect("/work");
});

app.listen(3000, function () {
    console.log("Server started on port 3000.");
});

