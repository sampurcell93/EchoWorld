function run(){
	jsonGenres = get_genres();
	genresObj = JSON.parse(jsonGenres);
	for(var i = 0; i < genresObj.response.genres.length; i++){
		artstsJsonForGenre = request_artists(genresObj.response.genres["name"]);
	}
	//console.log(genresObj.response.genres[1]["name"]);
	/*for(var i = 0; i < genresObj.length; i++){
		artistJSON = request_artists(genresObj[0].name);
	}*/	
	//artObj = JSON.parse(artistJSON);
	/*for(var i = 0; i < artObj.length; i++){
		console.log(artObj[i]["name"]);
	}*/
}

/*Returns JSON object with all genres*/
function get_genres(){
    return $.ajax({
        type: "GET",
        url: "http://developer.echonest.com/api/v4/artist/list_genres?api_key=G3SVBYIVLZTGEECOA&format=json",
        async: false,
    }).responseText;
}

/*Returns JSON object of all artists for specified genere*/
function request_artists(genre){
	url = "http://developer.echonest.com/api/v4/artist/search?api_key=G3SVBYIVLZTGEECOA&format=json&genre=";
	url += genre;
	return $.ajax({
        type: "GET",
        url: url,
        async: false,
    }).responseText;  
}


