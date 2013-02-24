var songPowers = [];

var song =  {
	getAttributes: function(fileName){
		var file = fileName;
		songData = "";
		function getData(file) {
			artist = ID3.getTag(file, "artist");
	 		title = ID3.getTag(file, "title");
	 		song = requestEchoData(artist, title);
	 		song = JSON.parse(song);
			id = song.response.songs[0].id;
			songData = getSongData(id);
		}
		ID3.loadTags(file, this.getData);
		return songData;
	},

	requestEchoData: function(artist, title){
		url = "http://developer.echonest.com/api/v4/song/search?api_key=G3SVBYIVLZTGEECOA&artist=" + artist + "&title=" + title;
		return $.ajax({
	        type: "GET",
	        url: url, 
	        async: false,
	    }).responseText;
	},

	getSongData: function(id){
		url = "http://developer.echonest.com/api/v4/song/profile?api_key=G3SVBYIVLZTGEECOA&id=" + id  + "&bucket=audio_summary";
		return $.ajax({
		    type: "GET",
		    url: url, 
		    async: false,
		}).responseText;
	}
};

var player = {
	powers: [],
	spriteFrontX: 0,
	spriteFrontY: 80,
	spriteRightX: 80,
	spriteRightY: 80,
	spriteLeftX: 270,
	spriteLeftY: 80,
	spriteBackX: 170,
	spriteBackY: 80,
	currX: 300,
	currY: 530,
	currBlock: {row: 1, col: 1},
	init: function(songs, name) { 

		console.log(songs);
		player.name = name;
		console.log(name);
		var power;
		for (var i = 0; i < songs.length; i++){
			var song = songs[i];
			if (!i){
				player.health = song.duration;
				player.speed = song.energy;
				player.defense = song.loudness;
				player.weakness = this.getWeakness(song.genre);
				player.initiative = song.tempo;
			}

			power = {};
			power.name = song.name;
			power.url = song.url;
			power.attack = song.danceability + Math.round(Math.random() * 100);
			power.type = song.genre;
			this.powers.push(power);
			var music_player = document.createElement("audio");
			$(music_player).appendTo(document.body);
			music_player.setAttribute('src',power.url);
			if (!i)
				music_player.play();

		}
		this.location = {x: 0, y: 0};
	},
	getWeakness: function(genre) {

		return "coldplay";

	},
	move: function(dir){

		if (this.board.battleState == true)
			return;

		var moved;
		switch(dir){
			case "r":
			moved = this.moveRight();
			break;
			case "l":
			moved = this.moveLeft();
			break;
			case "u":
			moved = this.moveUp();
			break;
			case "d":
			moved = this.moveDown();
			break;
		}

		if (moved)
			this.board.randomEctr();

	},
	moveRight: function() {
		var bd = this.board;
		if (bd.colission(this.currBlock, this.currX + 100, this.currY))
			return false;
		if (player.currX < 500){
			this.board.clear();
			player.currX += 100;
			bd.drawRoom(player.currBlock.row, player.currBlock.col);
			bd.ctx.drawImage(bd.sprite,player.spriteRightX,player.spriteRightY,bd.sd,bd.sd,player.currX,player.currY,bd.sd,bd.sd);
			return true;
		}
		else if (player.currBlock.col < 2){
			player.currBlock.col++;
			bd.drawRoom(player.currBlock.row, player.currBlock.col);
			player.currX = 0;
			bd.ctx.drawImage(bd.sprite,player.spriteRightX,player.spriteRightY,bd.sd,bd.sd,player.currX,player.currY,bd.sd,bd.sd);
			return true;
		}
			return false;
	},
	moveLeft: function() {

		var bd = this.board;
		if (bd.colission(this.currBlock, this.currX - 100, this.currY))
			return false;

		if (player.currX > 30){
			this.board.clear();
			bd.drawRoom(player.currBlock.row, player.currBlock.col);
			player.currX -= 100;
			bd.ctx.drawImage(bd.sprite,player.spriteLeftX,player.spriteLeftY,bd.sd,bd.sd,player.currX,player.currY,bd.sd,bd.sd);
			return true;
		}
		else if (player.currBlock.col > 0){
			player.currBlock.col--;
			bd.drawRoom(player.currBlock.row, player.currBlock.col);
			player.currX = 510;
			bd.ctx.drawImage(bd.sprite,player.spriteLeftX,player.spriteLeftY,bd.sd,bd.sd,player.currX,player.currY,bd.sd,bd.sd);
			return true;
		}	
		return false;
	},
	moveUp: function() {
		var bd = this.board;
		if (bd.colission(this.currBlock, this.currX, this.currY - 100))
			return false;

		if (player.currY > 30){
			this.board.clear();
			player.currY -= 100;
			bd.drawRoom(player.currBlock.row, player.currBlock.col);
			bd.ctx.drawImage(bd.sprite,player.spriteBackX,player.spriteBackY,bd.sd,bd.sd,player.currX,player.currY,bd.sd,bd.sd);
			return true;
		}
		else if (player.currBlock.row > 0){
			player.currBlock.row--;
			bd.drawRoom(player.currBlock.row, player.currBlock.col);
			player.currY = 530;
			bd.ctx.drawImage(bd.sprite,player.spriteBackX,player.spriteBackY,bd.sd,bd.sd,player.currX,player.currY,bd.sd,bd.sd);
			return true;
		}
		return false;
	},
	moveDown: function() {
		var bd = this.board;
		if (bd.colission(this.currBlock, this.currX, this.currY + 100))
			return false;

		if (player.currY <= 430){
			this.board.clear();
			bd.drawRoom(player.currBlock.row, player.currBlock.col);
			player.currY += 100;
			bd.ctx.drawImage(bd.sprite,player.spriteFrontX,player.spriteFrontY,bd.sd,bd.sd,player.currX,player.currY,bd.sd,bd.sd);
			return true;
		}
		else if (player.currBlock.row < 2){
			player.currBlock.row++;
			bd.drawRoom(player.currBlock.row, player.currBlock.col);
			player.currY = 30;
			bd.ctx.drawImage(bd.sprite,player.spriteFrontX,player.spriteFrontY,bd.sd,bd.sd,player.currX,player.currY,bd.sd,bd.sd);
			return true;	
		}
		return false;

	}
};

