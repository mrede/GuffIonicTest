angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})


// A simple controller that fetches a list of data from a service
.controller('LocationCtrl', function($scope, $http, PushService) {
  // "Pets" is a service returning mock data (services.js)
  console.log("LocationCtrl");

  var storage = window.localStorage;
  var push_token = false;

  if (!storage) {
    push_token = storage.getItem('push_token');
  }

  if (!push_token) {
  	console.log("Calling register")
  	//PushService.register();
  }

  $scope.cheeseTest= function(e) {
        console.log("POOOOOOT from cheese Test", $http, "E: ",e)  

        PushService.onNotificationGCM($http, e)    
    }

  
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});
