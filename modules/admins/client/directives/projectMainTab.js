'use strict';

angular.module('admins').directive('projectMainTab', function () {
  return {
    restrict: 'E',
    templateUrl: '/modules/admins/client/directives/views/project-main-tab.html',
    controller: function($scope, getLists) {

      $scope.states = getLists.listStates();

    }

  };
});
