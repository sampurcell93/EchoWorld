var song =  {
  requestEchoData: function(artist, title){
    url = "http://developer.echonest.com/api/v4/song/search?api_key=G3SVBYIVLZTGEECOA&artist=" + artist + "&title=" + title;
    var data = $.ajax({
          type: "GET",
          url: url, 
          async: false,
      }).responseText;
    data = JSON.parse(data);
    return this.getSongData(data.response.songs[0].id);

  },
  getSongData: function(id){
    url = "http://developer.echonest.com/api/v4/song/profile?api_key=G3SVBYIVLZTGEECOA&id=" + id  + "&bucket=audio_summary";
    return JSON.parse($.ajax({
        type: "GET",
        url: url, 
        async: false,
    }).responseText);
  }
};

$(function () {
    $('#songupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result, function (index, file) {
                var this_song;
                var titles = ["Chosen One", "young man", "m'liege", "Cesar", "young padawan","master chief","Mr Blumpkins"];
                $('<li/>').text(file.name + "... power created, " + titles[Math.round(Math.random() * 6)] + ".").appendTo($("#powers"));
                $.ajax({
                  type: 'GET',
                  url: 'get_file_data.php?file=' + file.name,
                  async: false,
                  dataType: "json",
                  success: function(json) {
                    this_song = json;
                  }
                });
                console.log(this_song);
                var data = {}
                data.artist = this_song.response.track.artist;
                data.name = this_song.response.track.title;
                this_song = song.requestEchoData(this_song.artist, this_song.title);
                data.duration = this_song.response.songs[0].audio_summary.duration;
                data.danceability = this_song.response.songs[0].audio_summary.danceability;
                data.energy = this_song.response.songs[0].audio_summary.energy;
                data.loudness = this_song.response.songs[0].audio_summary.loudness;
                data.tempo = this_song.response.songs[0].audio_summary.tempo;
                data.url = "./" + file.name;
                console.log(songPowers);
                songPowers.push(data);
                console.log(songPowers);

                if (songPowers.length >= 2){
                  $("button#upload").hide();
                  $("button#finalize").fadeIn("slow");
                }
            });
        }
    });



});