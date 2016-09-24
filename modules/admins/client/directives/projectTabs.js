(function () {
  'use strict';


  angular.module('admins')
  .directive('projectTabs', projectTabs);

  projectTabs.$inject = [];

  function projectTabs() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/modules/admins/client/directives/views/project-tabs.html',
      controller: controller,
      controllerAs: 'vm'
    };
    return directive;

    function controller($scope, $location) {
      var vm = this;
      vm.$onInit = function () {};

      /** Update an existing Project **/
      $scope.updateProject = function () {

        $scope.originalData = $scope.project;

        $scope.project.$update(function (response) {
          if ($location.path() === '/admin/edit-project/' + $scope.project._id) {
            $location.path('/admin/edit-project/' + $scope.project._id);
          } else {
            $location.path('projects/' + $scope.project._id);
          }
        }, function (errorResponse) {
          console.error('ERROR on $scope.updateProject() `errorResponse`:\n', errorResponse);
          $scope.error = errorResponse.data.message;
        });
        $scope.toggleEditFn(0);
        $scope.toggleEdit = false;
      };

    }
  }
}());
