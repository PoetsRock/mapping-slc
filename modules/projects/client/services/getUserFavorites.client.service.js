'use strict';

angular.module('projects').factory('userFavoritesService', ['$http', 'Authentication',
  function ($http, Authentication) {

    var user = Authentication.user;

    var removeItemFromArray = function(item) {
      var updatedFavProjects = user.favorites.indexOf(item);
      if (updatedFavProjects !== -1) {
        return user.favorites.splice(updatedFavProjects, 1);
      }
    };
    var addItemToArray = function(addedItem) {
      return user.favorites.push(addedItem);
    };

    return {

      getUserFavoriteStories: function (userFavoriteProjects, projectId, callback) {
        var err;
        var isFavorite;
        userFavoriteProjects.forEach(function (userFavoriteProject) {
          if (userFavoriteProject === projectId) {
            isFavorite = true;
            return callback(err, isFavorite);
          }
        });
      },

      toggleFavProject: function (isFavorite, project) {
      isFavorite = !isFavorite;
      var updateFavoriteObj = { favorite: project.id };

      if (!isFavorite) {
        updateFavoriteObj.isFavorite = false;
        removeItemFromArray(project.id);
      } else {
        addItemToArray(project.id);
        updateFavoriteObj.isFavorite = true;
      }
      $http.put('/api/v1/users/' + user._id, updateFavoriteObj)
        .then(function (resolved) {
          console.log('SUCCESS!!: var `resolved`\n:', resolved);
          return resolved;
        }, function errorCallback(err) {
          return err;
        });
    }

  }

  }
]);
