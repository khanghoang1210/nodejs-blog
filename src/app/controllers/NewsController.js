class NewsController{
    // GET/news
    index(req, res) {
        res.render('news');
    }
    //Get/news/:slug(biến động)
    show() {
        res.send
    }
}
module.exports = new NewsController;