module.exports = (app, con) => {

    app.get("/praticar", (req, res) => {
        res.render("desenhar.ejs")
    })
    
}