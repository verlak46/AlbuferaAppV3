angular.module('starter.services', [])

.value('baseApiUrl', 'http://albuferadevalencia.vl17860.dinaserver.com/admin/api/app.php/')

.factory('Init', function ($http, $q, baseApiUrl) {

    return {
        all: function () {
            var defer = $q.defer();

            $http.get(baseApiUrl + 'init').then(function(resp) {
                console.log('Success', resp);
                // For JSON responses, resp.data contains the result
                defer.resolve(resp.data);
            }, function(err) {
                console.error('ERR', err);
                defer.resolve('error');
                // err.status will contain the status code
            });
            return defer.promise;
        }
    };
})

.factory('Incidents', function ($http, $q, baseApiUrl) {

    var incidents = [];

    return {
        all: function () {
            var defer = $q.defer();

            $http.get(baseApiUrl + 'incidents').then(function(resp) {
                console.log('Success', resp);
                incidents = resp.data;
                // For JSON responses, resp.data contains the result
                defer.resolve(resp.data);
            }, function(err) {
                console.error('ERR', err);
                defer.resolve('error');
                // err.status will contain the status code
            });

            return defer.promise;
        },
        get: function (incidentId) {
            for (var i = 0; i < incidents.length; i++) {
                if (parseInt(incidents[i].id) === parseInt(incidentId)) {
                    return incidents[i];
                }
            }
            return null;
        },
        save: function(data) {
            incidents = data;
        },
        getAll: function () {
            return incidents;
        },
        post: function(data) {
            var defer = $q.defer();
            
            $http({
                url: baseApiUrl + 'incidents',
                method: "POST",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
                /*withCredentials: true,
                headers: {
                    'Authorization': 'Basic bashe64usename:password'
                }*/
            }).then(function(resp) {
                console.log('Success', resp);
                //incidents = resp.data;
                defer.resolve(resp.data);
                // For JSON responses, resp.data contains the result
                defer.resolve(resp.data);
            }, function(err) {
                console.error('ERR', err);
                defer.resolve('error');
                // err.status will contain the status code
            });

            return defer.promise;
        }
    };
})

.factory('Activities', function ($http, $q, baseApiUrl) {

    var activities = [];

    return {
        all: function () {
            var defer = $q.defer();

            $http.get(baseApiUrl + 'activities').then(function(resp) {
                console.log('Success', resp);
                activities = resp.data;
                // For JSON responses, resp.data contains the result
                defer.resolve(resp.data);
            }, function(err) {
                console.error('ERR', err);
                defer.resolve('error');
                // err.status will contain the status code
            });

            return defer.promise;
        },
        get: function (activityId) {
            for (var i = 0; i < activities.length; i++) {
                if (parseInt(activities[i].id) === parseInt(activityId)) {
                    return activities[i];
                }
            }
            return null;
        },
        save: function(data) {
            activities = data;
        },
        getAll: function () {
            return activities;
        }
    };
})

.factory('Categories', function ($http, $q, baseApiUrl) {

    var categories = [];

    return {
        all: function () {
            var defer = $q.defer();

            $http.get(baseApiUrl + 'categories').then(function(resp) {
                console.log('Success', resp);
                // For JSON responses, resp.data contains the result
                categories = resp.data;
                defer.resolve(resp.data);
            }, function(err) {
                console.error('ERR', err);
                defer.resolve(err.status);
                // err.status will contain the status code
            });
            return defer.promise;
        },
        get: function (categorieId) {
            for (var i = 0; i < categories.length; i++) {
                if (parseInt(categories[i].id) === parseInt(categorieId)) {
                    return categories[i];
                }
            }
            return null;
        },
        save: function(data) {
            categories = data;
        },
        getAll: function () {
            return categories;
        }
    };
})

.factory('ActivityTypes', function ($http, $q, baseApiUrl) {

    var activityTypes = [];

    return {
        all: function () {
            var defer = $q.defer();

            $http.get(baseApiUrl + 'activity_types').then(function(resp) {
                console.log('Success', resp);
                // For JSON responses, resp.data contains the result
                activityTypes = resp.data;
                defer.resolve(resp.data);
            }, function(err) {
                console.error('ERR', err);
                defer.resolve(err.status);
                // err.status will contain the status code
            });
            return defer.promise;
        },
        get: function (activityTypeId) {
            for (var i = 0; i < activityTypes.length; i++) {
                if (parseInt(activityTypes[i].id) === parseInt(activityTypeId)) {
                    return activityTypes[i];
                }
            }
            return null;
        },
        save: function(data) {
            activityTypes = data;
        },
        getAll: function () {
            return activityTypes;
        }
    };
})