var board = {
	battleState: false,
	rooms: [
		[{},{},{}],
		[{},{},{}],
		[{},{},{}]
	],
	badGuys: [
		{songs: 
			[{name:"./I Want It That Way.mp3",damage:40}, 
			 {name: "./Meaning.mp3", damage: 50},
			 {name: "./Larger Than Life.mp3", damage: 30}], 
			 name: "Whackstreet Boy", x: 0, dialog: "I'm gonna make you pay!", health: 100, initiative: '.2'},
		{name: "Christina Gaggalera", x: 170, dialog: "Break a nail and DIE.", health: 170, initiative: '.1',
		songs: [{name:'./What A Girl Wants.mp3',damage: 80}, {name:'./Your Body.mp3',damage: 40}, {name:'./Genie In A Bottle.mp3', damage: 60}]
		},
		{name: "Justin Boober", x: 80, dialog: "I swear, I don't do drugs.", health: 260, initiative: '.7',
		songs: [{name:"./Boyfriend.mp3", damage: 75}, {name: "./Baby.mp3", damage: 50},{name:"./As Long As You Love Me.mp3",damage: 35}]
		},
		{name: "'N Stink", x: 420, dialog: "You'll have no strings attached when we're done!", health: 350, initiative: '1.2',
		songs: [{name: "./Digital.mp3", damage: 40}, {name:"./nostrings.mp3", damage: 30}, {name:"./Bye Bye Bye.mp3", damage: 100}]
		}
	],
	currBadguy: 0,
	init: function() { 
		var canvas = document.getElementById('echoWorld');
		var ctx = canvas.getContext('2d');
		this.canvas = canvas;
		this.canvas. width = canvas.width;
		this.ctx = ctx;
		//sprite dimension
		this.sd = 70;
		var sprite = new Image();
		var that = this;
		sprite.src = "images/sprite.png";
		this.sprite = sprite;
		sprite.onload = function() {
			ctx.drawImage(this,player.spriteBackX,player.spriteBackY,that.sd,that.sd,player.currX,player.currY,that.sd,that.sd);
		};
		this.initRooms(player);
		this.drawRoom(player.currBlock.row, player.currBlock.col);

	},
	clear: function() {

		this.canvas.width = this.canvas.width;
	},
	drawRoom: function(row, col){
		this.clear();
		var room = this.rooms[row][col];
		console.log(row,col);
		console.log(room);
		this.ctx.fillStyle = "#000";
		if (row == 1 && col == 1){
			this.ctx.globalAlpha = .7;
			var creep = new Image();
			creep.src = "images/milkyeway.jpeg";
			var that = this;
			creep.onload = function(){
				that.ctx.drawImage(creep, 0, 0,600,600,0,0,600,600);
			}
			console.log("center");
		}

		for (var i = 0; i < room.wall.length; i++){
			var w = room.wall[i];
			this.ctx.fillRect(w.x,w.y,w.width,w.height);
		}

	},
	initRooms: function(player) {
		for (var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){
				var room = this.rooms[i][j];
				room.wall = [];
				var width, height, xPos, yPos;
				for (var r = 0; r < Math.round(Math.random() * 7); r++) {
					width = Math.round((Math.random() * 400)/100)*100;
					height = Math.round((Math.random() * 400)/100)*100;
					xPos = Math.round((Math.random() * 400)/100)*100;
					yPos = Math.round((Math.random()* 400)/100)*100;
					room.wall[r] = {width: width, height:  height, x: xPos, y: yPos};
				}
			}
		}
	},
	randomEctr: function() {
		var n = Math.random() * 100;
		if (n < 45 && n > 40)
			this.battle();
	},
	battle: function() {
		this.drawBattle();
		this.battleState = true;
	},
	colission: function(walls, x, y) {
		walls = this.rooms[walls.row][walls.col].wall;
		console.log(walls,x,y);
		for (var w = 0; w < walls.length; w++){
			var wall = walls[w];
			if ((x >= wall.x && x <= wall.x + wall.width) && (y >= wall.y && y <= (wall.y+wall.height)))
				return false;
		}
	},
	drawBattle: function() {
		console.log(player);
		var BattleBar = "<ul class='ui-battle'>";
		for (var i = 0 ; i < player.powers.length; i++)
			BattleBar += "<li class='attack' data-power='" + i + "'>" + player.powers[i].name + "</li>";
		BattleBar += "</ul>";
		this.clear();
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0,0,600,600);
		$("#game-wrap").append(BattleBar);
		this.drawEnemy(this.currBadguy);
	},
	drawEnemy: function(enemyNum){

		var stats = this.badGuys[enemyNum];
		console.log(stats);
		if (enemyNum > 3)
			alert("You saved the lands from the throes of musical tyrants. Congratulations.");
		else if (enemyNum == 3)
			this.ctx.drawImage(this.sprite,stats.x,0,this.sd * 5,this.sd,140,40,this.sd * 5,this.sd);
		else
			this.ctx.drawImage(this.sprite,stats.x,0,this.sd,this.sd,140,40,this.sd,this.sd);

		$("#game-wrap").append("<p class='ui-dialog'>" + stats.name + ": " + stats.dialog + "</p>");
		$("#game-wrap").find('.ui-dialog').hide().fadeIn("slow").delay(2000).fadeOut("slow", function() {
			$(this).remove();
		});

		this.ctx.drawImage(this.sprite,player.spriteBackX,player.spriteBackY,this.sd,this.sd,30,530,this.sd,this.sd);
		var oldhealth = player.health;
		//true when player's turn
		if (stats.initiative > player.initiative){
			this.enemyAttack(stats);
		}

		player.health = oldhealth;
		console.log(player)
	},
	enemyAttack: function(stats) {
		console.log(stats);
		var rand_song = Math.round(Math.random() *3);
		var atk = document.createElement("audio");
		atk.setAttribute("src", stats.songs[rand_song].name);
		$(atk).appendTo(document.body);
		atk.play();
		player.health -= stats.songs[rand_song].damage;

		var dmgdisplay = document.createElement('span');
		$(dmgdisplay).addClass("damage").
		css({
				position: 'absolute',
				top: '500px',
				"z-index": '1000',
				color: '#313131',
				background: '#f9f9f9',
				display: 'block',
				border: '1px solid #ccc',
				height: '100px',
				"line-height": '100px',
				"text-align": 'center',
				right: '100px'
		})
		.text(stats.name + " retaliated. You took " + stats.songs[rand_song].damage + "damage...").appendTo($("#game-wrap")).hide().fadeIn("slow").delay(2000).fadeOut("slow", function() {

			$(this).remove();

		});
		if (player.health < 0){
			alert("you've lost the game, so sorry");
			document.location.reload(true);
		}


	}
};

