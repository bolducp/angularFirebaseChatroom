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


app.controller('profileCtrl', function($scope, fbAuth, Profile, firebaseRef, $firebaseObject) {
  $scope.userInfo = fbAuth.$getAuth();
  $scope.profile = Profile($scope.userInfo.uid);
  $scope.email = $scope.userInfo.password.email;
  $scope.imageUrl = $scope.profile.profileImageUrl || $scope.userInfo.password.profileImageURL || null;
  $scope.editing = false;

  $scope.openEdit = function() {
    $scope.editing = true;
  }

  $scope.makeEdits = function() {
    $scope.profile.name = $scope.newName || null;
    $scope.profile.handle = $scope.newHandle || null;
    $scope.profile.imageUrl = $scope.newImage || null;
    $scope.profile.$save();
    $scope.editing = false;
  }

  $scope.cancelEdits = function() {
    $scope.editing = false;
  }

  console.log("Profile Ctrl auth data", $scope.userInfo);


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
