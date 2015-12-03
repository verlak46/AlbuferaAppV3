angular.module('starter.services', [])

.factory('Incidents', function ($http, $q) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    /*var incidents = [{
        id: 0,
        categorie: 'PUBLIC_ROAD',
        date: '06-11-2015',
        description: 'Obras en la CV-50',
        image: 'img/albufera1.jpg',
        coords:  {
            latitude: 39.3187009,
            longitude: -0.3074812 
        },
        account: ''
    }, {
        id: 1,
        categorie: 'CLEANING',
        date: '12-08-2015',
        description: 'Alguien ha tirado basura',
        image: 'img/albufera2.jpg',
        coords:  {
            latitude: 39.303859,
            longitude: -0.3293276 
        },
        account: ''
    }, {
        id: 2,
        categorie: 'CLEANING',
        date: '28-07-2015',
        description: 'Alguien ha tirado basura',
        image: 'img/albufera3.jpg',
        coords:  {
            latitude: 39.3024394,
            longitude: -0.3249241
        },
        account: ''
    }, {
        id: 3,
        categorie: 'TRANSPORT',
        date: '15-07-2015',
        description: 'El autobús tarda más de media hora en pasar',
        image: 'img/albufera4.jpg',
        coords:  {
            latitude: 39.3662953,
            longitude: -0.3291161 
        },
        account: ''
    }, {
        id: 4,
        categorie: 'LIGHTING',
        date: '02-04-2015',
        description: 'No funciona la iluminación del paseo',
        image: 'img/albufera5.jpg',
        coords:  {
            latitude: 39.3616838,
            longitude: -0.3206441 
        },
        account: ''
    }, {
        id: 5,
        categorie: 'GRAFFITI',
        date: '22-03-2015',
        description: 'Pintada en la pared este de la antigua estación',
        image: 'img/albufera3.jpg',
        coords:  {
            latitude: 39.3515948,
            longitude: -0.3217262
        },
        account: ''
    },
    {
        id: 6,
        categorie: 'FURNITURE',
        date: '19-03-2015',
        description: 'Han destrozado los bancos del paseo',
        image: 'img/albufera2.jpg',
        coords:  {
            latitude: 39.3212054,
            longitude: -0.342405 
        },
        account: ''
    },
    {
        id: 7,
        categorie: 'LIGHTING',
        date: '02-03-2015',
        description: 'No funciona la iluminación',
        image: 'img/albufera4.jpg',
        coords:  {
            latitude: 39.3062211,
            longitude: -0.3722105 
        },
        account: ''
    },
    {
        id: 8,
        categorie: 'LIGHTING',
        date: '13-02-2015',
        description: 'No funciona la iluminación',
        image: 'img/albufera1.jpg',
        coords:  {
            latitude: 39.2967599,
            longitude: -0.3448249 
        },
        account: ''
    }];*/

    //var incidents = [];
    //var categories = [];

    /*$http.get('http://c2566322-0.web-hosting.es/albufera/index.php/incidents').then(function(resp) {
        //console.log('Success', resp);
        // For JSON responses, resp.data contains the result
        incidents = resp.data;
        console.log(incidents);
    }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
        console.log(err.status);
    });*/

    /*$http.get('http://c2566322-0.web-hosting.es/albufera/index.php/categories').then(function(resp) {
        console.log('Success', resp);
        // For JSON responses, resp.data contains the result
        categories = resp.data;
    }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
        console.log(err.status);
    });

    for (var i=0; i < incidents.length; i++) {

        var idCategorie = incidents[i].idCategorie;

        for (var j=0; i < categories.length; j++) {
            if (idCategorie === categories[j].id) {
                incidents[i].categorie = categories[j].name;
                console.log(incidents[i].categorie);
            }
        }
    }*/

    var incidents = [];

    return {
        all: function () {
            var defer = $q.defer();

            $http.get('http://c2566322-0.web-hosting.es/albufera/index.php/incidents').then(function(resp) {
                console.log('Success', resp);
                // For JSON responses, resp.data contains the result
                incidents = resp.data;
                defer.resolve(resp.data);
            }, function(err) {
                console.error('ERR', err);
                // err.status will contain the status code
            });
            return defer.promise;
        },
        get: function (incidentId) {
            for (var i = 0; i < incidents.length; i++) {
                if (incidents[i].id === parseInt(incidentId)) {
                    return incidents[i];
                }
            }
            return null;
        },
        getAll: function () {
            return incidents;
        } 
    };
})

.factory('Categories', function ($http, $q) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    /*var categories = [{
        id: 0,
        name: 'CLEANING',
        icon: 'ion-trash-a',
    }, {
        id: 1,
        name: 'PUBLIC_ROAD',
        icon: 'ion-android-car'
    }, {
        id: 2,
        name: 'SIGNS',
        icon: 'ion-ios-flag'
    }, {
        id: 3,
        name: 'GRAFFITI',
        icon: 'ion-paintbrush'
    }, {
        id: 4,
        name: 'FURNITURE',
        icon: 'ion-cube'
    }, {
        id: 5,
        name: 'GARDENS',
        icon: 'ion-ios-rose'
    }, {
        id: 6,
        name: 'LIGHTING',
        icon: 'ion-ios-lightbulb'
    }, {
        id: 7,
        name: 'TRANSPORT',
        icon: 'ion-android-bus'
    }, {
        id: 8,
        name: 'IDEAS',
        icon: 'ion-alert-circled'
    }, {
        id: 9,
        name: 'FACILITIES',
        icon: 'ion-ios-home'
    }, {
        id: 10,
        name: 'IMPROVEMENTS',
        icon: 'ion-wrench'
    }, {
        id: 11,
        name: 'OTHERS',
        icon: 'ion-alert-circled'
    }];*/

    var categories = [];

    return {
        all: function () {
            var defer = $q.defer();

            $http.get('http://c2566322-0.web-hosting.es/albufera/index.php/categories').then(function(resp) {
                console.log('Success', resp);
                // For JSON responses, resp.data contains the result
                categories = resp.data;
                defer.resolve(resp.data);
            }, function(err) {
                console.error('ERR', err);
                // err.status will contain the status code
            });
            return defer.promise;
        },
        get: function (categorieId) {
            for (var i = 0; i < categories.length; i++) {
                if (categories[i].id === parseInt(categorieId)) {
                    return categories[i];
                }
            }
            return null;
        },
        getAll: function () {
            return categories;
        }
    };
})

.factory('Images', ['$q', function ($q) {

    return {
        GetPicture: function (options) {
            var cameraOptions = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
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
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
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
        language: ''
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
        this.timestamp = +new Date;

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
});