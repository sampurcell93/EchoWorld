var player = {
	powers: null,
	init: function(songs, name) { 
		player.name = name;
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
		}
	},
	getWeakness: function(genre) {

		switch(genre) {




		}

	}
};

$(document).ready(function() {

	var songs = [];
	$("button").on("click", function() { 
		var name = $("#name").val();
		if (name != ""){
			player.init(songs,name);
			
		}
	});
});

/*$("#entry-box").fadeOut("slow",function() { 

				$("#game-wrap").fadeIn("fast");

			});

			*/