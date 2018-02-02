var fs = require('fs');
var path = require('path');

var ac = require('./authenticationController');
var qc = require('./questionController');
var status = {
  "zzy":{},
  "xly":{}
};
/* status template
  {"zzy":{"timestamp":1517567390821,"isBusy":false}}
*/
var games = {};
/* game template, username is key/playerA
{
  "playerA":"",
  "playerB":"",
  "playerATimestamp":0,
  "playerBTimestamp":0,
  "playerAReady":false,
  "playerBReady":false,
  "playerAProgress":[],
  "playerBProgress":[],
  "questions":[]
}
*/

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
    res.render("play", {"username":req.params.username})
  },

  playStatus: function(req, res, next){

  }

}
