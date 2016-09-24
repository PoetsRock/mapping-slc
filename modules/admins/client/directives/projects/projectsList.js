(function () {
  'use strict';

  angular.module('admins')
  .directive('projectsList', projectsList);

  projectsList.$inject = [];

  function projectsList() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/modules/admins/client/directives/projects/views/projects-list.html',
      controller: controller
    };
    return directive;

    function controller($scope, Projects, getLists) {
      var vm = this;

      vm.$onInit = function () {
        $scope.projects = Projects.query();
      };


      $scope.propName = 'status';
      $scope.reverseSort = false;
      $scope.sortBy = function (propName, isReversed) {
        $scope.reverse = ($scope.propName === propName.id) ? !$scope.reverse : false;
        $scope.propName = propName.id;
        if(isReversed) { $scope.reverseSort = !$scope.reverseSort;  }
      };

      $scope.sortProjects = getLists.listProjectSorts();

    }
  }
}());
