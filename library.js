'use strict';

var async =  module.parent.require('async'),
fs = require('fs'),
path = require('path'),
templates = module.parent.require('templates.js'),
db = require.main.require('./src/database'),
util = require("util"),
players = [],
_ = require('lodash'),
app;

var Widget = {
	templates: {}
};

Widget.init = function(params, callback) {
  console.log('[' + new Date().toISOString() + '][BFSTATS] 🔫 WIDGET INIT')
  app = params.app;
  var templatesToLoad = [
    'widget.tpl',
    'bfstats.tpl'
  ];

  function loadTemplate(template, next){
    fs.readFile(path.resolve(__dirname,'./public/templates/' + template), function(err,data){
      if(err){
        console.log('[' + new Date().toISOString() + '][BFSTATS] 🔫 ' + err.message);
        return next(err);
      }
      Widget.templates[template] = data.toString();
      next(null);
    });
  }

  async.each(templatesToLoad, loadTemplate);

  callback();
};

Widget.renderBFStatsWidget = function(widget, callback) {
  var lookup_keys = []
  var players = []

  async.waterfall([
    function(callback){
			db.getSortedSetRangeWithScores('username:uid',0,-1,function(err,res){
				var results = res
				results.forEach(function(u){
					lookup_keys.push('user:' + u.score + ':bfstats')
				})
				callback()
			})
    },
		function(callback){
			db.getObjects(lookup_keys,function(err, results){
				results.forEach(function(u){
					if(typeof u !== 'undefined'){
						var player = {}
						player.username = u.username
						player.picture = u.picture

						if(!widget.data.hasOwnProperty('bf4')){
							//calc bf1
							player.timePlayed = Math.floor(u.bf1stats.timePlayed / 3600 ) + ' h ' + Math.floor((u.bf1stats.timePlayed % 3600) / 60) + ' m'
							player.kills = u.bf1stats.kills
							player.wins = u.bf1stats.wins
							player.deaths = u.bf1stats.deaths
							player.spm = u.bf1stats.spm
							player.skill = u.bf1stats.skill
							player.kpm = u.bf1stats.kpm
							player.losses = u.bf1stats.losses
							player.kd = u.bf1stats.deaths > 0 ? parseFloat( (u.bf1stats.kills / u.bf1stats.deaths).toFixed(2) ): u.bf1stats.kills
							player.rank = u.bf1stats.rank
						}
						else{
							//calb bf4
							player.timePlayed = Math.floor(u.bf4stats.timePlayed / 3600 ) + ' h ' + Math.floor((u.bf4stats.timePlayed % 3600) / 60) + ' m'
							player.kills = u.bf4stats.kills
							player.wins = u.bf4stats.wins
							player.deaths = u.bf4stats.deaths
							player.spm = u.bf4stats.spm
							player.skill = u.bf4stats.skill
							player.kpm = u.bf4stats.kpm
							player.losses = u.bf4stats.losses
							player.kd = u.bf4stats.deaths > 0 ? parseFloat( (u.bf4stats.kills / u.bf4stats.deaths).toFixed(2) ) : u.bf4stats.kills
							player.rank = u.bf4stats.rank
						}
						players.push(player)
					}
				})
				callback()
			})
		}
  ],function(err,result){
		var rep = {
			'players': _.orderBy(players,['kd','skill'],['desc','desc'])
		};
		// console.dir(JSON.stringify(rep.players))

	  var pre = ""+fs.readFileSync(path.resolve(__dirname,'./public/templates/bfstats.tpl'));
		widget.html = templates.parse(pre, rep)
		// callback(null, templates.parse(pre, rep));
		// console.log(widget.data)
		callback(null, widget);
  })
};

Widget.defineWidgets = function(widgets, callback) {
  widgets = widgets.concat([
  		{
  			widget: "bfstats-vrk",
  			name: "bfstats-vrk",
  			description: "description",
  			content: Widget.templates['widget.tpl']
  		}
  	]);
    callback(null, widgets);
};

module.exports = Widget;
