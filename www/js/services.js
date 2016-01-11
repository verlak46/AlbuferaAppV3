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
                incidents = resp.data;
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
        this.timestamp = new Date();

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
}).

factory('CategorieFilter', function () {
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
                    return; // .. don't show.
            }

            return incident; // Else, show!
        }
    };
}).

factory('ActivityTypeFilter', function () {
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
                    return; // .. don't show.
            }

            return activity; // Else, show!
        }
    };
});