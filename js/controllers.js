angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})


// A simple controller that fetches a list of data from a service
.controller('LocationCtrl', function($scope, PushService) {
  // "Pets" is a service returning mock data (services.js)
  alert("LocationCtrl");

  var storage = window.localStorage;
  var push_token = false;

  if (!storage) {
    push_token = storage.getItem('push_token');
  }

  if (!push_token) {
  	console.log("Calling register")
  	PushService.register();
  }



  
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});
