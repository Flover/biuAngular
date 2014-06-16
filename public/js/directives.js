'use strict';

/* Directives */

var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('myYoutube', function() {
  return {
    restrict: 'E',
    template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" ng-src="{{\'https://www.youtube.com/embed/\'+movie.link}}" frameborder="0" allowfullscreen></iframe></div>'
  };
});
