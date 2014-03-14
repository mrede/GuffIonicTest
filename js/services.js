angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
 .factory('PushService', function() {

alert("YIP");

  
  
  var pushNotification = false;
  alert("window.plugins: "+window.plugins)
  if (window.plugins) {
    pushNotification = window.plugins.pushNotification;
  } 
  
  if (pushNotification) {
    console.log("Returning push");
    return {
      register: function() {

        if ( device.platform == 'android' || device.platform == 'Android' )
        {
          console.log("Registering Android");
          pushNotification.register(
            function(result) { alert('Callback Success! Result = '+result)}, 
            function(error) { alert('Error = '+error)},
            {"senderID":"507474617924","ecb":"PushService.onNotificationGCM"}
          );
        } else {
          //IOS
          alert("Registering iOS");
          pushNotification.register(
          app.pushRegisterSuccessIosHandler,
          app.pushRegisterErrorIosHandler, {
              "badge":"true",
              "sound":"true",
              "alert":"true",
              "ecb":"app.onNotificationAPN"
            });
        }
      },

      pushRegisterSuccessHandler: function(result) {
        
      },

      pushRegisterErrorHandler: function(error) {
        alert('Error = '+error)
      },

      onNotificationGCM: function(e) {
          console.log("GCM", e);
          switch( e.event )
          {
              case 'registered':
                  if ( e.regid.length > 0 )
                  {
                      console.log("Regid " + e.regid);
                      
                      
                      //alert('registration id = '+e.regid);
                      app.token_id = e.regid;
                      app.sendRegistration(e.regid, 'android')
                  }
              break;
   
              case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                alert('message = '+e.message+' msgcnt = '+e.msgcnt);
              break;
   
              case 'error':
                alert('GCM error = '+e.msg);
              break;
   
              default:
                alert('An unknown GCM event has occurred');
                break;
          }
      },

      sendRegistration: function(id, platform) {

          //alert("Sending reg to"+'http://dev.guff.me.uk/register/'+platform+'.json?token='+id);
          $.ajax({
            type: 'get',
            url: 'http://dev.guff.me.uk/register/'+platform+'.json?token='+id,
            dataType: 'json',
            timeout: 8000,
            
            success: app.registerSuccessHandler,
            error: function(xhr, type){ alert("Error sending Reg"+xhr+", "+type)}
          });
      },
    }
  } else {
    console.log("Returning Dummy");

    return {
      register: function() {
        console.log("Dummy registration");
      }
    }
  }
})
.factory('PetService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pets = [
    { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  return {
    all: function() {
      return pets;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    }
  }
});
