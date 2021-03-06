'use strict';

var app = angular.module('fireApp');


app.factory('firebaseRef', function($window, firebaseUrl) {
  return new $window.Firebase(firebaseUrl);
});


app.factory('Chat', function(firebaseRef, $firebaseArray) {
  var chatRef = firebaseRef.child('chat');
  return $firebaseArray(chatRef);
});


app.factory('User', function(firebaseRef, $firebaseObject) {
  var userRef = firebaseRef.child('userRef');
  return $firebaseObject(userRef);
});


app.factory('Profile', function(firebaseRef, $firebaseObject) {
  return function(uid) {
    var ref = firebaseRef.child('profiles').child(uid);
    return $firebaseObject(ref);
  }
});


app.factory('fbAuth', function(firebaseRef, $firebaseAuth) {
  return $firebaseAuth(firebaseRef);
});


app.service('Auth', function(fbAuth) {
  this.login = function(userObj) {
    return fbAuth.$authWithPassword(userObj);
  }

  this.register = function(userObj) {
    return fbAuth.$createUser(userObj)
    .then(userData => {
      return fbAuth.$authWithPassword(userObj);
    });
  };

  this.logout = function() {
    fbAuth.$unauth();
  };
});
