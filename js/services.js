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


