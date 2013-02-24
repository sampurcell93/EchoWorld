<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.1.1.min.js"></script>

function getRemote() {
    console.log($.ajax({
        type: "GET",
        url: "http://developer.echonest.com/api/v4/artist/list_genres?api_key=G3SVBYIVLZTGEECOA&format=json",
        async: false,
    }).responseText);

}

getRemote();