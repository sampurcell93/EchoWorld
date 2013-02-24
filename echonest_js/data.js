$(document).ready(function(){
	song = requestEchoData("Kanye West", "All of the Lights");
	song = JSON.parse(song);
	id = song.response.songs[0].id;
	songData = getSongData(id);
	console.log(songData);
	/*var file = "test.mp3";
	function getData(file) {
		artist = ID3.getTag(file, "artist");
 		title = ID3.getTag(file, "title");
 		requestEchoData(artist, title);
	}
	ID3.loadTags(file, getTitle);*/
});

function requestEchoData(artist, title){
	url = "http://developer.echonest.com/api/v4/song/search?api_key=G3SVBYIVLZTGEECOA&artist=" + artist + "&title=" + title;
	return $.ajax({
        type: "GET",
        url: url, 
        async: false,
    }).responseText;
}

function getSongData(id){
	url = "http://developer.echonest.com/api/v4/song/profile?api_key=G3SVBYIVLZTGEECOA&id=" + id  + "&bucket=audio_summary";
	return $.ajax({
        type: "GET",
        url: url, 
        async: false,
    }).responseText;
}


