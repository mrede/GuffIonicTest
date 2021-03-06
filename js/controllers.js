angular.module('starter.controllers', [])

// A simple controller that fetches a list of data from a service
.controller('AppCtrl', function($scope, $ionicModal) {
  
  $ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true
  });

})




// A simple controller that fetches a list of data from a service
.controller('LocationCtrl', function($scope, $http, PushService, $ionicModal) {
  // "Pets" is a service returning mock data (services.js)
  console.log("LocationCtrl");

  var storage = window.localStorage;
  var push_token = false;

  if (!storage) {
    push_token = storage.getItem('push_token');
  }

  if (!push_token) {
  	console.log("Calling register")
  	PushService.register();
  }

  $scope.cheeseTest= function(e) {
        console.log("POOOOOOT from cheese Test", $http, "E: ",e)  

        PushService.onNotificationGCM($http, e)    
    }

    
  
})

.controller('ModalCtrl', function($scope) {
  
  $scope.newUser = {}; 
  console.log("YP EHRJEHRKHEWKRJHKJ")
  
  $scope.createContact = function() {
    console.log('Create Contact', $scope.newUser);
    $scope.modal.hide();
  };
  
})


