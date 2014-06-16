'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var appServices = angular.module('appServices', []);

appServices.service('Session', function () {
  this.user = {
    id: null,
    userId: null,
    username: ""
  };

  this.create = function (sessionId, userId, username) {
    this.user.id = sessionId;
    this.user.userId = userId;
    this.user.username = username;
    return this.user;
  };
  this.destroy = function () {
    this.user.id = null;
    this.user.userId = null;
    this.user.username = "";
  };
  return this;
});

appServices.factory('AuthService', ['Session', '$rootScope', function(Session, $rootScope){
  return {
    login: function(username){
      socket.emit('login', username);
      socket.on('auth', function(data,sessionId){
        $rootScope.userSession = Session.create(sessionId, data._id, data.username);
        $rootScope.isLogged = true;
        $rootScope.$apply();
      });
    },
    register: function(username){
      socket.emit('register', username);
      socket.on('exists', function(){
        console.log('exists');
      });
      socket.on('auth', function(data, sessionId){
        $rootScope.userSession = Session.create(sessionId, data._id, data.username);
        $rootScope.isLogged = true;
        $rootScope.$apply();
      });
    },
    logout: function(){
      Session.destroy();
      $rootScope.isLogged = false;
      //$rootScope.$apply();
    },
    isAuthenticated: function () {
      return !!Session.userId;
    },
    isAuthorized: function (authorId) {
      console.log(Session.user.userId);
      console.log(authorId);
      return authorId === Session.user.userId;
    }
  };
}]);
