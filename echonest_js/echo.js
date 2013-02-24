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