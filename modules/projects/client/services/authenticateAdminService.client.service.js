// (function () {
//   'use strict';
//
//   angular.module('users')
//   .factory('authenticateAdminService', authenticateAdminService);
//
//   authenticateAdminService.$inject = ['$http', '$state', 'Authentication'];
//
//   function authenticateAdminService($http, $state, Authentication) {
//     return $http.get('api/v1/users/' + Authentication.user._id)
//     .then(function (adminUser) {
//       if (adminUser.data.roles[0] === 'admin' || 'superadmin') {
//         console.log('adminUser.data:\n', adminUser.data);
//         return adminUser.data;
//       } else {
//         console.log('DOROTHYYYYYYYY');
//         $state.go('home');
//       }
//     }, function (err) {
//       return console.error('error returning admin authentication on route resolve:\n', err);
//     });
//   }
//
// }());
