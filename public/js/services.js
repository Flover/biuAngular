'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
	.services.factory('UserService', [function() {
		var sdo = {
	        isLogged: false,
	        username: ''
	    };
	    return sdo;
	}]);