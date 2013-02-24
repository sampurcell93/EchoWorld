var player = {
	powers: [],
	init: function(songs, name) { 
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

			power = this.powers[i];
			power = {};
			power.name = song.name;
			power.attack = song.danceability;
			power.type = song.genre;
		}
	},
	getWeakness: function(genre) {

		return "coldplay";

	}
};

$(document).ready(function() {
	var name;
	var songs = [];
	$("button#next").on("click", function() { 
		name = $("#name").val();
		if (name != ""){
			console.log("here");
			$("#add-name").animate({width:"hide"});
			$("#add-songs").animate({width:"show"});
			
		}
	});
	$("button#upload").on("click", function() { 
		player.init(songs,name);
		$("#songupload").trigger("click");
	});


});


