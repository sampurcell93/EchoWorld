var songData;

var song =  {
  requestEchoData: function(artist, title){
    url = "http://developer.echonest.com/api/v4/song/search?api_key=G3SVBYIVLZTGEECOA&artist=" + artist + "&title=" + title;
    var data = $.ajax({
          type: "GET",
          url: url, 
          async: false,
      }).responseText;
    this.getSongData(data.response.songs[0].id);
    return 
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

$(function () {
    $('#songupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result, function (index, file) {
                var song;
                var name = file.name;
                var titles = ["chosen one", "the boy who lived", "dickface", "Cesar"];
                $('<li/>').text(file.name + "... power created, " + titles[Math.round(Math.random() * 3)] + ".").appendTo($("#powers"));
                $.ajax({
                  type: 'POST',
                  url: 'get_file_data.php?file=' + name,
                  async: false,
                  dataType: "json",
                  success: function(json) {

                    song = json;
                    console.log(json);

                  }


                })
            });
        }
    });



});