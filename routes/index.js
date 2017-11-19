var express = require('express');
var router = express.Router();
var config = require('./config');
var Twit = require('twit');

var T = new Twit(config);

    /* GET home page. */
router.get('/', async function(req, res, next) {
  var lists = [];
  var listRes = await T.get('lists/list');

  for(var index in listRes.data){
    var listMembersRes = await T.get('lists/members', {list_id: listRes.data[index].id_str});
    var memberNames = listMembersRes.data.users.map(function(user){
      return user.name;
    });
    
    var info = {
      listName: listMembersRes.data.name,
      members: memberNames 
    };

    lists.push(info);
  }


  res.render('index', { title: lists });
});

module.exports = router;
