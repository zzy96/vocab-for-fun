var fs = require('fs');
var path = require('path');

var ac = require('./authenticationController');
var qc = require('./questionController');
var status = {
  "zzy":{"timestamp":0,"isBusy":false,"gameRoomTimestamp":0},
  "xly":{"timestamp":0,"isBusy":false,"gameRoomTimestamp":0}
};
var games = {
  "zzy":{
    "playerA":"zzy",
    "playerB":"",
    "playerATimestamp":0,
    "playerBTimestamp":0,
    "playerAReady":false,
    "playerBReady":false,
    "playerAProgress":[],
    "playerBProgress":[],
    "questions":[]
  },
  "xly":{
    "playerA":"xly",
    "playerB":"",
    "playerATimestamp":0,
    "playerBTimestamp":0,
    "playerAReady":false,
    "playerBReady":false,
    "playerAProgress":[],
    "playerBProgress":[],
    "questions":[]
  }
};

module.exports = {

  login: function(req, res, next){
    ac.login(req, function(flag){
      if (flag){
        var profile = require('../data/users/'+req.body.username)
        res.render("index", {user:profile})
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
        res.render("index", {user:profile})
      }
    })
  },

  updateStatus: function(req, res, next){
    ac.loginStatus(req, function(username){
      if (username == ""){
        res.json({})
      } else {
        var profile = require('../data/users/'+username)
        status[username].timestamp = Date.now()
        status[username].isBusy = req.body.isBusy
        res.json(status)
      }
    })
  },

  practice: function(req, res, next){
    res.render("practice")
  },

  questions: function(req, res, next){
    res.json(qc.generateN(req.params.n))
  },

  play: function(req, res, next){
    ac.loginStatus(req, function(username){
      if (username == ""){
        res.redirect("/")
      } else {
        if (username == req.params.username){
          games[req.params.username].playerATimestamp = Date.now()
        } else {
          games[req.params.username].playerB = username
          games[req.params.username].playerBTimestamp = Date.now()
        }
        res.render("play", {"home":req.params.username, "username":username, "game":games[req.params.username]})
      }
    })
  },

  playStatus: function(req, res, next){
    ac.loginStatus(req, function(username){
      if (username == ""){
        res.redirect("/")
      } else {
        if (username == req.params.username){
          games[req.params.username].playerATimestamp = Date.now()
          games[req.params.username].playerAReady = req.body.isReady
          games[req.params.username].playerAProgress = req.body.progress
        } else {
          games[req.params.username].playerB = username
          games[req.params.username].playerBTimestamp = Date.now()
          games[req.params.username].playerBReady = req.body.isReady
          games[req.params.username].playerBProgress = req.body.progress
        }
        status[req.params.username].gameRoomTimestamp = Date.now()
        status[username].timestamp = Date.now()
        status[username].isBusy = true
        res.json(games[req.params.username])
      }
    })
  }

}
