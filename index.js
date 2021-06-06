const express = require("express");
const app = express() // initialising express as app
const bodyParser = require("body-parser"); // initalizing body parser
const { render } = require("ejs");

const date = require(__dirname + "/date.js");




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



let items = [];

let workItems = [];



app.set('view engine', 'ejs'); // helps view the various ejs files on the view folder

app.get("/", (req, res) => {


    let day = date();
    res.render("list", {
        listOfTitle: day,
        newListItem: items
    });
});

app.post("/", (req, res) => {

    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");

    } else {
        items.push(item);
        res.redirect("/");
    }



});

app.get("/work", (req, res) => {
    res.render("list", {
        listOfTitle: "work list",
        newListItem: workItems,
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});


app.listen(3000, () => {
    console.log("Server is running at local port 3000...");
})

// app.post("/work", () => {
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work")
// });