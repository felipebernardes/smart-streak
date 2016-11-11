var app = angular.module('myApp', []);

app.controller('AppCtrl',['$scope', function($scope, $location, $http){

  $scope.days = [];
  for (i = 0; i < 364; i++) {
    $scope.days.push({
          status: true
    });
  }

}]);
