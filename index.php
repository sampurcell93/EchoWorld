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
    <!--<script type="text/javascript" src='echonest_js/dependencies.js'></script>-->
    <script type="text/javascript" src='echonest_js/echo.js'></script>
    <script type="text/javascript" src='echonest_js/fupload.js'></script>
    <script src="engine_js/enchant.js"></script>
    <script src="engine_js/game.js"></script>

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
          <p>Music Marauder (TM R PATENT PENDING ALL RIGHTS RESERVED 1900-present) 
            is a 2-dimensional action-adventure game based on the EchoNest API. As a 
            player, your goal is to save the world by using your songs to defeat the foul
            musicia- ahem, monsters, that inhabit it. Your success will depend on the songs you choose
            as your powers.</p>

          <input id="songupload" style='display: none;' type="file" name="files[]" data-url="fupload/server/php/" multiple>
          <button id='upload'>Upload a Song</button>
          <ul id="powers">
          </ul>
        </div>
      </div>
      <div id='game-wrap'>
        <h1>Music Marauder</h1>
  	    <canvas id='echoWorld'><canvas>
      </div>
  </body>
</html>