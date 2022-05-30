function Mock(app) {
    app.get('/some/path', function(req, res) {
        res.json({ custom: "response" });
    });
}
  
module.exports = Mock;