.factory('Images', ['$q', function ($q) {

    return {
        GetPicture: function (options) {
            var cameraOptions = {
                quality: 90,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 800,
                targetHeight: 800,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            var q = $q.defer();

            navigator.camera.getPicture(function (result) {
                // Do any magic you need
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, cameraOptions);

            return q.promise;
        },

        ChoosePicture: function (options) {
            var cameraOptions = {
                quality: 90,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 800,
                targetHeight: 800,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            var q = $q.defer();

            navigator.camera.getPicture(function (result) {
                // Do any magic you need
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, cameraOptions);

            return q.promise;
        }
    };
}])

.factory('StorageService', function ($localStorage) {

    $localStorage = $localStorage.$default({
        incidents: [],
        favorites: [],
        firstVisit: true,
        language: '',
        notSent: []
    });

    return {
        get: function (incidentId) {
            for (var i = 0; i < $localStorage.incidents.length; i++) {
                if (parseInt($localStorage.incidents[i].id) === parseInt(incidentId)) {
                    return $localStorage.incidents[i];
                }
            }
            return null;
        },
        getAll: function () {
            return $localStorage.incidents;
        },
        getNotSent: function (incidentId) {
            for (var i = 0; i < $localStorage.notSent.length; i++) {
                if (parseInt($localStorage.notSent[i].id) === parseInt(incidentId)) {
                    return $localStorage.notSent[i];
                }
            }
            return null;
        },
        getAllNotSent: function () {
            return $localStorage.notSent;
        },
        removeNotSent: function (incidentId) {
            for (var i = 0; i < $localStorage.notSent.length; i++) {
                if (parseInt($localStorage.notSent[i].id) === parseInt(incidentId)) {
                    $localStorage.notSent.splice(i, 1);
                    break;
                }
            }
        },
        addNotSent: function (incident) {
            $localStorage.notSent.unshift(incident);
        },
        add: function (incident) {
            $localStorage.incidents.unshift(incident);
        },
        addAccount: function (account) {
            $localStorage.account = account;
        },
        getAccount: function () {
            return $localStorage.account;
        },
        addToFavorites: function (favorite) {
            // Check if incident is in array yet
            for (var i = 0; i < $localStorage.favorites.length; i++) {
                if (parseInt($localStorage.favorites[i].id) === parseInt(favorite.id)) {
                    return null;
                }
            }
            // else...
            $localStorage.favorites.unshift(favorite);
        },
        getAllFavorites: function () {
            return $localStorage.favorites;
        },
        getFavorite: function (incidentId) {
            for (var i = 0; i < $localStorage.favorites.length; i++) {
                if (parseInt($localStorage.favorites[i].id) === parseInt(incidentId)) {
                    return $localStorage.favorites[i];
                }
            }
            return null;
        },
        removeFavorite: function (incident) {
            $localStorage.favorites.splice($localStorage.favorites.indexOf(incident), 1);
        },
        isFirstVisit: function () {
            return $localStorage.firstVisit;
        },
        setFirstVisit: function () {
            $localStorage.firstVisit = false;
        },
        getLanguage: function () {
            return $localStorage.language;
        },
        setLanguage: function (language) {
            $localStorage.language = language;
        }
    };
})

// Unique ID generator
.factory('IDGenerator', function () {

    function IDGenerator() {

        this.length = 8;
        this.timestamp = Date.now();

        var _getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        this.generate = function () {
            var ts = this.timestamp.toString();
            var parts = ts.split("").reverse();
            var id = "";

            for (var i = 0; i < this.length; ++i) {
                var index = _getRandomInt(0, parts.length - 1);
                id += parts[index];
            }

            return id;
        };
    }

    return {
        generate: function () {
            var generator = new IDGenerator();
            return generator.generate();
        }
    };
})

.factory('CategorieFilter', function () {
    categorieIncludes = []; // This array contains the categories to filter

    return {
        includeCategorie: function (categorie) {
            var i = categorieIncludes.indexOf(categorie);
            if (i > -1) {
                categorieIncludes.splice(i, 1); // Remove categorie from array
            } else {
                categorieIncludes.push(categorie); // Add categorie to array
            }
        },
        filter: function (incident) { // Receive the incident passed by the angularjs filter and checks if the category is in the array
            if (categorieIncludes.length > 0) {
                if (categorieIncludes.indexOf(incident.categorie) < 0) // If the categorie of the incident is in the array...
                    return null; // .. don't show.
            }

            return incident; // Else, show!
        }
    };
})

.factory('ActivityTypeFilter', function () {
    activityTypeIncludes = []; // This array contains the types to filter

    return {
        includeType: function (type) {
            var i = activityTypeIncludes.indexOf(type);
            if (i > -1) {
                activityTypeIncludes.splice(i, 1); // Remove type from array
            } else {
                activityTypeIncludes.push(type); // Add type to array
            }
        },
        filter: function (activity) { // Receive the activity passed by the angularjs filter and checks if the type is in the array
            if (activityTypeIncludes.length > 0) {
                if (activityTypeIncludes.indexOf(activity.activityType) < 0) // If the type of the activity is in the array...
                    return null; // .. don't show.
            }

            return activity; // Else, show!
        }
    };
})

.factory('AddMarker', function($window) {

    return {
        addIncident: function(i, scope){
            var marker = {
                id: i,
                idKey: "id",
                latitude: scope.incidents[i].coords.latitude,
                longitude: scope.incidents[i].coords.longitude,
                show: false,
                categorie: scope.incidents[i].categorie,
                id_incident: scope.incidents[i].id,
                description: scope.incidents[i].description,
                image: scope.incidents[i].image,
                icon: 'img/green_marker.png'
            };
            return marker;
        },
        addActivity: function(i, scope, image){
            var marker = {
                position: {
                    lat: scope.activities[i].coords.latitude,
                    lon: scope.activities[i].coords.longitude
                },
                title: image,
                snippet: scope.activities[i].description,
                icon: {
                    url: "www/img/green_marker.png"
                },
                draggable: false,
                disableAutoPan: true,
                animation: "BOUNCE",
                infoClick: function() {
                    $window.location.href = "#/tab/activities/" + scope.activities[i].id;
                }
            };
            return marker;
        }
    }; 
})

.factory('createMapServ', function() {
    return {
        create: function(scope) {

            console.log("yeeeeeeeeeeeeeeee");
            // Map Functionality
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
            //map.clear();
            //map.off();

            // Espera a que este preparado
            map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

            function onMapReady() {
                console.log("readyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
                // Resetea el mapa
                map.clear();
                map.off();
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


                // Geocoder functionality
                if(scope.map.isGeocoderMap === true) {
                    $("#"+scope.map.searchID).off();
                    $("#"+scope.map.searchID).on("click", function() {
                        var request = {
                            address: $("#"+scope.map.inputID).val()
                        };

                        // Comprueba si no existe la propiedad marker
                        if(scope.map.marker === undefined || scope.map.marker === null) {
                            scope.map.marker = {};
                        }

                        // Genera el mapa
                        plugin.google.maps.Geocoder.geocode(request, geocoderCallback);

                        function geocoderCallback(results) {
                            if(results.length) {
                                var result = results[0]; 

                                map.animateCamera({
                                    target: result.position,
                                    zoom: scope.map.zoom || 17
                                }, function() {
                                    setTimeout(function() {
                                        var markerData = {
                                            position: result.position,
                                            title: scope.map.marker.title || JSON.stringify(result),
                                            snippet: scope.map.marker.snippet || "",
                                            icon: scope.map.marker.icon || {'url':"http://www.google.com/mapfiles/marker.png"},
                                            draggable: scope.map.marker.draggable || false,
                                            disableAutoPan: scope.map.marker.disableAutoPan || false,
                                            markerClick: scope.map.marker.markerClick || function(){},
                                            infoClick: scope.map.marker.infoClick || function(){}
                                        };

                                        if(scope.map.marker.animation == "DROP") {
                                            markerData.animation = plugin.google.maps.Animation.DROP;
                                        } else if(scope.map.marker.animation == "BOUNCE") {
                                            markerData.animation = plugin.google.maps.Animation.BOUNCE;
                                        }

                                        map.addMarker(markerData, function(marker) {
                                            var autoOpenInfoWindow = true;
                                            // Comprueba si se ha rellenado la opcion o debe coger la opcion por defecto
                                            if(typeof scope.map.marker.autoOpenInfoWindow == 'boolean') {
                                                if(scope.map.marker.autoOpenInfoWindow === true) {
                                                    marker.showInfoWindow();
                                                }
                                            } else {
                                                marker.showInfoWindow();
                                            }
                                        });
                                    }, 1500);
                                });
                            } else {
                                if(scope.map.notFoundCallback) {
                                    scope.map.notFoundCallback();
                                } else {
                                    alert("No se ha encontrado");
                                }
                            }
                        }
                    });
                }
            }

            scope.$watch("map", function(data) {
                scope.map = data;
                onMapReady();
            });
        }
    };
});