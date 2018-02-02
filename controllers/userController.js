var ac = require('./authenticationController');
var qc = require('./questionController');
var status = require('../data/status');
var invitations = require('../data/invitations');

module.exports = {

  login: function(req, res, next){
    ac.login(req, function(flag){
      if (flag){
        var profile = require('../data/users/'+req.body.username)
        res.render("index", {user: profile})
      } else {
        res.render("login", {msg:"Incorrect username or password!"})
      }
    })
  },

  logout: function(req, res, next){
    ac.logout(req, function(){
      res.redirect("/")
    })
  },

  checkLoginStatus: function(req, res, next){
    ac.loginStatus(req, function(username){
      if (username == ""){
        res.render("login", {msg:""})
      } else {
        var profile = require('../data/users/'+username)
        res.render("index", {user: profile})
      }
    })
  },

  updateStatus: function(req, res, next){
    res.json({})
  },

  practice: function(req, res, next){
    res.render("practice")
  },

  questions: function(req, res, next){
    res.json(qc.generateN(req.params.n))
  },

  invite: function(req, res, next){

  },

  play: function(req, res, next){
    res.render("play")
  },

  playStatus: function(req, res, next){

  }

}
