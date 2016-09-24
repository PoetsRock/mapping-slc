'use strict';

angular.module('admins').directive('projectEditor', function () {
  return {
    restrict: 'EA',
    templateUrl: '/modules/admins/client/directives/views/project-editor.html',
    controller: function ($scope, $http, $location, Authentication, _, $mdDialog) {

      /**
       *
       *  Update an existing Project
       *
       */
      $scope.updateProjStory = function () {
        console.log('Authentication.user._id:\n', Authentication.user._id);
        console.log('$scope.project:\n', $scope.project);
        console.log('$scope.project.user:\n', $scope.project.user);
        if(Authentication.user.roles[0] !== 'admin' && Authentication.user._id !== $scope.project.user._id) {
          return;
        }

        $http.put('/api/v1/projects/' + $scope.project._id, $scope.project)
        .then(function projectUpdateSuccess(updatedProject) {
          if ($location.path() === '/admin/edit-project/' + $scope.project) {
            // $location.path('/admin/edit-project/' + $scope.project);
            $scope.toggleEditFn(0);
          } else if ($location.path() === '/projects/' + $scope.project._id + '/status') {
            $location.path('settings/submissions');
          } else {
            $location.path('projects/' + $scope.project);
            $scope.toggleEditFn(0);
          }
          // todo refactor to use ng-message
          //   notify({
          //     message: 'Project updated successfully',
          //     classes: 'ng-notify-contact-success'
          //   })
          // } else {
          //   notify({
          //     message: 'Something went wrong, and we didn\'t receive your message. We apologize.',
          //     classes: 'ng-notify-contact-failure'
          //   })

        }, function projectUpdateError(err) {
          $scope.error = err.data.message;
        });

      };


      var modalText = '<ng-md-icon icon="warning"></ng-md-icon><h3>Confirm Cancel</h3>' +
          '<p>Are you sure you want to leave the editor without saving your changes?</p>';
      var confirmCancelModal = $mdDialog.confirm()
      .htmlContent(modalText)
      .ariaLabel('Confirm Cancel')
      .ok('Yes, leave')
      .cancel('No, stay');


      var returnToOrigState = function () {
        console.log('$scope.originalKey: ', $scope.originalKey);
        console.log('$scope.originalValue: ', $scope.originalValue);
        $scope.project[$scope.originalKey] = $scope.originalValue[$scope.originalKey];
      };

      // todo the confirm success toast modal works; however the cancel toast does not work
      $scope.confirmCancelModal = function () {
        console.log('confirmCancelModal:\n', confirmCancelModal);
        $mdDialog.show(confirmCancelModal)
        .then(function okayCb(confirm) {
          $scope.toggleEdit = !$scope.toggleEdit;
          $scope.toggleId = 0;
          console.log('confirm: ', confirm);
            returnToOrigState();
        }, function cancelCb(confirm) {
          console.log('else confirm===false: ', confirm);
          // $scope.toggleEdit = true;
        });
        $mdDialog.hide();
      };

      $scope.toggleEditFn = function (editNum, isEdit, originalValue, originalKey) {
        if(isEdit === 'edit') {
          $scope.toggleEdit = !$scope.toggleEdit;
          $scope.toggleId = editNum;
          $scope.originalValue = _.extend({}, originalValue);
          $scope.originalKey = originalKey;
        } else if(isEdit === 'cancel') {
          $scope.confirmCancelModal();
        }
      };


    }
  }
});
