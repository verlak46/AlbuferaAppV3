angular.module('starter.directives', [])

.directive("createMap",function($parse) {
   return {
        restrict: 'A',
        scope: { map:'=createMap' },
        link: function(scope, element, attrs) {
            var div = document.getElementById(scope.map.mapID);
            var map = null;
            var mapOptions = {
                camera: {
                    latLng: new plugin.google.maps.LatLng(40.3732626, -3.705482),
                    zoom: 4
                },
                mapType: plugin.google.maps.MapTypeId.ROADMAP
            };

            // Establece un centro para el mapa
            if(scope.map.center) {
                mapOptions.camera.latLng = new plugin.google.maps.LatLng(scope.map.center.lat, scope.map.center.lon);
            }

            // Estrablece el zoom
            if(scope.map.zoom) {
                mapOptions.camera.zoom = scope.map.zoom;
            }

            // Tipo mapa
            if(scope.map.mapType == "HYBRID") {
                mapOptions.mapType = plugin.google.maps.MapTypeId.HYBRID;
            } else if(scope.map.mapType == "TERRAIN") {
                mapOptions.mapType = plugin.google.maps.MapTypeId.TERRAIN;
            } else if(scope.map.mapType == "SATELLITE") {
                mapOptions.mapType = plugin.google.maps.MapTypeId.SATELLITE;
            }

            // Initializa la visualizacion del mapa
            map = plugin.google.maps.Map.getMap(div, mapOptions);

            // Resetea el mapa
            map.clear();
            map.off();

            // Espera a que este preparado
            map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

            function onMapReady() {
                map.setOptions(mapOptions);
                map.refreshLayout();

                // Añade los marcadores
                if(scope.map.markers) {
                    for(var i = 0; i < scope.map.markers.length; i++) {
                        var marker = scope.map.markers[i];
                        var markerData = {
                            position: new plugin.google.maps.LatLng(marker.position.lat, marker.position.lon),
                            title: marker.title || "",
                            snippet: marker.snippet || "",
                            icon: marker.icon || {'url':"http://www.google.com/mapfiles/marker.png"},
                            draggable: marker.draggable || false,
                            disableAutoPan: marker.disableAutoPan || false,
                            markerClick: marker.markerClick || function(){},
                            infoClick: marker.infoClick || function(){}
                        };

                        if(marker.animation == "DROP") {
                            markerData.animation = plugin.google.maps.Animation.DROP;
                        } else if(marker.animation == "BOUNCE") {
                            markerData.animation = plugin.google.maps.Animation.BOUNCE;
                        }
                        map.addMarker(markerData);
                    }
                }

                if(scope.onReady) {
                    scope.onReady();
                }
            }
        }
    };
});