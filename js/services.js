'use strict';

var app = angular.module('fireApp');

app.factory('firebaseRef', function($window, firebaseUrl) {
  return new $window.Firebase(firebaseUrl);
});

app.factory('List', function(firebaseRef, $firebaseArray) {
  var listRef = firebaseRef.child('list');
  return $firebaseArray(listRef);
});

app.factory('User', function(firebaseRef, $firebaseObject) {
  var userRef = firebaseRef.child('userRef');
  return $firebaseObject(userRef);
});

app.factory('User', function(firebaseRef, $firebaseObject) {
  var userRef = firebaseRef.child('userRef');
  return $firebaseObject(userRef);
});


app.factory('fbAuth', function(firebaseRef, $firebaseAuth) {
  return $firebaseAuth(firebaseRef);
});


app.factory('MakeList', function(firebaseRef, $firebaseArray) {
  return function(child) {
    var listRef = firebaseRef.child(child);
    return $firebaseArray(listRef);
  }
});


app.service('Auth', function(fbAuth) {
  this.login = function(userObj) {
    return fbAuth.$authWithPassword(userObj);
  }

  this.register = function(userObj) {
    return fbAuth.$createUser(userObj)
    .then(userData => {
      console.log("USER " + userData.uid + " created successfully");
      return fbAuth.$authWithPassword(userObj);
    });
  };

  this.logout = function() {
    fbAuth.$unauth();
  };
});
