(function () {
  'use strict';

  angular.module('core')
  .directive('mapViewDirective', mapViewDirective);

  mapViewDirective.$inject = [];

  function mapViewDirective() {
    return {
      restrict: 'EA',
      templateUrl: '/modules/core/client/directives/views/map-view-directive.html',
      controller: controller,
      controllerAs: 'vm'
    };

    function controller($scope, ApiKeys) {
      var vm = this;


      /** attribution toggle */
      $scope.attributionFull = false;
      $scope.attributionText = '<div style="padding: 0 5px 0 2px"><a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>(the world\'s best maps) & <a href="http://leafletjs.com/" target="_blank">Leaflet</a>, with map data by <a href="http://openstreetmap.org/copyright">OpenStreetMap©</a> | <a href="http://mapbox.com/map-feedback/" class="mapbox-improve-map">Improve this map</a></div>';


      /** `info` id is part of creating tooltip with absolute position */
      var info = document.getElementById('info');

      /** Map legend */
      /** markup for legend */
      var legend = '<div style="padding: 0 5px 0 2px"><a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>(the world\'s best maps) & <a href="http://leafletjs.com/" target="_blank">Leaflet</a>, with map data by <a href="http://openstreetmap.org/copyright">OpenStreetMap©</a> | <a href="http://mapbox.com/map-feedback/" class="mapbox-improve-map">Improve this map</a></div>';



      /** call map and add functionality **/
      var mapFunction = function (mapboxAccessToken) {
        console.log('function function what\'s your junction???');
        mapboxgl.accessToken = mapboxAccessToken;

        //set map default properties
        var mapProperties = {
          container: 'map',
          style: 'mapbox://styles/poetsrock/citc62oc100032hpb03d4we1c',
          center: [-111.8689467, 40.7630772],
          zoom: 12
        };

        // initialize map
        var map = new mapboxgl.Map(mapProperties);

        // Add zoom and rotation controls to the map.
        map
          .addControl(new mapboxgl.Navigation())
          .setMinZoom(10);
        // .fitBounds([[-114.598732, 41.90], [-108.593337, 36.4]], {padding: 25});


        /** toggle for map legend */
        // console.log('map.getContainer():\n', map.getContainer());
        // map.getContainer().querySelector('#legend').onclick = function () {
        //   if (this.className === 'active') {
        //     map.legendControl.removeLegend(legend);
        //     this.className = '';
        //   } else {
        //     map.legendControl.addLegend(legend);
        //     this.className = 'active';
        //   }
        //   return false;
        // };


        /** adds event listener for click on main map **/
        map.on('click', function (event) {
          /** if $scope.showAll is true, then main menu is open; MenuService.killClass() removes class "my-open-all", which closes menu  **/

          if ($scope.showAll) { MenuService.killClass(); }
          if($scope.toggleSidebar) {
            // $scope.showSidebar(event.target._leaflet_id, event.target._geojson.properties, false);
            $rootScope.$broadcast('MenuService.toggleSidebar', 0, null, true);
          }
        });

      };


      this.$onInit = function () {
        ApiKeys.getApiKeys()
        .then(function (apiKeys) {
          console.log('apiKeys\n', apiKeys);
          mapFunction(apiKeys.data.MAPBOX_KEY);
        }, function getApiKeysErrorCb(err) {
          console.error('Error getting Mapbox public api key\n', err);
        });
      };

    }
  }
}());



