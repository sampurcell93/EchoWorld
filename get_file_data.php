<?php
	
	$filename = $_POST['file'];

	$ch = curl_init( "http://developer.echonest.com/api/v4/track/upload?" );
	$data = array('api_key'=>'FILDTEOIK2HBORODV','url'=>'http://sampurcell.net/shook.mp3');
	curl_setopt($ch, CURLOPT_BINARYTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_POST,           TRUE);
	curl_setopt($ch, CURLOPT_POSTFIELDS,     $data); 
	curl_exec($ch);
	curl_close($ch);
?>