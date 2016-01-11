angular.module('starter', ['ionic', 'ngCordova', 'ngStorage', 'pascalprecht.translate', 'uiGmapgoogle-maps', 'starter.controllers', 'starter.services', 'templates'])

.run(function ($ionicPlatform) {

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function (uiGmapGoogleMapApiProvider, $translateProvider, $httpProvider) {

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    /*$httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';*/

    // Google Maps Configuration
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAayzuHxlfJUmzMRkBRHIxvXOen2dTYUyU',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });

    // Translate Configuration
    $translateProvider.useStaticFilesLoader({
    prefix: 'languages/',
    suffix: '.json'
    });

    //$translateProvider.useLocalStorage();
    $translateProvider.preferredLanguage('es');
    $translateProvider.useSanitizeValueStrategy('escape');
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Set tabs on top of the screen
    $ionicConfigProvider.tabs.position('top');
    // Set custom text to back button
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    // Align view-title
    $ionicConfigProvider.navBar.alignTitle('center');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "tabs.html"
        }
    )

    // Each tab has its own nav history stack:

    // INCIDENTS TABS
    .state('tab.incidents-map', {
        url: '/incidents-map',
        views: {
            'tab-incidents': {
                templateUrl: 'incidents/tab-incidents-map.html',
                controller: 'IncidentsMapCtrl'
            }
        }
    })
        .state('tab.incidents', {
            url: '/incidents',
            views: {
                'tab-incidents': {
                    templateUrl: 'incidents/tab-incidents.html',
                    controller: 'IncidentsCtrl'
                }
            }
        })
        /*.state('tab.incidents-grid', {
            url: '/incidents-grid',
            views: {
                'tab-incidents': {
                    templateUrl: 'templates/incidents/tab-incidents-grid.html',
                    controller: 'IncidentsCtrl'
                }
            }
        })*/
        .state('tab.new', {
            url: '/new',
            views: {
                'tab-incidents': {
                    templateUrl: 'incidents/tab-new.html',
                    controller: 'CategoriesCtrl'
                }
            }
        })
        .state('tab.new-incident-form', {
            url: '/new/:categorieId',
            views: {
                'tab-incidents': {
                    templateUrl: 'incidents/new-incident-form.html',
                    controller: 'NewIncidentCtrl'
                }
            }
        })
      .state('tab.incident-detail', {
          url: '/incidents/:incidentId',
          views: {
              'tab-incidents': {
                  templateUrl: 'incidents/incident-detail.html',
                  controller: 'IncidentDetailCtrl'
              }
          }
      })

    // MY INCIDENTS TABS
    .state('tab.my-incidents-map', {
        url: '/my-incidents-map',
        views: {
            'tab-my-incidents': {
                templateUrl: 'incidents/tab-my-incidents-map.html',
                controller: 'MyIncidentsMapCtrl'
            }
        }
    })
        .state('tab.my-incidents', {
            url: '/my-incidents',
            views: {
                'tab-my-incidents': {
                    templateUrl: 'incidents/tab-my-incidents.html',
                    controller: 'MyIncidentsCtrl'
                }
            }
        })
        
        /*.state('tab.my-incidents-grid', {
            url: '/my-incidents-grid',
            views: {
                'tab-my-incidents': {
                    templateUrl: 'templates/incidents/tab-my-incidents-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })*/
        .state('tab.my-incident-detail', {
            url: '/my-incidents/:incidentId',
            views: {
                'tab-my-incidents': {
                    templateUrl: 'incidents/my-incident-detail.html',
                    controller: 'MyIncidentDetailCtrl'
                }
            }
        })

    // FAVORITES TABS
    .state('tab.favorites-map', {
        url: '/favorites-map',
        views: {
            'tab-favorites': {
                templateUrl: 'incidents/tab-favorites-map.html',
                controller: 'FavoritesMapCtrl'
            }
        }
    })
        .state('tab.favorites', {
            url: '/favorites',
            views: {
                'tab-favorites': {
                    templateUrl: 'incidents/tab-favorites.html',
                    controller: 'FavoritesCtrl'
                }
            }
        })
        
        /*.state('tab.favorites-grid', {
            url: '/favorites-grid',
            views: {
                'tab-favorites': {
                    templateUrl: 'templates/incidents/tab-favorites-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })*/
        .state('tab.favorite-detail', {
            url: '/favorites/:incidentId',
            views: {
                'tab-favorites': {
                    templateUrl: 'incidents/favorite-detail.html',
                    controller: 'FavoriteDetailCtrl'
                }
            }
        })

    /// ACTIVITIES TABS
    .state('tab.activities-map', {
        url: '/activities-map',
        views: {
            'tab-activities': {
                templateUrl: 'activities/tab-activities-map.html',
                controller: 'ActivitiesMapCtrl'
            }
        }
    })
        .state('tab.activities', {
            url: '/activities',
            views: {
                'tab-activities': {
                    templateUrl: 'activities/tab-activities.html',
                    controller: 'ActivitiesCtrl'
                }
            }
        })
        /*.state('tab.activities-grid', {
            url: '/activities-grid',
            views: {
                'tab-activities': {
                    templateUrl: 'templates/activities/tab-activities-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })*/
        .state('tab.activity-detail', {
            url: '/activities/:activityId',
            views: {
                'tab-activities': {
                    templateUrl: 'activities/activity-detail.html',
                    controller: 'ActivityDetailCtrl'
                }
            }
        })
    // ACCOUNT TAB
    .state('account', {
        url: '/account',
        templateUrl: 'account.html',
        controller: 'AccountCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/incidents-map');
});

angular.module('starter.controllers', [])

.controller('IncidentsMapCtrl', function ($scope, $stateParams, $ionicHistory, $ionicLoading, $ionicPopup, $ionicModal, $filter, $translate, Init, Incidents, Categories, Activities, ActivityTypes, CategorieFilter, StorageService) {

    "ngInject";
    $scope.incidents = '';
    $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};
    $scope.marker = {
        options: {
            draggable: false,
            icon: 'img/green_marker.png'
        }
    };

    // Refresh Map
    $scope.$on( "$ionicView.enter", function() {
        $ionicHistory.clearCache();
        $scope.incidents = Incidents.getAll();
    });

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000
    });

    // Data initialization
    Init.all().then(function(data) {
        console.log(data);

        if (data === 'error') {
            // An error occured. Show a message to the user
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: $filter('translate')('ERROR_RECOVERY'),
                okType: 'button-balanced'
            });
            alertPopup.then(function (res) {
            });
        }

        Incidents.save(data.incidents);
        $scope.incidents = Incidents.getAll();
        Categories.save(data.categories);
        $scope.categories = Categories.getAll();
        Activities.save(data.activities);
        ActivityTypes.save(data.activityTypes);

        var checkData = function(data) {
            if (data === 'error') {
                console.log('Error');
            } else {
                // Remove incident from not sent
                var localIncident = StorageService.getNotSent(notSentIncidents[i].id);
                StorageService.removeNotSent(localIncident);
            }
        };

        // Check if there are any incident to sent
        var notSentIncidents = StorageService.getAllNotSent();

        for (var i = 0; i < notSentIncidents.length; i++) {
             
            var newIncident = StorageService.getNotSent(notSentIncidents[i].id);

            newIncident.categorie = newIncident.categorieId;

            Incidents.post(newIncident).then(checkData(data));
        }
    });

    // Geolocation
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    // onSuccess Geolocation
    function onSuccess(data) {
        
        // Mark's user location
        $scope.markerUser = {
            id: 1000,
            show: false,
            coords: {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            },
            options: {
                draggable: false,
                icon: 'img/pegman.png'
            }
        };
    }

    // onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }


    if (StorageService.isFirstVisit()) {
        // Language Selection at first visit
        $ionicPopup.show({
            template: $filter('translate')('SELECTED_LANGUAGE'),
            title: $filter('translate')('CHOOSE_LANGUAGE'),
            scope: $scope,
            buttons: [
            {
              text: $filter('translate')('SPANISH'),
              type: 'button-balanced',
              onTap: function () {
                return 'es';
              }
          },
          {
              text: $filter('translate')('ENGLISH'),
              type: 'button-balanced',
              onTap: function () {
                return 'en';
              }
          }]
        }).then(function (res) {

            StorageService.setFirstVisit();

            if (res === 'en') {
                StorageService.setLanguage('en');
                $translate.use(StorageService.getLanguage());
            } else {
                StorageService.setLanguage('es');
                $translate.use(StorageService.getLanguage());
            }
        });    
    // If not the first visit, set stored language
    } else {
        $translate.use(StorageService.getLanguage());
    }

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/incidents/filter-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        // Setup the loader
        $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 1000
        });

        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    };

})

