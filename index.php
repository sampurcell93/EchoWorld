<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8' />
		<title>Music Marauder</title>
    <link href='http://fonts.googleapis.com/css?family=Quintessential|Open+Sans' rel='stylesheet' type='text/css'>
		<link href="stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
	  <link href="stylesheets/print.css" media="print" rel="stylesheet" type="text/css" />
  	    <!--[if IE]>
    	<link href="/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
  		<![endif]-->
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
  	<script type="text/javascript" src='echo.js'></script>
  </head>

  <body>

      <div id='entry-box'>  
        <div id='add-name'>
          <p>Brave adventurer and purveyor of music, you come to us in dark times. 
          We are beleagured and weak from years of listening to horrid hymns, 
          musical maladies, and malevolent melodies. The terrible monsters of our world, 
          'N Stink, the great dragon, and Christina Gaggalera, the old crone, plague 
          our ears with fell sounds. You must save us!</p>
          <input type='text' id='name' placeholder="What's your name?"/>
          <button>Begin Marauding</button>
        </div>
        <div id='add-songs'>

        </div>
      </div>
      <div id='game-wrap'>
        <h1>Music Marauder</h1>
  	    <canvas id='echoWorld'><canvas>
      </div>
  </body>
</html>