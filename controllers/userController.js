var ac = require('./authenticationController');
var qc = require('./questionController');

module.exports = {

  login: function(req, res, next){
    ac.login(req, function(flag){
      if (flag){
        res.render("index")
      } else {
        res.render("login", {msg:"Incorrect username or password!"})
      }
    })
  },

  logout: function(req, res, next){
    ac.logout(req, function(){
      res.render("login", {msg:""})
    })
  },

  checkLoginStatus: function(req, res, next){
    ac.loginStatus(req, function(username){
      if (username == ""){
        res.render("login", {msg:""})
      } else {
        res.render("index")
      }
    })
  },

  updateStatus: function(req, res, next){
    res.json({})
  },

  practice: function(req, res, next){

  },

  invite: function(req, res, next){

  },

  play: function(req, res, next){

  },

  playStatus: function(req, res, next){

  }

}
