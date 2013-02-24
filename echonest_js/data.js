function get_genres(){
    console.log($.ajax({
        type: "GET",
        url: "http://developer.echonest.com/api/v4/artist/list_genres?api_key=G3SVBYIVLZTGEECOA&format=json",
        async: false,
    }).responseText);
}
