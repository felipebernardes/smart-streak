var app = angular.module('myApp', []);

app.controller('AppCtrl',['$scope', function($scope, $location, $http){
  $scope.test = 'Hello World';
  
}]);
