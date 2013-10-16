$(document).ready(function() {

	$('#save').click(function(){
		var location = $('#location').val();
		var summary = $('#summary').val();
		var datestart = $('#datestart').val();
		var timestart = $('#timestart').val();
		var timeend = $('#timeend').val();
		var dateend = $('#dateend').val();
		var st = convertDate(datestart,timestart);
		var end = convertDate(dateend,timeend);
		console.log(st+ '----' + end + "----" + summary + "-----" + location);
		makeApiCall(st,end,summary,location);
	});
	$('#discard').click(function(){
		location.href = 'canvas.html'; //
	});
})
function convertDate(d,t){
	var date = new Date().toString();
	var timeZone = date.substring(date.indexOf("GMT")+3,date.indexOf("(I")-1);
	var a = d + "T" + convertTime(t) + timeZone;
	console.log(a);
	return a;
}
function convertTime(t){
	var type = t.substring(t.indexOf("pm"),t.indexOf("pm")+2);
	var hour = t.substring(0,t.indexOf(":"));
	var min = t.substring(t.indexOf(":")+1,t.indexOf(":")+3);
	if(type == "pm"){
		hour = parseInt(hour) + 12;
	}
	return hour + ":" + min + ":00";
}
var clientId = '91199153662.apps.googleusercontent.com';
var apiKey = 'AIzaSyCZhwK7Stcar3tmeJnIwVwST-yWb59kJUY';
var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
 	var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
    	//authorizeButton.style.visibility = 'hidden';
    	//makeApiCall();
    	var location = $('#location').val();
    	console.log("authorize Successful !!" + '-----' + location);

    } else {
       // authorizeButton.style.visibility = '';
       // authorizeButton.onclick = handleAuthClick;
       }
}

function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
    }
      // Load the API and make an API call.  Display the results on the screen.
function makeApiCall(start,end,summary,location) {
	var resource = {
		'summary': summary,
		'location': location,
		'start': {
			    'dateTime': start
		},
		'end': {
			    'dateTime': end
		}
	};
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
			'resource' : resource		
        });

		request.execute(function(resp) {            
           // json.title = resp.items[i].summary;
           console.log(resp);
           if(!resp.error){
           	alert("Successful");
           }
           else
           	alert("Error");
        });
    });
}