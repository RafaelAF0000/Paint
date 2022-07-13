const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const session = require("express-session")

//////////////
app.set("view engine", "ejs")
app.set("views","./views")
app.use(express.static("./public"))
app.use(bodyParser.urlencoded({extended : true}))
app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized: true
}));

module.exports = app