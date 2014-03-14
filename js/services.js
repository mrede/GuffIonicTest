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


    var app = {
      token_id: null,
      
      // Update DOM on a Received Event
      register: function(id) {

          var pushNotification = window.plugins.pushNotification;

          if ( device.platform == 'android' || device.platform == 'Android' )
          {
              alert("ANDROID");
              pushNotification.register(app.pushRegisterSuccessHandler, app.pushRegisterErrorHandler,{"senderID":"507474617924","ecb":"fail_bounce"});
          } else {
              //IOS
              alert("Doing IOS");
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
          //alert('Callback Success! Result = '+result)
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

      registerSuccessHandler: function(e) {
          console.log("REgister success");
      },

      pushRegisterSuccessIosHandler: function(result) {
          //alert('IOS Callback Success! Result = '+result)
          app.token_id = result;
          app.sendRegistration(result, 'ios');
      },

      pushRegisterErrorIosHandler: function(error) {
          alert('IOS Callback Error! Error = '+error)
      },

      onNotificationAPN: function(event) {
          if ( event.alert )
          {
              alert(event.alert);
              navigator.notification.alert(event.alert);
          }

          if ( event.sound )
          {
              var snd = new Media(event.sound);
              snd.play();
          }

          if ( event.badge )
          {
              pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
          }
      }

    };

    return app;
  } else {
    return { register: function() { console.log("DUMMY")}};
  }



  // var pushNotification = false;
  // alert("window.plugins: "+window.plugins)
  // if (window.plugins) {
  //   pushNotification = window.plugins.pushNotification;
  // } 
  
  // if (pushNotification) {
  //   console.log("Returning push");
  //   return 
  // } else {
  //   console.log("Returning Dummy");

  //   return {
  //     register: function() {
  //       console.log("Dummy registration");
  //     }
  //   }
  // }
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

function fail_bounce(e)
{
  console("Fail_bounce called");
  var yourService = angular.injector.get('PushService');
  yourService.onNotificationGCM(e);
}
