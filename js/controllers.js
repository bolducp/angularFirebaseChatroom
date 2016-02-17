'use strict';

var app = angular.module('fireApp');


app.controller('mainCtrl', function($scope, List, User, MakeList) {
  $scope.list = MakeList('clogs');

  $scope.user = User;

  $scope.add = function(text) {
    $scope.list.$add(text);
    $scope.textToAdd = '';
  }
});


app.controller('navCtrl', function($scope, $state, Auth, fbAuth) {
  fbAuth.$onAuth(function(authData) {
    $scope.authData = authData;
    console.log("authData: ", authData);
  });

  $scope.logout = function() {
    Auth.logout();
    $state.go('home');
  };
});


app.controller('profileCtrl', function() {

  console.log("Profile Ctrl");
});


app.controller('userCtrl', function($scope, $state, Auth) {
  $scope.state = $state.current.name.split('.')[1];

  $scope.submit = function(user) {
    var userObj = {
      email : user.email,
      password: user.password
    };

    if ($scope.state === 'login'){
      Auth.login(userObj).then(goHome, alertInvalidLogin);
    } else {

      if (user.password !== user.password2) {
        $scope.user.password = $scope.user.password2 = '';
        return alert("Passwords must match");
      }
      Auth.register(userObj).then(goHome, alertError);
    }

    function goHome() {
      $state.go('home');
    };

    function alertInvalidLogin() {
      $scope.user.password = '';
      alert('Invalid email/password combination');
    };

    function alertError(err) {
      alert("Error in console.");
      console.log(err);
    };
  };
});
