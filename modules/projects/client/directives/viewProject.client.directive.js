(function () {
  'use strict';

  angular.module('projects')
  .config(function (LightboxProvider) {
    LightboxProvider.templateUrl = 'modules/core/client/views/lightbox-template.html';
    LightboxProvider.fullScreenMode = true;
    LightboxProvider.windowClass = 'lightbox-window';
    LightboxProvider.getImageUrl = function (image) {
      return image.imageUrl;
    };
    LightboxProvider.getImageCaption = function (image) {
      return image.imageCaption;
    };
  })
  .directive('viewProject', viewProject);

  viewProject.$inject = [];

  function viewProject() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/modules/projects/client/directives/views/view-project.html',
      controller: controller
    };
    return directive;

    function controller($scope, userFavoritesService, Lightbox) {
      this.$onInit = function () {
        $scope.project = $scope.findOne();
        console.log('Lightbox:\n', Lightbox);

      };

      $scope.toggleFavProjectFn = function () {
        userFavoritesService.toggleFavProject($scope.isFavorite, $scope.project);
        $scope.isFavorite = !$scope.isFavorite;
      };


      /**
       * Lightbox
       */
      $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.images, index);
      };

    }
  }
}());
