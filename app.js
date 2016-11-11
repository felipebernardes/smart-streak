var app = angular.module('myApp', ['firebase']);

var config = {
  apiKey: "AIzaSyAAlykKuODksdWunCAtLkrjR--mWiR1otk",
  authDomain: "beacon-poc-abb4a.firebaseapp.com",
  databaseURL: "https://beacon-poc-abb4a.firebaseio.com",
  storageBucket: "beacon-poc-abb4a.appspot.com",
  messagingSenderId: "889868945580"
};

firebase.initializeApp(config);

app.controller('AppCtrl',['$scope', '$firebaseArray', function($scope, $firebaseArray) {

  $scope.days = [];
  for (i = 0; i < 364; i++) {
    $scope.days.push({
          status: true
    });
  }

  $scope.userEmail = 'Hello World';
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  $scope.day = Math.floor(diff / oneDay);

  var ref = firebase.database().ref().child("users");

  $scope.addMessage = function() {
    $scope.user = $firebaseArray(ref.child($scope.userEmail.toString()));
    $scope.user.$add($scope.day);
    console.log($scope.user);
  };

  console.log($scope.data);

}]);
