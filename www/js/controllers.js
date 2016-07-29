angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $cordovaFlashlight) {
  $scope.settings = {
    enableFriends: false
  };
  $scope.avail = false;
  $scope.$watch('settings.enableFriends', function(newValue, oldValue) {
    console.log(newValue, oldValue);
    if ($scope.avail) {
      if (newValue) {
        $cordovaFlashlight.switchOn();
      } else {
        $cordovaFlashlight.switchOff();
      }
    }
  });
  if (ionic.Platform.isWebView()) {
    $cordovaFlashlight.available()
      .then(function() {
        $scope.avail = true; // is available
      }, function () {
        $scope.avail = false; // unavailable
      });
  }
});
