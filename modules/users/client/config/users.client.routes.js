'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider

    .state('users', {
      abstract: true,
      // url: '/users',
      templateUrl: 'modules/core/client/views/wrapper.client.view.html',
    })

      .state('users.settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          authenticate: true,
          roles: ['user', 'registered', 'contributor', 'admin', 'superUser']
        }
      })
      .state('users.settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html',
        data: {
          pageTitle: 'Profile'
        }
      })
      .state('users.settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html',
        data: {
          pageTitle: 'Password'
        }
      })
      .state('users.settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html',
        data: {
          pageTitle: 'Social Media'
        }
      })
      .state('users.settings.favorites', {
        url: '/favorites',
        templateUrl: 'modules/users/client/views/settings/favorites.client.view.html',
        data: {
          pageTitle: 'Favorites'
        }
      })
      .state('users.settings.submissions', {
        url: '/submissions',
        templateUrl: 'modules/users/client/views/settings/submissions-list.client.view.html',
        data: {
          pageTitle: 'Submissions'
        }
      })
      .state('users.settings.submissionsView', {
        url: '/:projectId/status/',
        templateUrl: 'modules/users/client/views/settings/submissions-view.client.view.html',
        data: {
          pageTitle: 'Submission'
        }
      })
      .state('users.settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html',
        data: {
          pageTitle: 'Profile Image'
        }
      })
      .state('users.authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('users.authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html',
        data: {
          pageTitle: 'Signin'
        }
      })
      .state('users.authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html',
        data: {
          pageTitle: 'Signup'
        }
      })
      .state('users.signupVerify', {
        url: '/signup-verify?tempUserId&tempToken',
        templateUrl : 'modules/users/client/views/authentication/signup-verify.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'New User Registration'
        }
      })
      .state('users.password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('users.password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html',
        params: {
          tempUserCheck: false
        },
        data: {
          pageTitle: 'Password forgot'
        }
      })
      .state('users.password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('users.password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html',
        data: {
          pageTitle: 'Password reset invalid'
        }
      })
      .state('users.password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html',
        data: {
          pageTitle: 'Password reset success'
        }
      })
      .state('users.password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html',
        data: {
          pageTitle: 'Password reset form'
        }
})
      .state('users.contributors', {
        url: '/contributors',
        templateUrl: 'modules/users/client/views/contributors/contributors.client.list.html'
      })
      .state('users.contributor', {
        url: '/contributors/:userId',
        templateUrl: 'modules/users/client/views/contributors/contributors.client.view.html'
      });
  }
]);
