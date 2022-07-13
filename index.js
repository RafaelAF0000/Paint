const app = require("./config/server.js")
const conexaoDb = require("./config/conexaoDb.js")
const con = conexaoDb()

const praticar = require("./routers/praticar.js")
praticar(app, con)

////////////////////////////////
app.listen("8000", () => {
    console.log("Servidor up")
})