.controller('IncidentsCtrl', function ($scope, $ionicPopup, $ionicLoading, $filter, $translate, Incidents, Categories, CategorieFilter) {
    
    $scope.incidents = Incidents.getAll();
    $scope.categories = Categories.getAll();

    // On pull refresh
    $scope.doRefresh = function() {
        Incidents.all().then(function(data) {
            console.log(data);

            if (data === 'error') {
                // An error occured. Show a message to the user
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: $filter('translate')('ERROR_RECOVERY'),
                    okType: 'button-balanced'
                });
                alertPopup.then(function (res) {
                });
            }

            $scope.incidents = Incidents.getAll();
            $scope.$broadcast('scroll.refreshComplete');
        });

        Categories.all().then(function(data) {

            $scope.categories = Categories.getAll();

            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    // CategorieFilter //
    $scope.includeCategorie = function (categorie) {
        // Setup the loader
        $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 1000
        });

        CategorieFilter.includeCategorie(categorie);
        $ionicLoading.hide();
    };

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    };
})

.controller('IncidentDetailCtrl', function ($scope, $stateParams, $ionicPopup, $filter, $cordovaSocialSharing, Incidents, StorageService) {
    
    $scope.incident = Incidents.get($stateParams.incidentId);

    // Social Sharing
    $scope.share = function() {
        $cordovaSocialSharing
        .share($scope.incident.description, $scope.incident.categorie,
            $scope.incident.image, null) // Share via native share sheet
        .then(function(result) {
          // Success!
          console.log('sharing');
      }, function(err) {
          // An error occured. Show a message to the user
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: $filter('translate')('ERROR_SHARE'),
                okType: 'button-balanced'
            });
            alertPopup.then(function (res) {
            });
      });
    };

    $scope.addToFavorites = function () {
        if (StorageService.addToFavorites($scope.incident) === null) {
            // An alert dialog
            $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('WARNING'),
                    template: $filter('translate')('ALREADY'),
                    okType: 'button-balanced'
                });
                alertPopup.then(function (res) {
                });
            };

            $scope.showAlert();
        } else {
            // An alert dialog
            $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('NOTICE'),
                    template: $filter('translate')('ADDED'),
                    okType: 'button-balanced'
                });
                alertPopup.then(function (res) {
                });
            };

            $scope.showAlert();
        }
    };
})

.controller('CategoriesCtrl', function ($scope, Categories) {

    $scope.categories = Categories.getAll();

})

.controller('NewIncidentCtrl', function ($scope, $ionicHistory, $stateParams, $state, $ionicModal, $filter, $log, $ionicPopup, $ionicLoading, Images, Incidents, Categories, StorageService, IDGenerator) {
    
    $scope.categorie = Categories.get($stateParams.categorieId);
    $scope.newForm = {};

    var incidentCoords, userCoords;

    // default userCoords
    userCoords = {
        coords: {
            latitude: 1,
            longitude: 1
        }
     };

    // Modal 1
    $ionicModal.fromTemplateUrl('templates/incidents/new-incident-image-modal.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('templates/incidents/map-modal.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      $ionicHistory.clearCache();
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };

    /* Listen for broadcasted messages */

    $scope.$on('modal.shown', function(event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function(event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope 
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });
  

    // Take photo from Camera
    $scope.takePhoto = function () {
        Images.GetPicture().then(function (data) {
            console.log(data);
            $scope.imgURI = "data:image/jpeg;base64," + data;
            $scope.closeModal(1);
        }, function (err) {
            console.err(err);
        });
    };

    // Choose photo from Gallery
    $scope.choosePhoto = function () {
        Images.ChoosePicture().then(function (data) {
            console.log(data);
            $scope.imgURI = "data:image/jpeg;base64," + data;
            $scope.closeModal(1);
        }, function (err) {
            console.err(err);
        });
    };

    // Incident coordenades
    $scope.getCoordenades = function () {

        $ionicHistory.clearCache();

        $scope.openModal(2);

        // Setup the loader
        $ionicLoading.show({
            content: 'Cargando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
        });

        $scope.newForm.coords = "39.333" + ", " + "-0.367";

        incidentCoords = {
            coords: {
                latitude: 39.333,
                longitude: -0.367
            }
        };

        $scope.marker = {
              id: 0,
              coords: {
                latitude: 39.333,
                longitude: -0.367
              },
              options: { draggable: true, icon: 'img/green_marker.png' },
              events: {
                dragend: function (marker, eventName, args) {
                  $log.log('marker dragend');
                  var lat = marker.getPosition().lat();
                  var lon = marker.getPosition().lng();
                  $scope.newForm.coords =  lat + ", " + lon;
                  incidentCoords.coords.latitude = lat;
                  incidentCoords.coords.longitude = lon;
                  console.log(incidentCoords);

                  $log.log(lat);
                  $log.log(lon);

                  $scope.marker.options = {
                    draggable: true,
                    icon: 'img/green_marker.png',
                    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                  };
                }
            }
        };

        //Center's the map on Albufera coords
        $scope.map = { center: { latitude: $scope.marker.coords.latitude, longitude: $scope.marker.coords.longitude }, zoom: 12};

        $scope.windowOptions = {
            visible: false
        };

        $scope.onClick = function () {
            $scope.windowOptions.visible = !$scope.windowOptions.visible;
        };

        $scope.closeClick = function () {
            $scope.windowOptions.visible = false;
        };

        $ionicLoading.hide();

        // Geolocation
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        // onSuccess Geolocation
        function onSuccess(data) {
            userCoords = {
                coords: {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                }
            };

            $scope.markerUser = {
                id: 1000,
                show: false,
                coords: {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                },
                options: {
                    draggable: false,
                    icon: 'img/pegman.png'
                }
            };
        }

        // onError Callback receives a PositionError object
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
    };

    // Form Validation
    var account = StorageService.getAccount();

    if (account !== undefined) {
        $scope.newForm.name = account.name;
        $scope.newForm.subname = account.subname;
        $scope.newForm.email = account.email;
        $scope.newForm.phone = account.phone;
    }

    // Send incident
    $scope.submit = function () {

        // Setup the loader
        $ionicLoading.show({
            content: 'Cargando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
        });

        var newIncident = {
            //id: parseInt(IDGenerator.generate()),
            categorie: parseInt($scope.categorie.id),
            datetime: new Date().toLocaleString(),
            description: $scope.newForm.description,
            image: $scope.imgURI,
            coords: {
                latitude: incidentCoords.coords.latitude,
                longitude: incidentCoords.coords.longitude
            },
            account: {
                name: $scope.newForm.name,
                subname: $scope.newForm.subname,
                email: $scope.newForm.email,
                phone: $scope.newForm.phone,
                coords: {
                    latitude: userCoords.coords.latitude,
                    longitude: userCoords.coords.longitude
                }
            }
        };

        var newIncidentLocal = {
            id: parseInt(IDGenerator.generate()),
            categorie: $scope.categorie.name,
            datetime: new Date().toLocaleString(),
            description: $scope.newForm.description,
            image: $scope.imgURI,
            coords: {
                latitude: incidentCoords.coords.latitude,
                longitude: incidentCoords.coords.longitude
            },
            account: {
                name: $scope.newForm.name,
                subname: $scope.newForm.subname,
                email: $scope.newForm.email,
                phone: $scope.newForm.phone,
                coords: {
                    latitude: userCoords.coords.latitude,
                    longitude: userCoords.coords.longitude
                }
            },
            categorieId: parseInt($scope.categorie.id),
        };

        console.log(newIncident);

        // Send remote Incident...
        Incidents.post(newIncident).then(function(data) {
            console.log(data);

            $ionicLoading.hide();

            if (data === 'error') {
                $scope.showErrorAlert = function () {
                    // An error occured. Show a message to the user
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: $filter('translate')('ERROR_POST'),
                        okType: 'button-balanced'
                    });
                    alertPopup.then(function (res) {
                    });
                };
                $scope.showErrorAlert();

                // Save Local Incident
                StorageService.add(newIncidentLocal);
                StorageService.addNotSent(newIncidentLocal);
            } else {
                // An alert dialog on success
                $scope.showSuccessAlert = function () {
                    var alertPopup = $ionicPopup.alert({
                        title: $filter('translate')('INCIDENT_SENT'),
                        template: $filter('translate')('THANKS'),
                        okType: 'button-balanced'
                    });
                    alertPopup.then(function (res) {
                    });
                };
                $scope.showSuccessAlert();

                // Save Local Incident
                StorageService.add(newIncidentLocal);
                $scope.newForm = {};
            }

            setTimeout(function() {
                $state.go('tab.incidents-map', {}, { reload: true });
            },20);
        });
    };
})

