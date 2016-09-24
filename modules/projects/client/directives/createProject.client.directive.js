(function () {
  'use strict';

  angular.module('projects')
  .directive('createProject', createProject);

  createProject.$inject = [];

  function createProject() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'modules/projects/client/directives/views/create-project.client.directive.html',
      controller: controller
    };
    return directive;

    function controller() {

      this.$onInit = function () {};

    }
  }
}());
