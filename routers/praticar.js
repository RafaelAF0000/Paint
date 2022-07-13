
module.exports = (app) => {
    app.get("/praticar", (req, res) => {
        res.render("desenhar.ejs")
    })
}