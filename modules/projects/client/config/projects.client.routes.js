'use strict';

//Setting up route
angular.module('projects').config(['$stateProvider',
  function ($stateProvider) {
    var tempPageTitle = '';

    // Projects state routing
    $stateProvider
    .state('projects', {
      abstract: true,
      url: '/projects',
      templateUrl: 'modules/core/client/views/wrapper.client.view.html',
    })
    .state('projects.listProjects', {
      url: '/list',
      templateUrl: 'modules/projects/client/views/list-projects.client.view.html',
      controller: 'ProjectsController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Projects'
      }
    })
    .state('projects.submissionDetails', {
      url: '/submission-details',
      templateUrl: 'modules/projects/client/views/submission-details-client-view.html',
      controller: 'ProjectsController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Submission Details'
      }
    })
    .state('projects.createProject', {
      url: '/create',
      templateUrl: 'modules/projects/client/views/create-project.client.view.html',
      loginRequired: true
    })
    .state('projects.viewProject', {
      url: '/:projectId',
      templateUrl: 'modules/projects/client/views/view-project.client.view.html',
      controller: 'ProjectsController',
      controllerAs: 'vm',
      // resolve: {
      //   checkSubStatus: function checkSubStatus($stateParams, $http, $state) {
      //     return $http.get()
      //     .then(function successCb(project) {
      //       console.log('$stateProvider:\n', $stateProvider);
      //       console.log('project.status:\n', project.status);
      //       if(project.status !== 'published') {
      //         return $state.go('home');
      //       }
      //       tempPageTitle = project.title;
      //       return project;
      //     }, function errorCb(err) {
      //       return console.error('error returning project on route resolve:\n', err);
      //     });
      //   }
      // },
      // data: {
      //   pageTitle: tempPageTitle
      // }
    })
    .state('projects.viewProjectPreview', {
      url: '/:projectId/preview',
      templateUrl: 'modules/projects/client/views/view-project.client.view.html',
      controller: 'ProjectsController',
      controllerAs: 'vm',
      resolve: {
        checkSubStatus: function checkSubStatus($stateParams, $http, $state, Authentication) {
          return $http.get()
          .then(function successCb(project) {
            console.log('$stateProvider:\n', $stateProvider);
            console.log('project.status:\n', project.status);
            if(project.status === 'published') {
              // return $state.go(viewProject({ 'projectId': project._id }));
              return project;
            } else if(Authentication.user.roles[0] !=='admin' || Authentication.user.roles[0] !=='superadmin') {
              return $state.go('listProjects');
            }
            tempPageTitle = project.title;
            return project
          }, function errorCb(err) {
            return console.error('error returning project on route resolve:\n', err);
          });
        }
      },
      data: {
        pageTitle: tempPageTitle + ' - Preview'
      }
    })
    .state('projects.projectStatus', {
      url: '/:projectId/status',
      templateUrl: 'modules/projects/client/views/project-for-submission.client.view.html',
      controller: 'ProjectsController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Submission Status',
        authenticate: true,
        //  roles: ['contributor', 'admin', 'superUser'],
      },
      resolve: {
        authenticatedUser: function checkAuthentication($stateParams, $http, Authentication, $state) {
          return $http.get('api/v1/projects/' + $stateParams.projectId)
          .then(function(project) {
            if (project.data.user._id === Authentication.user._id) {
              return Authentication.user;
            } else {
              $state.go('home');
            }
          }, function (err) {
            return console.error('err: ', err);
          });
        }
      }
    });
  }
]);