.controller('MyIncidentsCtrl', function ($scope, $ionicLoading, StorageService, Categories, CategorieFilter) {
    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $scope.incidents = StorageService.getAll();
    $scope.categories = Categories.getAll();

    $ionicLoading.hide();

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        // Setup the loader
        $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 1000,
        });

        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    };
})

.controller('MyIncidentsMapCtrl', function ($scope, $ionicModal, $ionicHistory, $stateParams, $ionicLoading, StorageService, Categories, CategorieFilter) {

    $scope.incidents = StorageService.getAll();
    $scope.categories = Categories.getAll();
    $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};
    $scope.marker = {
        options: {
            draggable: false,
            icon: 'img/green_marker.png'
        }
    };

    // Refresh Map
    $scope.$on( "$ionicView.enter", function() {
        $ionicHistory.clearCache();
        $scope.incidents = StorageService.getAll();
    });

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000
    });

    // Geolocation
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    // onSuccess Geolocation
    function onSuccess(data) {
        // Mark's user location
        $scope.markerUser = {
            id: 1000,
            show: false,
            coords: {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            },
            options: {
                draggable: false,
                icon: 'img/pegman.png'
            }
        };
    }

    // onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/incidents/filter-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        // Setup the loader
        $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 1000,
        });

        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    };
})

.controller('MyIncidentDetailCtrl', function ($scope, $stateParams, $filter, StorageService, $cordovaSocialSharing, CategorieFilter) {
    
    $scope.incident = StorageService.get($stateParams.incidentId);

    // Social Sharing
    $scope.share = function() {
        $cordovaSocialSharing
        .share($scope.incident.description, $scope.incident.categorie,
            $scope.incident.image, null) // Share via native share sheet
        .then(function(result) {
          // Success!
          console.log('sharing');
      }, function(err) {
          // An error occured. Show a message to the user
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: $filter('translate')('ERROR_SHARE'),
                okType: 'button-balanced'
            });
            alertPopup.then(function (res) {
            });
      });
    };
})

.controller('FavoritesCtrl', function ($scope, $ionicLoading, StorageService, Categories, CategorieFilter) {

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $scope.incidents = StorageService.getAllFavorites();
    $scope.categories = Categories.getAll();

    $ionicLoading.hide();

    $scope.remove = function (incident) {
        StorageService.removeFavorite(incident);
    };

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        // Setup the loader
        $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 1000,
        });

        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    };
})

.controller('FavoritesMapCtrl', function ($scope, $ionicModal, $ionicHistory, $stateParams, $ionicLoading, StorageService, Categories, CategorieFilter) {

    $scope.incidents = StorageService.getAllFavorites();
    $scope.categories = Categories.getAll();
    $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};
    $scope.marker = {
        options: {
            draggable: false,
            icon: 'img/green_marker.png'
        }
    };
    
    // Refresh Map
    $scope.$on( "$ionicView.enter", function() {
        $ionicHistory.clearCache();
        $scope.incidents = StorageService.getAllFavorites();
    });

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000
    });

    // Geolocation
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    // onSuccess Geolocation
    function onSuccess(data) {
        // Mark's user location
        $scope.markerUser = {
            id: 0,
            show: false,
            coords: {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            },
            options: {
                draggable: false,
                icon: 'img/pegman.png'
            }
        };
    }

    // onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/incidents/filter-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        // Setup the loader
        $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 1000,
        });

        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    };
})

.controller('FavoriteDetailCtrl', function ($scope, $stateParams, $filter, $cordovaSocialSharing, StorageService) {
    
    $scope.incident = StorageService.getFavorite($stateParams.incidentId);

    // Social Sharing
    $scope.share = function() {
        $cordovaSocialSharing
        .share($scope.incident.description, $scope.incident.categorie,
            $scope.incident.image, null) // Share via native share sheet
        .then(function(result) {
          // Success!
          console.log('sharing');
      }, function(err) {
          // An error occured. Show a message to the user
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: $filter('translate')('ERROR_SHARE'),
                okType: 'button-balanced'
            });
            alertPopup.then(function (res) {
            });
      });
    };
})

.controller('ActivitiesCtrl', function ($scope, $filter, $cordovaSocialSharing, Activities, ActivityTypes, ActivityTypeFilter, StorageService) {

    $scope.activities = Activities.getAll();
    $scope.activityTypes = ActivityTypes.getAll();
    console.log($scope.activityTypes);

    // On pull refresh
    $scope.doRefresh = function() {
        Activities.all().then(function(data) {
            console.log(data);

            if (data === 'error') {
                // An error occured. Show a message to the user
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: $filter('translate')('ERROR_RECOVERY_ACTIVITIES'),
                    okType: 'button-balanced'
                });
                alertPopup.then(function (res) {
                });
            }

            $scope.activities = Activities.getAll();
            $scope.$broadcast('scroll.refreshComplete');
        });

        ActivityTypes.all().then(function(data) {
            console.log(data);

            if (data === 'error') {
                // An error occured. Show a message to the user
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: $filter('translate')('ERROR_RECOVERY_ACTIVITIES'),
                    okType: 'button-balanced'
                });
                alertPopup.then(function (res) {
                });
            }

            $scope.activityTypes = ActivityTypes.getAll();
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    // TypeFilter //
    $scope.includeType = function (type) {
        // Setup the loader
        $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000,
        });

        ActivityTypeFilter.includeType(type);
    };

    $scope.typeFilter = function (activity) {
        return ActivityTypeFilter.filter(activity);
    };
})

