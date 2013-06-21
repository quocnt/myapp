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
          authorizeButton.style.visibility = 'hidden';
          makeApiCall();
        } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }

      function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }
      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        gapi.client.load('calendar', 'v3', function() {
          var request = gapi.client.calendar.events.list({
            'calendarId': 'primary'
          });
          var json;
          	var date = new Date();
        		var d = date.getDate();
        		var m = date.getMonth();
        		var y = date.getFullYear();
            var events = events || [];
		      request.execute(function(resp) {
            console.log(resp);
            console.log(new Date());
            for (var i = 0; i < resp.items.length; i++) {
            var json = new Object();
           // json.title = resp.items[i].summary;
           console.log(resp.items[i].start.dateTime);
            events.push({title: resp.items[i].summary + '', start: resp.items[i].start.dateTime, 
              end: resp.items[i].end.dateTime, allDay : false
          });
           }
            $('#calendar').fullCalendar({
                    eventClick: function(event, element) {

                          alert(event.start);

                      },
      			header: {
      				left: 'prev,next today',
      				center: 'title',
      				right: 'month,agendaWeek,agendaDay'
      			},
            contentHeight: 650,
            aspectRatio: 2,
			editable: true,
       eventSources: [
        {
            events: events,
            // color: 'yellow',   // an option!
            // textColor: 'black' // an option!
        }
    ]
      		});
           // $('#calendar').fullCalendar('addEventSource',jsonarr);
           // $('#calendar').fullCalendar('rerenderEvents');
            //$('#calendar').fullCalendar('addEventSource',evet);
            $('#button').click(function(){
                //  $('#calendar').fullCalendar('addEventSource',jsonarr);
                window.location.href = 'bookmeeting.html';
            });
          });
        });
      }