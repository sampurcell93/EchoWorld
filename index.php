<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8' />
		<title>Music Marauder</title>
    <link href='http://fonts.googleapis.com/css?family=Quintessential|Open+Sans' rel='stylesheet' type='text/css'>
		<link href="stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <script src="jquery.min.js"></script>
    <script src="fupload/js/vendor/jquery.ui.widget.js"></script>
    <script src="fupload/js/jquery.iframe-transport.js"></script>
    <script src="fupload/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src='echonest_js/echo.js'></script>
    <script type="text/javascript" src='echonest_js/fupload.js'></script>
  </head>
  <body>
      <div id='entry-box'>  
        <div id='add-name'>
          <p>Brave adventurer and purveyor of music, you come to us in dark times. 
          We are beleagured and weak from years of listening to horrid hymns, 
          musical maladies, and malevolent melodies. The terrible monsters of our world, 
          'N Stink, the great dragon, and Christina Gaggalera, the witch, plague 
          our ears with fell sounds. You must save us!</p>
          <input type='text' id='name' placeholder="What's your name?"/>
          <button id='next'>Begin Marauding</button>
        </div>
        <div id='add-songs'>
          <h2></h2>
          <p>Music Marauder (TM R PATENT PENDING ALL RIGHTS RESERVED 1900-present) 
            is a 2-dimensional action-adventure game based on the EchoNest API. As a 
            player, your goal is to save the world by using your songs to defeat the foul
            musicia- ahem, monsters, that inhabit it. Your success will depend on the songs you choose
            as your powers. Your first song is your theme song, and it defines your character.</p>

          <input id="songupload" style='display: none;' type="file" name="files[]" data-url="fupload/server/php/" multiple>
          <button id='upload'>Upload Songs</button>
          <ul id="powers">
          </ul>
          <button id='finalize' class='hidden'>Go forth, child of Cthulu</button>
        </div>
      </div>
      <div id='game-wrap'>
        <ul id='personality'>
          <li>Hp: 145</li>
          <li>Type: Sassy Rapper</li>
          <li>Defense: Self-deprecation</li>
          <li>Genre: Hip Hop</li>
        </ul>
        
        <h1>Music Marauder</h1>
  	    <canvas id='echoWorld' width='600' height='600'><canvas>
      </div>
  </body>
</html>