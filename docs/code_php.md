---
description: Sehen Sie sich unser PHP-Programmierbeispiel an.
---

# Programmbeispiel PHP 

```php
#!/usr/bin/php
<?php
$credentials = "beispiel@beispiel.de:password";

// The data to send to the API
/*$data = array(
    'kind' => 'blogger#post',
    'waypoints' => array(id' => $blogID),
    'title' => 'A new post',
    'content' => 'With <b>exciting</b> content...'
);

$postData = json_encode($data)
*/

$postData = '{
  "tour": {
    "roundtrip": true,
    "tollfree": false,
    "optimize": "time",
    "avoid_highway": false,
    "start": true
  },
  "waypoints": [
     {
    "address": {"locality": "München", "postcode": "80803", "street": "Pündterplatz 8"}
     },
     {
    "address": {"locality": "Nürnberg", "postcode": "90403", "street": "Weintraubengasse 1"}
     },
     {
    "address": {"locality": "Oberschleißheim", "postcode": "", "street": ""}
     },
     {
    "address": {"locality": "Moosburg", "postcode": "85368", "street": "Orionstraße 2"},
    "time": {"duration_of_stay" : 60}
     },
     {
    "address": {"locality": "Gammelsdorf", "postcode": "", "street": ""}
     },
     {
    "address": {"locality": "Landshut", "postcode": "", "street": ""},
     "time": {"duration_of_stay": 60}
    }
  ]
}';


// Setup cURL
$ch = curl_init('http://localhost:3000/startjob');
curl_setopt_array($ch, array(
    CURLOPT_POST => TRUE,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_HTTPHEADER => array(
	"Authorization: Basic " . base64_encode($credentials),
	"Content-Type: application/json"
    ),
    CURLOPT_POSTFIELDS => $postData
));

// Send the request
$response = curl_exec($ch);


/*
// Create the context for the request
$context = stream_context_create(array(
    'http' => array(
	'method' => 'POST',
	'header' => "Content-Type: application/json\r\n" .
	"Authorization: Basic " . base64_encode($credentials) ."\r\n",
	'content' => $postData
    )
));

// Send the request
$response = file_get_contents('http://localhost:3000/startjob', FALSE, $context);
*/

// Check for errors
if($response === FALSE){
    die('Error');
}

// Decode the response
$responseData = json_decode($response, TRUE);

// Print the date from the response
echo $response;


// ?>
```
