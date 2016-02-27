var routes = {}

routes.home = function(req, res){
  res.sendfile("./public/index.html")
}

module.exports = routes;
