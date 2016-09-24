(function () {
  'use strict';

  angular
  .module('core')
  .service('getLists', getLists);

  getLists.$inject = [];


  function getLists() {
    return {

      listStates: function listStates() {
        return this.states = ('UT AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' + 'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX VT VA WA WV WI WY').split(' ').map(function (state) {
          return {abbrev: state};
        });
      },

      listPrefixes: function listPrefixes() {
        return this.prefixes = ['', 'Mr.', 'Ms.', 'Dr.']
        .map(function (prefix) {
          return {userPrefix: prefix};
        });
      },

      listRoles: function listRoles() {
        return this.roles = [
          { value: 'User', id: 'user' },
          { value: 'Blocked', id: 'blocked' },
          { value: 'Unregistered', id: 'unregistered' },
          { value: 'Registered', id: 'registered' },
          { value: 'Contributor', id: 'contributor' },
          { value: 'Admin', id: 'admin' },
          { value: 'Super Admin', id: 'superAdmin' },
        ]
        .map(function (role) {
          return {
            id: role.id,
            value: role.value
          };
        });
      },

      listStatuses: function listStatuses() {
        return this.statuses = [
          { auth: 'public', value: 'All', id: 'all' },
          { auth: 'public', value: 'Received', id: 'received' },
          { auth: 'public', value: 'Pending', id: 'pending' },
          { auth: 'public', value: 'Rejected', id: 'rejected' },
          { auth: 'private', value: 'Soft Rejection', id: 'soft_rejection', publicName: 'Rejected' },
          { auth: 'public', value: 'Revise', id: 'revise' },
          { auth: 'public', value: 'Pulled by User', id: 'userPulled' },
          { auth: 'private', value: 'Pulled by Admin', id: 'adminPull', publicName: 'Rejected' },
          { auth: 'public', value: 'Published', id: 'published' },
          { auth: 'public', value: 'Accepted', id: 'accepted' }
        ]
        .map(function (status) {
          return {
            value: status.value,
            id: status.id,
            auth: status.auth,
            publicName: status.publicName || null
          };
        });
      },

      listCategories: function listCategories() {
        return this.categories = [
          { value: 'Essay', id: 'essay' },
          { value: 'Multimedia', id: 'multimedia' },
          { value: 'Video', id: 'video' },
          { value: 'Audio', id: 'audio' },
          { value: 'Photography', id: 'photography' },
          { value: 'This Was Here', id: 'this-was-here' }
        ]
        .map(function (category) {
          return {
            id: category.id,
            value: category.value
          }
        });
      },

      listProjectSorts: function listProjectSorts() {
        return this.projectSorts = [
          { value: 'Date Submitted', id: 'createdOn', auth: ['admin'] },
          { value: 'Publication Date', id: 'publishedOn', auth: ['public'] },
          { value: 'Title', id: 'title', auth: ['public'] },
          { value: 'Contributor', id: 'user.lastName', auth: ['public'] },
          { value: 'Submission Status', id: 'status', auth: ['contributor', 'admin'] }
        ]
        .map(function (sort) {
          return {
            value: sort.value,
            id: sort.id,
            auth: sort.auth
          };
        });
      },

      listFeaturedProjects: function featuredProjects() {
        return this.featuredProjects = [
          { value: 'Featured', id: 'true' },
          { value: 'Not Featured', id: 'false' }
        ];
      },

      listYesNo: function listYesNo() {
        return this.yesNo = [
          { value: 'Yes', id: 'true' },
          { value: 'No', id: 'false' }
        ];
      }

    };
  }

  return getLists;

}());
