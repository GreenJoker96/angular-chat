module.exports = (app) => {
    // Put any non-specific routes here
    /**
     * When the app is loaded send the index
     *
     * @param req
     * @param res
     *
     */
    app.get('/', function (req, res) {
        res.render('index');
    });
};