$(document).ready(function() {

	var name;
	$("button#next").on("click", function() { 
		name = $("#name").val();
		if (name != ""){
			console.log("here");
			$("#add-name").hide();
			$("#add-songs").animate({width:"show"}).find("h2").text("Hello, " + name);
		}
	});
	$("button#upload").on("click", function() { 
		$("#songupload").trigger("click");
		console.log(songPowers);
		
	});

	$("button#finalize").on("click",function() {
		player.init(songPowers, name);
		board.init();
		$("#entry-box").fadeOut("slow", function() { 
			$("#game-wrap").fadeIn("slow");
		});
	});

	board.init();
	player.board = board;

	$(".attack").live("click", function() {

		var audios = document.getElementsByTagName("audio");
		var index = $(this).attr("data-power");
		for (var i = 0; i < audios.length; i++)
			audios[i].pause();
				
		audios[index].play();
		var dmg  = player.powers[index].attack;
		board.badGuys[board.currBadguy].health -= dmg;
		board.enemyAttack(board.badGuys[board.currBadguy]);
		var dmgdisplay = document.createElement('span');
		$(dmgdisplay).addClass("damage").css({
				position: 'absolute',
				top: '200px',
				"z-index": '1000',
				color: '#313131',
				background: '#f9f9f9',
				display: 'block',
				border: '1px solid #ccc',
				height: '100px',
				"line-height": '100px',
				"text-align": 'center',
				left: '200px'
		}).text("You dealt " + dmg + " damage!").appendTo($("#game-wrap")).hide().fadeIn("slow").delay(2000).fadeOut("slow", function() {

			$(this).remove();

		});

		if (board.badGuys[board.currBadguy].health <= 0){
			board.clear();
			board.currBadguy++;
			board.ctx.drawImage(board.sprite,player.spriteFrontX,player.spriteFrontY,board.sd,board.sd,player.currX,player.currY,board.sd,board.sd);
			board.drawRoom(player.currBlock.row, player.currBlock.col);
			board.battleState = false;
			$("#game-wrap").find('.ui-battle').hide();
		}
	});

}).keydown(function(e){

	switch(e.keyCode) {
          case 37:
              player.move("l");
              break;
          case 38:
              player.move("u");
              break;
          case 39:
              player.move("r");
              break;
          case 40:
          	  player.move("d");
              break;
    }
});