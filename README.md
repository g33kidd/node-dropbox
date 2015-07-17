# Node Dropbox

A simple node.js API client for the Dropbox API.

## Installation

	npm install node-dropbox --save

## Usage:

Before starting anything you need to go create your app over at: https://www.dropbox.com/developers/apps then go ahead and grab your Key and Secret.

#### Authentication

Just use the Authenticate method to generate a url for your user to go to. This will be redirected back to another page.

	var node_dropbox = require('node-dropbox');
	node_dropbox.Authenticate('key', 'secret', 'redirect_url', function(err, url){
		// redirect user to the url.
		// looks like this: "https://www.dropbox.com/1/oauth2/authorize?client_id=<key_here>&response_type=code&redirect_uri=<redirect_url_here>"
	});

On the page where you redirected to, you will need to use the AccessToken method to get the users access token for api use. The redirect_url this time is only for validation, it will not need to redirect again.

	node_dropbox.AccessToken('key', 'secret', 'access_code', 'redirect_url', function(err, body) {
		access_token = body.access_token;
	});

#### Make API Calls

When you have the access token in hand, all you need to do is make api calls. That's all it takes to get started with this client.

	api = node_dropbox.api(access_token);
	api.account(function(err, res, body) {
		console.log(body);
	});

The above output will be something like:

	{
    "referral_link": "https://www.dropbox.com/referrals/r1a2n3d4m5s6t7",
    "display_name": "John P. User",
    "uid": 12345678,
    "team": {
        "name": "Acme Inc."
    },
    "country": "US",
    "quota_info": {
        "shared": 253738410565,
        "quota": 107374182400000,
        "normal": 680031877871
    }
	}

## Available API Calls:
	
	api.account(callback); // Fetches the account information.
	api.createDir(path, callback); // Creates a directory.
	api.removeDir(path, callback); // Deletes a directory.
	api.createFile(path, contents, callback); // Creates a new file.
	api.removeFile(path, callback) // Deletes a file.
	api.moveSomething(from_path, to_path, callback); // Moves/renames a file.
	api.getMetadata(path, callback) // Retrieves file and folder metadata. Can be used to list a folder's content.
	api.getFile(path, callback) // Downloads a file.
	api.getDelta(cursor, path, callback) // Gets changes to files and folders in a user's Dropbox.

	// Each callback will return the error message, response, and body(json data).
	api.account(function(error, response, body){
		console.log(body.display_name);
	});

## Planned Features:

I plan on implementing the Dropbox Core API features(https://www.dropbox.com/developers/core/docs) and revamping the code a little bit to make it integrate with express easily or possibly just make it more friendly to use. Right now, it's not the best, but it works.
