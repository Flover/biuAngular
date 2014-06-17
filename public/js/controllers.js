'use strict';

/* Controllers */
var socket = io.connect('http://localhost');

var appControllers = angular.module('appControllers', ['ngCookies']);
  appControllers.controller('AppCtrl', ['$scope', 'AuthService', '$rootScope', '$cookieStore', function ($scope, AuthService, $rootScope, $cookieStore) {
    $scope.tab = 1;
    $rootScope.userSession = {
      username: "",
      sessionId: null,
      userId: null
    };
    $rootScope.isLogged = false;
    $rootScope.isOwner = function(userId){
      //console.log(AuthService.isAuthorized(userId));
      return AuthService.isAuthorized(userId);
    };

    if($cookieStore.get('username')){
      console.log($cookieStore.get('username'));
      AuthService.cookieAuth();
    }

    $scope.activeTab = function(tab){
      $scope.tab = tab;
    };

    $scope.isActive = function(tab){
      return $scope.tab === tab;
    };

  }]);
  appControllers.controller('LoginCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.username = "";

    $scope.register = function(){
      AuthService.register($scope.username);
    };

    $scope.login = function(){
      AuthService.login($scope.username);
    };

    $scope.logout = function(){
      AuthService.logout();
    };
  }]);

  appControllers.controller('ShowAllCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.movies = [];
    socket.emit('getMovies');
    socket.on('allMovies', function(movies){
      $scope.movies = movies;
      $scope.$apply();
    });
    $scope.deleteMovie = function(id){
      console.log(id);
      socket.emit('deleteMovie',id);
    };
    socket.on('updateMovies', function(){
      socket.emit('getMovies');
    });
  }]);
  appControllers.controller('ShowCtrl', ['$scope','$routeParams', function($scope, $routeParams){
    socket.emit('getMovie',$routeParams.id);
    socket.on('oneMovie', function(movie){
      $scope.movie = movie;
      $scope.$apply();
    });
  }]);
  appControllers.controller('EditCtrl', ['$scope','$routeParams', '$location', '$rootScope',function($scope, $routeParams, $location, $rootScope){
    socket.emit('getMovie',$routeParams.id);
    socket.on('oneMovie', function(movie){
      $scope.movie = movie;
      $scope.$apply();
    });

    $scope.editMovie = function(){
      console.log("wtf");
      socket.emit('editMovie', $scope.movie);
      $location.path('/showAll');
    };

    if($rootScope.isLogged === false)
      $location.path('/showAll');

  }]);
  appControllers.controller('AddCtrl',['$scope', '$location', '$rootScope', function($scope,$location,$rootScope){
    $scope.addMovie = function(){
      socket.emit('addNew', $scope.movie, $rootScope.userSession.userId);
      $location.path('/showAll');
    };

    if($rootScope.isLogged === false)
      $location.path('/showAll');
  }]);
  appControllers.controller('ShowUsersCtrl',['$scope', function($scope){
    socket.emit('getAllUsers');
    socket.on('allUsers', function(users){
      $scope.users = users;
      $scope.$apply();
    });
  }]);
  appControllers.controller('ShowUserClipsCtrl', ['$scope', '$routeParams', function($scope,$routeParams){
    socket.emit('getUserClips',$routeParams.id);
    socket.on('userClips', function(movies){
      $scope.movies = movies;
      $scope.$apply();
    });
  }]);
