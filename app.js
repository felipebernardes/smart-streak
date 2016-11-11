var app = angular.module('myApp', ['firebase']);

var config = {
  apiKey: "AIzaSyAAlykKuODksdWunCAtLkrjR--mWiR1otk",
  authDomain: "beacon-poc-abb4a.firebaseapp.com",
  databaseURL: "https://beacon-poc-abb4a.firebaseio.com",
  storageBucket: "beacon-poc-abb4a.appspot.com",
  messagingSenderId: "889868945580"
};

firebase.initializeApp(config);

app.controller('AppCtrl',['$scope', '$firebaseObject', function($scope, $firebaseObject) {

  $scope.infoUser = false;
  $scope.listDays = [];

  $scope.days = [];
  for (i = 0; i < 364; i++) {
    $scope.days.push({
          status: false
    });
  }

  $scope.userName = 'felipebernardes';
  $scope.streak = 1;


  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  $scope.day = Math.floor(diff / oneDay);

  var ref = firebase.database().ref().child("users");

  $scope.addMessage = function() {
    $scope.user = $firebaseObject(ref.child($scope.userName.toString()));
    $scope.user.$loaded(function(user) {
      if(!user.listDays) {
        user.listDays = [];
      }
      user.listDays.push($scope.day);

      user.$save();
      console.log($scope.user.listDays);

      $scope.infoUser = true;

      //check days
      $scope.user.listDays.forEach(function(day) {
        $scope.days[day-1].status = true;
      });

      //count streak
      var countStreak = function(day) {
        if ($scope.days[day-1].status == true) {
          $scope.streak ++;
          checkStreak(day-1);
        }
      };

      countStreak($scope.day-1);

      // last days
      $scope.lastDays = function() {
        var count = 0;
        var setDays = new Set(user.listDays);
        setDays.forEach(function(day) {
          if(day <= $scope.day && day >= ($scope.day - 30)) {
            count++;
          }
        });
        console.log(count);
        return count;
      }
      $scope.lastDaysShow = $scope.lastDays();

      $scope.daysInYear = 0;
      //count days
      $scope.days.forEach(function(day) {
        if (day.status == true) {
          $scope.daysInYear++;
        }
      });

    });
  };
}]);