.controller('ActivitiesMapCtrl', function ($scope, $ionicModal, $ionicHistory, $stateParams, $ionicLoading, Activities, ActivityTypes, ActivityTypeFilter) {

    $scope.activities = Activities.getAll();
    $scope.activityTypes = ActivityTypes.getAll();
    $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};
    $scope.marker = {
        options: {
            draggable: false,
            icon: 'img/green_marker.png'
        }
    };

    // Refresh Map
    $scope.$on( "$ionicView.enter", function() {
        $ionicHistory.clearCache();
        $scope.incidents = Activities.getAll();
    });

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000
    });

    // Geolocation
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    // onSuccess Geolocation
    function onSuccess(data) {

        // Mark's user location
        $scope.markerUser = {
            id: 0,
            show: false,
            coords: {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            },
            options: {
                draggable: false,
                icon: 'img/pegman.png'
            }
        };
    }

    // onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/activities/filter-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    // TypeFilter //
    $scope.includeType = function (type) {
        // Setup the loader
        $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000,
        });
        
        ActivityTypeFilter.includeType(type);
    };

    $scope.typeFilter = function (activity) {
        return ActivityTypeFilter.filter(activity);
    };
})

.controller('ActivityDetailCtrl', function ($scope, $stateParams, $cordovaInAppBrowser, $ionicPopup, $filter, $cordovaSocialSharing, Activities) {
    
    $scope.activity = Activities.get($stateParams.activityId);

    // Social Sharing
    $scope.share = function() {
        $cordovaSocialSharing
        .share($scope.activity.description, $scope.activity.categorie,
            $scope.activity.image, null) // Share via native share sheet
        .then(function(result) {
          // Success!
          console.log('sharing');
      }, function(err) {
          // An error occured. Show a message to the user
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: $filter('translate')('ERROR_SHARE_ACTIVITY'),
                okType: 'button-balanced'
            });
            alertPopup.then(function (res) {
            });
      });
    };

    // Get there
    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

    $scope.getThere = function() {
       $cordovaInAppBrowser.open('https://maps.google.com/?daddr=' + $scope.activity.coords.latitude + ',' + $scope.activity.coords.longitude + '&dirflg=b', '_system', options);
    };
})

