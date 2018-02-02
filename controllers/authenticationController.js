var users = require("../data/users.json")

module.exports = {

  login: function(req, cb){
    for (var i=0; i<users.length; i++){
      if (req.body.username==users[i].username && req.body.password==users[i].password){
        req.session.user = users[i].username
        cb(true)
      }
    }
    cb(false)
  },

  logout: function(req, cb){
		req.session.user = undefined
		req.session.destroy()
		cb()
	},

  loginStatus: function(req, cb){
		if (req.session && req.session.user){
			cb(req.session.user)
		} else {
			cb("")
		}
	},

  checkLoginStatus: function(req, res, next){
		if (req.session && req.session.user){
			next()
		} else {
			res.redirect('/')
		}
	},

}
