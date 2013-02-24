<?php
//
// A simple command-line Evernote API demo script that lists all notebooks in
// the user's account and creates a simple test note in the default notebook.
//
// Before running this sample, you must fill in your Evernote developer token.
//
// To run:
//   php EDAMTest.php
//

// Import the classes that we're going to be using
use EDAM\Types\Data, EDAM\Types\Note, EDAM\Types\Resource, EDAM\Types\ResourceAttributes;
use EDAM\Error\EDAMUserException, EDAM\Error\EDAMErrorCode;
use Evernote\Client;
use EDAM\NoteStore\NoteFilter;
ini_set("include_path", ini_get("include_path") . PATH_SEPARATOR . "../../lib" . PATH_SEPARATOR);
require_once 'autoload.php';

require_once 'Evernote/Client.php';

require_once 'packages/Errors/Errors_types.php';
require_once 'packages/Types/Types_types.php';
require_once 'packages/Limits/Limits_constants.php';

// A global exception handler for our program so that error messages all go to the console
function en_exception_handler($exception)
{
    echo "Uncaught " . get_class($exception) . ":\n";
    if ($exception instanceof EDAMUserException) {
        echo "Error code: " . EDAMErrorCode::$__names[$exception->errorCode] . "\n";
        echo "Parameter: " . $exception->parameter . "\n";
    } elseif ($exception instanceof EDAMSystemException) {
        echo "Error code: " . EDAMErrorCode::$__names[$exception->errorCode] . "\n";
        echo "Message: " . $exception->message . "\n";
    } else {
        echo $exception;
    }
}
set_exception_handler('en_exception_handler');

// Real applications authenticate with Evernote using OAuth, but for the
// purpose of exploring the API, you can get a developer token that allows
// you to access your own Evernote account. To get a developer token, visit
// https://sandbox.evernote.com/api/DeveloperToken.action
$authToken = "S=s1:U=5eb59:E=14462e3fcc6:C=13d0b32d0c6:P=1cd:A=en-devtoken:H=5b565c510d92d131a72366df106f6ad6";



// Initial development is performed on our sandbox server. To use the production
// service, change "sandbox.evernote.com" to "www.evernote.com" and replace your
// developer token above with a token from
// https://www.evernote.com/api/DeveloperToken.action
$client = new Client(array('token' => $authToken));

$userStore = $client->getUserStore();

// Connect to the service and check the protocol version
$versionOK =
    $userStore->checkVersion("Evernote EDAMTest (PHP)",
         $GLOBALS['EDAM_UserStore_UserStore_CONSTANTS']['EDAM_VERSION_MAJOR'],
         $GLOBALS['EDAM_UserStore_UserStore_CONSTANTS']['EDAM_VERSION_MINOR']);
if ($versionOK == 0) {
    exit(1);
}

$noteStore = $client->getNoteStore();


// List all of the notebooks in the user's account
$note_filter = new NoteFilter();
$note_filter->words = 'resource:image/*';
$noteList = $noteStore->findNotes($authToken, $note_filter, 0, 1000);
 
$resources = array();
$notes = $noteList->notes;
for ($i = 0; $i < count($notes); $i++) {
  $resources = $notes[$i]->resources;
  for ($j = 0; $j < count($resources); $j++) {
    //print " Resource id: " . $resource[$j]->guid . "\n";
    if($resources[$j]->guid != NULL){
      
      $resource = $noteStore->getResource($authToken, $resources[$j]->guid, true, false, false, false);
      $resources[$i] = $resource;
    }
  }
} 

echo json_encode($resources);
// To create a new note, simply create a new Note object and fill in
// attributes such as the note's title.
?>