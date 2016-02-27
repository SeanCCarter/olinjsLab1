var routes = {}

routes.home = function(req, res){
  res.sendfile("./routes/index.html")
}

module.exports = routes;
