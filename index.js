const app = require("./config/server.js")

const praticar = require("./routers/praticar.js")
praticar(app)

////////////////////////////////
app.listen("8000", () => {
    console.log("Servidor up")
})