.controller('AccountCtrl', function ($scope, $ionicHistory, $ionicPopup, $filter, $translate, StorageService) {

    var account = StorageService.getAccount();

    // Show or not AccountButton control on Tab
    $scope.showAccountButton = function() {
        if ($ionicHistory.currentView() !== null) {
            if ($ionicHistory.currentView().url === "/account") {
                return false;
            } else {
                return true;
            }
        }
        return true;  
    };

    // Force back button display
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    }); 
    
    // Form Validation
    $scope.account = {};

    if (account !== undefined) {
        $scope.account.name = account.name;
        $scope.account.subname = account.subname;
        $scope.account.email = account.email;
        $scope.account.phone = account.phone;
    }

    $scope.submit = function () {
        var newAccount = {
            name: $scope.account.name,
            subname: $scope.account.subname,
            email: $scope.account.email,
            phone: $scope.account.phone
        };

        StorageService.addAccount(newAccount);

        $ionicHistory.clearCache();

        // An alert dialog
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: $filter('translate')('DATA_SAVED'),
                template: $filter('translate')('YOUR_DATA'),
                okType: 'button-balanced'
            });
            alertPopup.then(function (res) {
                window.history.back();
            });
        };

        $scope.showAlert();
    };

    $scope.changeLanguage = function (key) {
        StorageService.setLanguage(key);
        $translate.use(key);
    };
});
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
        removeNotSent: function (incident) {
            $localStorage.notSent.splice($localStorage.notSent.indexOf(incident), 1);
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
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("account.html","<ion-view view-title=\"{{ \'PROFILE\' | translate }}\">\r\n    <ion-content>\r\n        <ion-list>\r\n            <form name=\"accountForm\" novalidate>\r\n                <div class=\"list card\">\r\n                    <div class=\"item item-divider\">{{ \'LANGUAGE\' | translate }}</div>\r\n                    <div class=\"item item-body\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col col-50\">\r\n                                <button class=\"button button-block button-balanced\" ng-click=\"changeLanguage(\'es\')\">{{ \'SPANISH\' | translate }}</button>\r\n                            </div>\r\n                            <div class=\"col\">\r\n                                <button class=\"button button-block button-balanced\" ng-click=\"changeLanguage(\'en\')\">{{ \'ENGLISH\' | translate }}</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"list card\">\r\n                    <div class=\"item item-divider\">{{ \'CONTACT\' | translate }}</div>\r\n                    <div class=\"item item-text-wrap\">\r\n                        {{ \'THIS_INFO\' | translate }}\r\n                    </div>\r\n                    <div class=\"item item-body\">\r\n                        <div class=\"list\">\r\n                            <label class=\"item item-input\">\r\n                                <input type=\"text\" name=\"name\" placeholder=\"{{ \'NAME\' | translate }}\" ng-model=\"account.name\" required>\r\n                            </label>\r\n                            <label class=\"item item-input\">\r\n                                <input type=\"text\" name=\"subname\" placeholder=\"{{ \'SUBNAME\' | translate }}\" ng-model=\"account.subname\" required>\r\n                            </label>\r\n                            <label class=\"item item-input\">\r\n                                <input type=\"text\" name=\"email\" placeholder=\"{{ \'EMAIL\' | translate }}\" ng-model=\"account.email\" required>\r\n                            </label>\r\n                            <label class=\"item item-input\">\r\n                                <input type=\"text\" name=\"phone\" placeholder=\"{{ \'PHONE\' | translate }}\" ng-model=\"account.phone\" required>\r\n                            </label>\r\n                            <div>\r\n                                <button class=\"button button-full button-balanced\" ng-disabled=\"accountForm.$invalid\" ng-click=\"submit()\">\r\n                                    {{ \'SAVE\' | translate }}\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </ion-list>\r\n    </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("tabs.html","<!--\r\nCreate tabs with an icon and label, using the tabs-stable style.\r\nEach tab\'s child <ion-nav-view> directive will have its own\r\nnavigation history that also transitions its views in and out.\r\n-->\r\n<ion-tabs class=\"tabs-icon-top tabs-stable tabs-striped tabs-color-light\">\r\n\r\n    <!-- INCIDENTS Tab -->\r\n    <ion-tab title=\"{{ \'INCIDENTS\' | translate }}\" icon-off=\"ion-clock\" icon-on=\"ion-clock\" href=\"#/tab/incidents-map\">\r\n        <ion-nav-view name=\"tab-incidents\">\r\n        </ion-nav-view>\r\n    </ion-tab>\r\n\r\n    <!-- MY INCIDENTS Tab -->\r\n    <ion-tab title=\"{{ \'MY_INCIDENTS\' | translate }}\" icon-off=\"ion-pin\" icon-on=\"ion-pin\" href=\"#/tab/my-incidents-map\">\r\n        <ion-nav-view name=\"tab-my-incidents\">\r\n        </ion-nav-view>\r\n    </ion-tab>\r\n\r\n    <!-- FAVORITES Tab -->\r\n    <ion-tab title=\"{{ \'FAVORITES\' | translate }}\" icon-off=\"ion-star\" icon-on=\"ion-star\" href=\"#/tab/favorites-map\">\r\n        <ion-nav-view name=\"tab-favorites\">\r\n        </ion-nav-view>\r\n    </ion-tab>\r\n\r\n    <!-- ACTIVITIES Tab -->\r\n    <ion-tab title=\"{{ \'ACTIVITIES\' | translate }}\" icon-off=\"ion-android-contacts\" icon-on=\"ion-android-contacts\" href=\"#/tab/activities-map\">\r\n        <ion-nav-view name=\"tab-activities\">\r\n        </ion-nav-view>\r\n    </ion-tab>\r\n\r\n</ion-tabs>");
$templateCache.put("activities/activity-detail.html","<ion-view view-title=\"{{activity.activityType | translate}}\">\r\n    <ion-content class=\"padding\">\r\n        <div class=\"list card\">\r\n\r\n            <div class=\"item item-avatar\">\r\n                <img ng-src=\"{{activity.image}}\" />\r\n                <h2>{{activity.activityType | translate}}</h2>\r\n                <p>{{activity.datetime}}</p>\r\n            </div>\r\n\r\n            <div class=\"item item-body\">\r\n                <img ng-src=\"{{activity.image}}\" style=\"width: 100%; height: 50%\">\r\n                <p>\r\n                    {{activity.description}}\r\n                </p>\r\n            </div>\r\n\r\n            <div class=\"item tabs tabs-secondary tabs-icon-left\" style=\"background-color: white;\">\r\n                <a class=\"tab-item\" href=\"#\" ng-click=\"getThere()\">\r\n                    <i class=\"icon ion-map\"></i>\r\n                    {{ \'GET_THERE\' | translate }}\r\n                </a>\r\n                <a class=\"tab-item\" ng-click=\"share()\">\r\n                    <i class=\"icon ion-share\"></i>\r\n                    {{ \'SHARE\' | translate }}\r\n                </a>\r\n            </div>\r\n        </div>\r\n        \r\n    </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("activities/activity-get-there.html","<ion-view view-title=\"{{\'GET_THERE\' | translate}}\">\r\n	<ion-content scroll=\"false\">\r\n        <ng-map zoom=\"12\" center=\"{{position}}\" style=\"height:100%\">\r\n        <directions \r\n          draggable=\"true\"\r\n          panel=\"directions-panel\"\r\n          travel-mode=\"DRIVING\"\r\n          origin=\"{{position}}\"\r\n          destination=\"{{destination}}\">\r\n        </directions>\r\n      </ng-map>\r\n	</ion-content>\r\n</ion-view>");
$templateCache.put("activities/filter-modal.html","<ion-modal-view>\r\n    <ion-header-bar class=\"bar bar-header bar-stable\">\r\n        <h1 class=\"title\">{{\'CAT_FILTER\' | translate}}</h1>\r\n        <button class=\"button button-icon ion-checkmark-round\" ng-click=\"closeModal()\"></button>\r\n    </ion-header-bar>\r\n    <ion-content>\r\n        <ul class=\"list\">\r\n            <li class=\"item item-icon-left item-checkbox\" ng-repeat=\"type in activityTypes\">\r\n                <i class=\"{{type.icon}}\"></i>\r\n                {{type.name | translate}}\r\n                <label class=\"checkbox checkbox-stable\">\r\n                    <input type=\"checkbox\" ng-click=\"includeType(\'{{type.name}}\')\"/>\r\n                </label>\r\n            </li>\r\n        </ul>\r\n    </ion-content>\r\n</ion-modal-view>");
$templateCache.put("activities/tab-activities-grid.html","<ion-view view-title=\"{{\'ACTIVITIES\' | translate}}\">\r\n    <ion-content>\r\n            <ion-item collection-repeat=\"activity in activities | filter:typeFilter\"\r\n    			collection-item-height=\"200\"\r\n    			collection-item-width=\"\'50%\'\">\r\n    			<a href=\"#/tab/activities/{{activity.id}}\"><img class=\"img-grid\" ng-src=\"{{activity.image}}\"></a>\r\n  			</ion-item>\r\n	</ion-content>\r\n</ion-view>");
$templateCache.put("activities/tab-activities-map.html","<div ng-init=\"id=0\">\r\n<ion-view view-title=\"{{ \'ACTIVITIES\' | translate }}\">\r\n    <ion-content scroll=\"false\" data-tap-disabled=\"true\">\r\n        <ui-gmap-google-map center=\'map.center\' zoom=\'map.zoom\'>\r\n            <ui-gmap-marker coords=\"markerUser.coords\" options=\"markerUser.options\" idkey=\"10000\">\r\n            </ui-gmap-marker>\r\n            <ui-gmap-marker ng-repeat=\"activity in activities | filter:typeFilter\"\r\n                   coords=\"activity.coords\" idkey=\"id + 1\" options=\"marker.options\">\r\n                <ui-gmap-window ng-cloak>\r\n                    <div class=\"window\">\r\n                    <a href=\"#/tab/activities/{{activity.id}}\" style=\"text-decoration:none; color:black;\"><p class=\"titlewindow\">{{activity.activityType | translate}}</p><p class=\"descriptionwindow\">\r\n                    {{activity.description}}</p><img class=\"imagewindow\" ng-src=\"{{activity.image}}\" /></a>\r\n                    </div>\r\n                </ui-gmap-window>\r\n            </ui-gmap-marker>\r\n        </ui-gmap-google-map>\r\n        <ion-footer-bar class=\"bar-stable footer-button\">\r\n                <button class=\"button button-stable icon-left ion-ios-location\" onclick=\"window.location.href=\'#/tab/activities-map\'\"></button>\r\n                <button class=\"button button-stable icon-left ion-ios-list\" onclick=\"window.location.href=\'#/tab/activities\'\"></button>\r\n                <!--<button class=\"button button-stable icon-left ion-grid\" onclick=\"window.location.href=\'#/tab/activities-grid\'\"></button>-->\r\n                <button class=\"button button-stable icon-left ion-funnel\" ng-click=\"openModal()\">{{ \'FILTER\' | translate }}</button>\r\n        </ion-footer-bar>\r\n    </ion-content>\r\n</ion-view>\r\n</div>\r\n");
$templateCache.put("activities/tab-activities.html","<ion-view view-title=\"{{\'ACTIVITIES\' | translate}}\">\r\n    <ion-content>\r\n        <ion-refresher\r\n            pulling-text=\"{{\'REFRESH\' | translate}}\"\r\n            on-refresh=\"doRefresh()\">\r\n        </ion-refresher>\r\n        <div class=\"card\" ng-show=\"activities.length === 0\">\r\n            <div class=\"item item-text-wrap\">\r\n                {{ \'NO_ACTIVITIES\' | translate }}\r\n            </div>\r\n        </div>\r\n        <ion-list>\r\n            <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"activity in activities | filter:typeFilter\" type=\"item-text-wrap\" href=\"#/tab/activities/{{activity.id}}\">\r\n                <img ng-src=\"{{activity.image}}\">\r\n                <h2>{{activity.activityType | translate}}\r\n                <p>{{activity.description}}</p>\r\n                <i class=\"icon ion-chevron-right\"></i>\r\n            </ion-item>\r\n        </ion-list>\r\n    </ion-content>\r\n</ion-view>");
$templateCache.put("incidents/favorite-detail.html","<ion-view view-title=\"{{incident.categorie | translate}}\">\r\n    <ion-content class=\"padding\">\r\n        <div class=\"list card\">\r\n\r\n            <div class=\"item item-avatar\">\r\n                <img ng-src=\"{{incident.image}}\" />\r\n                <h2>{{incident.categorie | translate}}</h2>\r\n                <p>{{incident.datetime}}</p>\r\n            </div>\r\n\r\n            <div class=\"item item-body\">\r\n                <img ng-src=\"{{incident.image}}\" style=\"width: 100%; height: 50%\">\r\n                <p>\r\n                    {{incident.description}}\r\n                </p>\r\n                <!--<p>\r\n                    <a href=\"#\" class=\"subdued\">1 {{ \'LIKE\' | translate }} </a>\r\n                </p>-->\r\n            </div>\r\n\r\n            <div class=\"item tabs tabs-secondary tabs-icon-left\" style=\"background-color: white;\">\r\n                <!--<a class=\"tab-item\" href=\"#\">\r\n                    <i class=\"icon ion-thumbsup\"></i>\r\n                    {{ \'LIKE\' | translate }}\r\n                </a>-->\r\n                <a class=\"tab-item\" ng-click=\"share()\">\r\n                    <i class=\"icon ion-share\"></i>\r\n                    {{ \'SHARE\' | translate }}\r\n                </a>\r\n            </div>\r\n        </div>\r\n\r\n    </ion-content>\r\n</ion-view>");
$templateCache.put("incidents/filter-modal.html","<ion-modal-view>\r\n    <ion-header-bar class=\"bar bar-header bar-stable\">\r\n        <h1 class=\"title\">{{\'CAT_FILTER\' | translate}}</h1>\r\n        <button class=\"button button-icon ion-checkmark-round\" ng-click=\"closeModal()\"></button>\r\n    </ion-header-bar>\r\n    <ion-content>\r\n        <ul class=\"list\">\r\n            <li class=\"item item-icon-left item-checkbox\" ng-repeat=\"categorie in categories\">\r\n                <i class=\"{{categorie.icon}}\"></i>\r\n                {{categorie.name | translate}}\r\n                <label class=\"checkbox checkbox-stable\">\r\n                    <input type=\"checkbox\" ng-click=\"includeCategorie(\'{{categorie.name}}\')\"/>\r\n                </label>\r\n            </li>\r\n        </ul>\r\n    </ion-content>\r\n</ion-modal-view>");
$templateCache.put("incidents/incident-detail.html","<ion-view view-title=\"{{incident.categorie | translate}}\">\r\n    <ion-content class=\"padding\">\r\n        <div class=\"list card\">\r\n\r\n            <div class=\"item item-avatar\">\r\n                <img ng-src=\"{{incident.image}}\" />\r\n                <h2>{{incident.categorie | translate}}</h2>\r\n                <p>{{incident.datetime}}</p>\r\n            </div>\r\n\r\n            <div class=\"item item-body\">\r\n                <img ng-src=\"{{incident.image}}\" style=\"width: 100%; height: 50%\">\r\n                <p>\r\n                    {{incident.description}}\r\n                </p>\r\n                <!--<p>\r\n                    <a href=\"#\" class=\"subdued\">1 {{ \'LIKE\' | translate }} </a>\r\n                </p>-->\r\n            </div>\r\n\r\n            <div class=\"item tabs tabs-secondary tabs-icon-left\" style=\"background-color: white;\">\r\n                <!--<a class=\"tab-item\" href=\"#\">\r\n                    <i class=\"icon ion-thumbsup\"></i>\r\n                    {{ \'LIKE\' | translate }}\r\n                </a>-->\r\n                <a class=\"tab-item\" ng-click=\"share()\">\r\n                    <i class=\"icon ion-share\"></i>\r\n                    {{ \'SHARE\' | translate }}\r\n                </a>\r\n                <a class=\"tab-item\" ng-click=\"addToFavorites()\">\r\n                    <i class=\"icon ion-ios-star\"></i>\r\n                    {{ \'ADD_FAVORITES\' | translate }}\r\n                </a>\r\n            </div>\r\n        </div>\r\n        \r\n    </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("incidents/map-modal.html","<ion-modal-view>\r\n    <ion-header-bar class=\"bar bar-header bar-stable\">\r\n        <h1 class=\"title\">{{\'ADD_COORDS\' | translate}}</h1>\r\n        <button class=\"button button-icon ion-checkmark-round\" ng-click=\"closeModal(2)\"></button>\r\n    </ion-header-bar>\r\n    <ion-content scroll=\"false\" data-tap-disabled=\"true\">\r\n        <ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\" draggable=\"true\" options=\"options\">\r\n        <ui-gmap-marker coords=\"marker.coords\" options=\"marker.options\" events=\"marker.events\" idkey=\"5000\">\r\n                <ui-gmap-window options=\"windowOptions\" closeClick=\"closeClick()\">\r\n                    <div>{{ \'DRAG\' | translate }}</div>\r\n                </ui-gmap-window>\r\n        </ui-gmap-marker>\r\n        <ui-gmap-marker coords=\"markerUser.coords\" options=\"markerUser.options\" idkey=\"10000\">\r\n        </ui-gmap-marker>\r\n        </ui-gmap-google-map>\r\n    </ion-content>\r\n</ion-modal-view>");
$templateCache.put("incidents/my-incident-detail.html","<ion-view view-title=\"{{incident.categorie | translate}}\">\r\n    <ion-content class=\"padding\">\r\n        <div class=\"list card\">\r\n\r\n            <div class=\"item item-avatar\">\r\n                <img ng-src=\"{{incident.image}}\" />\r\n                <h2>{{incident.categorie | translate}}</h2>\r\n                <p>{{incident.datetime}}</p>\r\n            </div>\r\n\r\n            <div class=\"item item-body\">\r\n                <img ng-src=\"{{incident.image}}\" style=\"width: 100%; height: 50%\">\r\n                <p>\r\n                    {{incident.description}}\r\n                </p>\r\n                <!--<p>\r\n                    <a href=\"#\" class=\"subdued\">1 {{ \'LIKE\' | translate }} </a>\r\n                </p>-->\r\n            </div>\r\n\r\n            <div class=\"item tabs tabs-secondary tabs-icon-left\" style=\"background-color: white;\">\r\n                <!--<a class=\"tab-item\" href=\"#\">\r\n                    <i class=\"icon ion-thumbsup\"></i>\r\n                    {{ \'LIKE\' | translate }}\r\n                </a>-->\r\n                <a class=\"tab-item\" ng-click=\"share()\">\r\n                    <i class=\"icon ion-share\"></i>\r\n                    {{ \'SHARE\' | translate }}\r\n                </a>\r\n            </div>\r\n        </div>\r\n\r\n    </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("incidents/new-incident-form.html","    <ion-view view-title=\"{{ \'NEW_INCIDENT\'| translate }}\">\r\n    <ion-content class=\"padding\">\r\n    <ion-list>\r\n    <div class=\"list card\">\r\n        <div class=\"item item-divider\" style=\"text-align:center\">\r\n            {{categorie.name | translate}}\r\n        </div>\r\n        <div class=\"item item-body\">\r\n            <form name=\"incidentForm\" novalidate>\r\n                <div class=\"list card\">\r\n                    <div class=\"item item-divider\" style=\"text-align:center\">\r\n                        <i class=\"ion-images\"></i>\r\n                        {{\'IMAGE\' | translate}}\r\n                    </div>\r\n                    <a class=\"item item-list-detail\" ng-click=\"openModal(1)\" style=\"height:150px; text-align:center\">\r\n                        <div class=\"bar bar-footer bar-balanced\" ng-show=\"imgURI === undefined\">\r\n                            <div class=\"title\">{{\'ADD_IMAGE\' | translate}}</div>\r\n                        </div>\r\n                        <img ng-show=\"imgURI !== undefined\" ng-src=\"{{imgURI}}\" style=\"height:130px; padding: 5px 5px 5px 5px;\">\r\n                    </a>\r\n                </div>\r\n\r\n                <div class=\"list card\">\r\n                    <div class=\"item item-divider\">{{\'DESCRIPTION\' | translate}}</div>\r\n                    <div class=\"item item-body\">\r\n                        <div class=\"list\">\r\n                            <label class=\"item item-input\">\r\n                                <textarea rows=\"5\" name=\"description\" placeholder=\"{{\'PLEASE\' | translate}}\" maxlength=\"500\" ng-model=\"newForm.description\" required></textarea>\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"list card\">\r\n                    <div class=\"item item-divider\">{{\'LOCATION\' | translate}}</div>\r\n                    <div class=\"item item-body\">\r\n                        <div class=\"list\">\r\n                            <ion-item class=\"item item-icon-left\" ng-click=\"getCoordenades()\">\r\n                            <i class=\"icon ion-ios-location\"></i>\r\n                            {{\'GET_COORDS\' | translate}}\r\n                            </ion-item>\r\n                            <label class=\"item item-input\">\r\n                            <input type=\"text\" name=\"coords\" readonly placeholder=\"{{\'COORDS\' | translate}}\" ng-model=\"newForm.coords\" required>\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n            <div class=\"list card\">\r\n                <div class=\"item item-divider\">{{\'DATA\' | translate}}</div>\r\n                <div class=\"item item-text-wrap\">\r\n                    {{\'NEVER\' | translate}}\r\n                </div>\r\n                <div class=\"item item-body\">\r\n                    <div class=\"list\">\r\n                        <label class=\"item item-input\">\r\n                            <input type=\"text\" placeholder=\"{{\'NAME\' | translate}}\" ng-model=\"newForm.name\" required>\r\n                        </label>\r\n                        <label class=\"item item-input\">\r\n                            <input type=\"text\" placeholder=\"{{\'SUBNAME\' | translate}}\" ng-model=\"newForm.subname\" required>\r\n                        </label>\r\n                        <label class=\"item item-input\">\r\n                            <input type=\"text\" placeholder=\"{{\'EMAIL\' | translate}}\" ng-model=\"newForm.email\" required>\r\n                        </label>\r\n                        <label class=\"item item-input\">\r\n                            <input type=\"text\" placeholder=\"{{\'PHONE\' | translate}}\" ng-model=\"newForm.phone\" required>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div>\r\n                <button class=\"button button-full button-balanced\" ng-disabled=\"incidentForm.$invalid || imgURI===undefined\" ng-click=\"submit()\">\r\n                    {{\'SEND\' | translate}}\r\n                </button>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n</ion-list>\r\n</ion-content>\r\n</ion-view>");
$templateCache.put("incidents/new-incident-image-modal.html","<ion-modal-view>\r\n    <ion-header-bar class=\"bar bar-header bar-stable\">\r\n        <h1 class=\"title\">{{\'SELECT_ACTION\' | translate}}</h1>\r\n        <button class=\"button button-icon ion-close-round\" ng-click=\"closeModal(1)\"></button>\r\n    </ion-header-bar>\r\n    <ion-content>\r\n        <ul class=\"list\">\r\n            <li class=\"item\" ng-click=\"takePhoto()\">{{\'TAKE_PHOTO\' | translate}}</li>\r\n            <li class=\"item\" ng-click=\"choosePhoto()\">{{\'CHOOSE_FROM_GALLERY\' | translate}}</li>\r\n        </ul>\r\n    </ion-content>\r\n</ion-modal-view>");
$templateCache.put("incidents/tab-favorites-grid.html","<ion-view view-title=\"{{ \'FAVORITES\' | translate }}\">\r\n    <ion-content>\r\n        <div class=\"card\" ng-show=\"incidents.length === 0\">\r\n            <div class=\"item item-text-wrap\">\r\n                {{ \'NOT_ADDED\' | translate }}\r\n            </div>\r\n        </div>\r\n        <ion-item collection-repeat=\"incident in incidents | filter:categorieFilter\"\r\n                collection-item-height=\"200\"\r\n                collection-item-width=\"\'50%\'\">\r\n                <a href=\"#/tab/favorites/{{incident.id}}\"><img class=\"img-grid\" ng-src=\"{{incident.image}}\"></a>\r\n        </ion-item>\r\n    </ion-content>\r\n</ion-view>");
$templateCache.put("incidents/tab-favorites-map.html","<div ng-init=\"id=0\">\r\n<ion-view view-title=\"{{ \'FAVORITES\' | translate }}\">\r\n    <ion-content scroll=\"false\" data-tap-disabled=\"true\">\r\n        <ui-gmap-google-map center=\'map.center\' zoom=\'map.zoom\'>\r\n            <ui-gmap-marker coords=\"markerUser.coords\" options=\"markerUser.options\" idkey=\"10000\">\r\n            </ui-gmap-marker>\r\n            <ui-gmap-marker ng-repeat=\"incident in incidents | filter:categorieFilter\"\r\n                   coords=\"incident.coords\" idkey=\"id + 1\" options=\"marker.options\">\r\n                <ui-gmap-window ng-cloak>\r\n                    <div class=\"window\">\r\n                    <a href=\"#/tab/favorites/{{incident.id}}\" style=\"text-decoration:none; color:black;\"><p class=\"titlewindow\">{{incident.categorie | translate}}</p><p class=\"descriptionwindow\">\r\n                    {{incident.description}}</p><img class=\"imagewindow\" ng-src=\"{{incident.image}}\" /></a>\r\n                    </div>\r\n                </ui-gmap-window>\r\n            </ui-gmap-marker>\r\n        </ui-gmap-google-map>\r\n        <ion-footer-bar class=\"bar-stable footer-button\">\r\n                <button class=\"button button-stable icon-left ion-ios-location\" onclick=\"window.location.href=\'#/tab/favorites-map\'\"></button>\r\n                <button class=\"button button-stable icon-left ion-ios-list\" onclick=\"window.location.href=\'#/tab/favorites\'\"></button>\r\n                <!--<button class=\"button button-stable icon-left ion-grid\" onclick=\"window.location.href=\'#/tab/favorites-grid\'\"></button>-->\r\n                <button class=\"button button-stable icon-left ion-funnel\" ng-click=\"openModal()\">{{ \'FILTER\' | translate }}</button>\r\n        </ion-footer-bar>\r\n    </ion-content>\r\n</ion-view>\r\n</div>");
$templateCache.put("incidents/tab-favorites.html","<ion-view view-title=\"{{ \'FAVORITES\' | translate }}\">\r\n    <ion-content>\r\n        <div class=\"card\" ng-show=\"incidents.length === 0\">\r\n            <div class=\"item item-text-wrap\">\r\n                {{ \'NOT_ADDED\' | translate }}\r\n            </div>\r\n        </div>\r\n        <ion-list show-delete=\"shouldShowDelete\">\r\n            <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"incident in incidents | filter:categorieFilter\" type=\"item-text-wrap\" href=\"#/tab/favorites/{{incident.id}}\">\r\n                <ion-delete-button class=\"ion-minus-circled\"></ion-delete-button>\r\n                <img ng-src=\"{{incident.image}}\">\r\n                <h2>{{incident.categorie | translate}}</h2>\r\n                <p>{{incident.description}}</p>\r\n                <i class=\"icon ion-chevron-right\"></i>\r\n                <ion-delete-button class=\"ion-minus-circled\" ng-click=\"remove(incident)\"></ion-delete-button>\r\n            </ion-item>\r\n        </ion-list>\r\n        <ion-toggle ng-model=\"shouldShowDelete\">\r\n            {{ \'REMOVE\' | translate }}\r\n        </ion-toggle>\r\n    </ion-content>\r\n</ion-view>");
$templateCache.put("incidents/tab-incidents-grid.html","<ion-view view-title=\"{{\'INCIDENTS\' | translate}}\">\r\n    <ion-content>\r\n            <ion-item collection-repeat=\"incident in incidents | filter:categorieFilter\"\r\n    			collection-item-height=\"200\"\r\n    			collection-item-width=\"\'50%\'\">\r\n    			<a href=\"#/tab/incidents/{{incident.id}}\"><img class=\"img-grid\" ng-src=\"{{incident.image}}\"></a>\r\n  			</ion-item>\r\n	</ion-content>\r\n</ion-view>");
$templateCache.put("incidents/tab-incidents-map.html","<div ng-init=\"id=0\">\r\n<ion-view view-title=\"{{ \'INCIDENTS\' | translate }}\">\r\n    <ion-content data-tap-disabled=\"true\">\r\n        <ui-gmap-google-map center=\'map.center\' zoom=\'map.zoom\' options=\"options\">\r\n            <ui-gmap-marker coords=\"markerUser.coords\" options=\"markerUser.options\" idkey=\"10000\">\r\n            </ui-gmap-marker>\r\n            <ui-gmap-marker ng-repeat=\"incident in incidents | filter:categorieFilter\"\r\n                   coords=\"incident.coords\" idkey=\"id + 1\" options=\"marker.options\">\r\n                <ui-gmap-window ng-cloak>\r\n                    <div class=\"window\">\r\n                    <a href=\"#/tab/incidents/{{incident.id}}\" style=\"text-decoration:none; color:black;\"><p class=\"titlewindow\">{{incident.categorie | translate}}</p><p class=\"descriptionwindow\">\r\n                    {{incident.description}}</p><img class=\"imagewindow\" ng-src=\"{{incident.image}}\" /></a>\r\n                    </div>\r\n                </ui-gmap-window>\r\n            </ui-gmap-marker>\r\n        </ui-gmap-google-map>\r\n        <ion-footer-bar class=\"bar-stable footer-button\">\r\n                <button class=\"button button-stable icon-left ion-ios-location\" onclick=\"window.location.href=\'#/tab/incidents-map\'\"></button>\r\n                <button class=\"button button-stable icon-left ion-ios-list\" onclick=\"window.location.href=\'#/tab/incidents\'\"></button>\r\n                <!--<button class=\"button button-stable icon-left ion-grid\" onclick=\"window.location.href=\'#/tab/incidents-grid\'\"></button>-->\r\n                <button class=\"button button-stable icon-left ion-plus-circled\" onclick=\"window.location.href=\'#/tab/new\'\"></button>\r\n                <button class=\"button button-stable icon-left ion-funnel\" ng-click=\"openModal()\">{{ \'FILTER\' | translate }}</button>\r\n        </ion-footer-bar>\r\n    </ion-content>\r\n</ion-view>\r\n</div>");
$templateCache.put("incidents/tab-incidents.html","<ion-view view-title=\"{{\'INCIDENTS\' | translate}}\">\r\n    <ion-content>\r\n        <ion-refresher\r\n            pulling-text=\"{{\'REFRESH\' | translate}}\"\r\n            on-refresh=\"doRefresh()\">\r\n        </ion-refresher>\r\n        <div class=\"card\" ng-show=\"incidents.length === 0\">\r\n            <div class=\"item item-text-wrap\">\r\n                {{ \'NO_INCIDENTS\' | translate }}\r\n            </div>\r\n        </div>\r\n        <ion-list>\r\n            <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"incident in incidents | filter:categorieFilter\" type=\"item-text-wrap\" href=\"#/tab/incidents/{{incident.id}}\">\r\n                <img ng-src=\"{{incident.image}}\">\r\n                <h2>{{incident.categorie | translate}}\r\n                <p>{{incident.description}}</p>\r\n                <i class=\"icon ion-chevron-right\"></i>\r\n            </ion-item>\r\n        </ion-list>\r\n    </ion-content>\r\n</ion-view>");
$templateCache.put("incidents/tab-my-incidents-grid.html","<ion-view view-title=\"{{ \'MY_INCIDENTS\' | translate }}\">\r\n    <ion-content>\r\n        <div class=\"card\"  ng-show=\"incidents.length === 0\">\r\n            <div class=\"item item-text-wrap\" >\r\n                {{ \'STILL\' | translate }}\r\n            </div>\r\n        </div>\r\n        <ion-item collection-repeat=\"incident in incidents | filter:categorieFilter\"\r\n                collection-item-height=\"200\"\r\n                collection-item-width=\"\'50%\'\">\r\n                <a href=\"#/tab/my-incidents/{{incident.id}}\"><img class=\"img-grid\" ng-src=\"{{incident.image}}\"></a>\r\n            </ion-item>\r\n    </ion-content>\r\n</ion-view>");
$templateCache.put("incidents/tab-my-incidents-map.html","<div ng-init=\"id=0\">\r\n<ion-view view-title=\"{{ \'MY_INCIDENTS\' | translate }}\">\r\n    <ion-content scroll=\"false\" data-tap-disabled=\"true\">\r\n        <ui-gmap-google-map center=\'map.center\' zoom=\'map.zoom\'>\r\n            <ui-gmap-marker coords=\"markerUser.coords\" options=\"markerUser.options\" idkey=\"10000\">\r\n            </ui-gmap-marker>\r\n            <ui-gmap-marker ng-repeat=\"incident in incidents | filter:categorieFilter\"\r\n                   coords=\"incident.coords\" idkey=\"id + 1\" options=\"marker.options\">\r\n                <ui-gmap-window ng-cloak>\r\n                    <div class=\"window\">\r\n                    <a href=\"#/tab/my-incidents/{{incident.id}}\" style=\"text-decoration:none; color:black;\"><p class=\"titlewindow\">{{incident.categorie | translate}}</p><p class=\"descriptionwindow\">\r\n                    {{incident.description}}</p><img class=\"imagewindow\" ng-src=\"{{incident.image}}\" /></a>\r\n                    </div>\r\n                </ui-gmap-window>\r\n            </ui-gmap-marker>\r\n        </ui-gmap-google-map>\r\n        <ion-footer-bar class=\"bar-stable footer-button\">\r\n                <button class=\"button button-stable icon-left ion-ios-location\" onclick=\"window.location.href=\'#/tab/my-incidents-map\'\"></button>\r\n                <button class=\"button button-stable icon-left ion-ios-list\" onclick=\"window.location.href=\'#/tab/my-incidents\'\"></button>\r\n                <!--<button class=\"button button-stable icon-left ion-grid\" onclick=\"window.location.href=\'#/tab/my-incidents-grid\'\"></button>-->\r\n                <button class=\"button button-stable icon-left ion-funnel\" ng-click=\"openModal()\">{{ \'FILTER\' | translate }}</button>\r\n        </ion-footer-bar>\r\n    </ion-content>\r\n</ion-view>\r\n</div>");
$templateCache.put("incidents/tab-my-incidents.html","<ion-view view-title=\"{{ \'MY_INCIDENTS\' | translate }}\">\r\n    <ion-content>\r\n        <div class=\"card\" ng-show=\"incidents.length === 0\">\r\n            <div class=\"item item-text-wrap\">\r\n                {{ \'STILL\' | translate }}\r\n            </div>\r\n        </div>\r\n        <ion-list>\r\n            <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"incident in incidents | filter:categorieFilter\" type=\"item-text-wrap\" href=\"#/tab/my-incidents/{{incident.id}}\">\r\n                <img ng-src=\"{{incident.image}}\">\r\n                <h2>{{incident.categorie | translate}}</h2>\r\n                <p>{{incident.description}}</p>\r\n                <i class=\"icon ion-chevron-right\"></i>\r\n            </ion-item>\r\n        </ion-list>\r\n    </ion-content>\r\n</ion-view>");
$templateCache.put("incidents/tab-new.html","<ion-view view-title=\"{{\'NEW_INCIDENT\' | translate}}\">\r\n    <ion-content>\r\n        <div class=\"item item-divider\">\r\n            {{\'SELECT\' | translate}}\r\n        </div>\r\n\r\n        <!--<div class=\"list card\">\r\n            <a class=\"item item-icon-left\" ng-repeat=\"categorie in categories\" href=\"#/tab/new/{{categorie.id}}\">\r\n                <img ng-src=\"{{categorie.icon}}\">\r\n                {{categorie.name | translate}}\r\n            </a>\r\n        </div>-->\r\n\r\n        <ion-list>\r\n            <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"categorie in categories\" type=\"item-text-wrap\" href=\"#/tab/new/{{categorie.id}}\">\r\n                <img ng-src=\"{{categorie.icon}}\">\r\n                <!--<h2>{{incident.categorie | translate}}</h2>-->\r\n                {{categorie.name | translate}}\r\n                <i class=\"icon ion-chevron-right\"></i>\r\n            </ion-item>\r\n        </ion-list>\r\n    </ion-content>\r\n</ion-view>");}]);