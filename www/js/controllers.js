// Global variables
var showActivities = false;

angular.module('starter.controllers', [])

.controller('IncidentsCtrl', function ($scope, $ionicModal, $ionicPopup, $ionicLoading, $filter, $translate, Init, Incidents, Categories, CategorieFilter, StorageService, Scopes) {
    
     // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
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

        $ionicLoading.hide();
    });

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
    $ionicModal.fromTemplateUrl('templates/filter-modal.html', {
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
    };

    Scopes.store('IncidentsCtrl', $scope);

    // CategorieFilter //
    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    };
})

.controller('IncidentsMapCtrl', function ($scope, $stateParams, $ionicLoading, geolocation, Incidents, CategorieFilter) {

    $scope.incidents = Incidents.getAll();

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    geolocation.getLocation().then(function (data) {
        //Center's the map on Albufera coords
        $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};

        // Mark's user location
        $scope.marker = {
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
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
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
        .share($scope.incident.coords, $scope.incident.description,
            null, null) // Share via native share sheet
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

.controller('NewIncidentCtrl', function ($scope, $stateParams, $state, $ionicModal, $filter, $log, $ionicPopup, $ionicLoading, geolocation, Images, Incidents, Categories, Scopes, StorageService, IDGenerator) {
    
    $scope.categorie = Categories.get($stateParams.categorieId);
    $scope.newForm = {};
    var incidentCoords, userCoords;

    // Modal 1
    $ionicModal.fromTemplateUrl('templates/new-incident-image-modal.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('templates/map-modal.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
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

    // Geolocation
    $scope.getCoordenades = function () {

        $scope.openModal(2);

        // Setup the loader
        $ionicLoading.show({
            content: 'Cargando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        geolocation.getLocation().then(function (data) {
            //Center's the map on Albufera coords
            $scope.map = { center: { latitude: data.coords.latitude, longitude: data.coords.longitude }, zoom: 12};
            $scope.newForm.coords = data.coords.latitude + ", " + data.coords.longitude;
            userCoords = {
                coords: {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                }
            };

            incidentCoords = {
                coords: {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                }
            };
                        
            $scope.marker = {
              id: 0,
              coords: {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
              },
              options: { draggable: true },
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
                    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                  };
                }
              }
            };

            $scope.windowOptions = {
                visible: true
            };

            $scope.onClick = function () {
                $scope.windowOptions.visible = !$scope.windowOptions.visible;
            };

            $scope.closeClick = function () {
                $scope.windowOptions.visible = false;
            };

            $ionicLoading.hide();
        });
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
                    longitude: userCoords.coords.latitude
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
            }
        };

        console.log(newIncident);

        // Save Local Incident
        StorageService.add(newIncidentLocal);

        // Send remote Incident...
        Incidents.post(newIncident).then(function(data) {
            console.log(data);

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

                return;
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
            }

            setTimeout(function() {
                Scopes.get('IncidentsCtrl').incidents = Incidents.getAll();
                $state.go('tab.incidents', {}, { reload: true });
            },20);
        });
    };
})

.controller('MyIncidentsCtrl', function ($scope, $ionicModal, $ionicLoading, StorageService, Categories, CategorieFilter) {
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

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/filter-modal.html', {
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
        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    };
})

.controller('MyIncidentsMapCtrl', function ($scope, $stateParams, $ionicLoading, geolocation, StorageService, CategorieFilter) {

    $scope.incidents = StorageService.getAll();

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    geolocation.getLocation().then(function (data) {
        //Center's the map on Albufera coords
        $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};

        //Mark's user location
        $scope.marker = {
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

        $scope.windowOptions = {
            visible: false
        };

        $scope.onClick = function () {
            $scope.windowOptions.visible = !$scope.windowOptions.visible;
        };

        $scope.closeClick = function () {
            $scope.windowOptions.visible = false;
        };

        $scope.title = "INFO";

        $ionicLoading.hide();
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
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
        .share($scope.incident.coords, $scope.incident.description,
            null, null) // Share via native share sheet
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

.controller('FavoritesCtrl', function ($scope, $ionicModal, $ionicLoading, StorageService, Categories, CategorieFilter) {

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

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/filter-modal.html', {
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
        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    };
})

.controller('FavoritesMapCtrl', function ($scope, $stateParams, $ionicLoading, geolocation, StorageService, CategorieFilter) {

    $scope.incidents = StorageService.getAllFavorites();
    
    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    geolocation.getLocation().then(function (data) {
        //Center's the map on Albufera coords
        $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};

        // Mark's user location
        $scope.marker = {
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

        $scope.windowOptions = {
            visible: false
        };

        $scope.onClick = function () {
            $scope.windowOptions.visible = !$scope.windowOptions.visible;
        };

        $scope.closeClick = function () {
            $scope.windowOptions.visible = false;
        };

        $scope.title = "INFO";

        $ionicLoading.hide();
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
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
        .share($scope.incident.coords, $scope.incident.description,
            null, null) // Share via native share sheet
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

.controller('ActivitiesCtrl', function ($scope, $stateParams, $filter, $cordovaSocialSharing, StorageService) {

})

.controller('ActivitiesMapCtrl', function ($scope, $stateParams, $ionicLoading, geolocation, Activities, CategorieFilter) {

    /*$scope.activities = Activities.getAll();

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    geolocation.getLocation().then(function (data) {
        //Center's the map on Albufera coords
        $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};

        // Mark's user location
        $scope.marker = {
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
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (activitie) {
        return CategorieFilter.filter(activitie);
    };*/
})

.controller('ActivitieDetailCtrl', function ($scope, $stateParams, $ionicPopup, $filter, $cordovaSocialSharing, Activities, StorageService) {
    
    /*$scope.activitie = Activities.get($stateParams.activitieId);

    // Social Sharing
    $scope.share = function() {
        $cordovaSocialSharing
        .share($scope.activitie.coords, $scope.activitie.description,
            null, null) // Share via native share sheet
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
        if (StorageService.addToFavorites($scope.activitie) === null) {
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
    };*/
})

.controller('NewActivitieCtrl', function ($scope, $stateParams, $state, $ionicModal, $filter, $log, $ionicPopup, $ionicLoading, geolocation, Images, Activities, Categories, Scopes, StorageService, IDGenerator) {
    
    /*$scope.categorie = Categories.get($stateParams.categorieId);
    $scope.newForm = {};
    var activitieCoords, userCoords;

    // Modal 1
    $ionicModal.fromTemplateUrl('templates/new-activitie-image-modal.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('templates/map-modal.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };*/

    /* Listen for broadcasted messages */

    /*$scope.$on('modal.shown', function(event, modal) {
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

    // Geolocation
    $scope.getCoordenades = function () {

        $scope.openModal(2);

        // Setup the loader
        $ionicLoading.show({
            content: 'Cargando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        geolocation.getLocation().then(function (data) {
            //Center's the map on Albufera coords
            $scope.map = { center: { latitude: data.coords.latitude, longitude: data.coords.longitude }, zoom: 12};
            $scope.newForm.coords = data.coords.latitude + ", " + data.coords.longitude;
            userCoords = {
                coords: {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                }
            };

            activitieCoords = {
                coords: {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                }
            };
                        
            $scope.marker = {
              id: 0,
              coords: {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
              },
              options: { draggable: true },
              events: {
                dragend: function (marker, eventName, args) {
                  $log.log('marker dragend');
                  var lat = marker.getPosition().lat();
                  var lon = marker.getPosition().lng();
                  $scope.newForm.coords =  lat + ", " + lon;
                  activitieCoords.coords.latitude = lat;
                  activitieCoords.coords.longitude = lon;
                  console.log(activitieCoords);

                  $log.log(lat);
                  $log.log(lon);

                  $scope.marker.options = {
                    draggable: true,
                    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                  };
                }
              }
            };

            $scope.windowOptions = {
                visible: true
            };

            $scope.onClick = function () {
                $scope.windowOptions.visible = !$scope.windowOptions.visible;
            };

            $scope.closeClick = function () {
                $scope.windowOptions.visible = false;
            };

            $ionicLoading.hide();
        });
    };

    // Form Validation
    var account = StorageService.getAccount();

    if (account !== undefined) {
        $scope.newForm.name = account.name;
        $scope.newForm.subname = account.subname;
        $scope.newForm.email = account.email;
        $scope.newForm.phone = account.phone;
    }

    // Send activitie
    $scope.submit = function () {

        var newActivitie = {
            //id: parseInt(IDGenerator.generate()),
            categorie: parseInt($scope.categorie.id),
            datetime: new Date().toLocaleString(),
            description: $scope.newForm.description,
            image: $scope.imgURI,
            coords: {
                latitude: activitieCoords.coords.latitude,
                longitude: activitieCoords.coords.longitude
            },
            account: {
                name: $scope.newForm.name,
                subname: $scope.newForm.subname,
                email: $scope.newForm.email,
                phone: $scope.newForm.phone,
                coords: {
                    latitude: userCoords.coords.latitude,
                    longitude: userCoords.coords.latitude
                }
            }
        };

        var newActivitieLocal = {
            id: parseInt(IDGenerator.generate()),
            categorie: $scope.categorie.name,
            datetime: new Date().toLocaleString(),
            description: $scope.newForm.description,
            image: $scope.imgURI,
            coords: {
                latitude: activitieCoords.coords.latitude,
                longitude: activitieCoords.coords.longitude
            }
        };

        console.log(newActivitie);

        // Save Local activitie
        StorageService.add(newActivitieLocal);

        // Send remote activitie...
        Activities.post(newActivitie).then(function(data) {
            console.log(data);

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

                return;
            } else {
                // An alert dialog on success
                $scope.showSuccessAlert = function () {
                    var alertPopup = $ionicPopup.alert({
                        title: $filter('translate')('ACTIVITIE_SENT'),
                        template: $filter('translate')('THANKS'),
                        okType: 'button-balanced'
                    });
                    alertPopup.then(function (res) {
                    });
                };

                $scope.showSuccessAlert();
            }

            setTimeout(function() {
                Scopes.get('ActivitiesCtrl').activities = Activities.getAll();
                $state.go('tab.activities', {}, { reload: true });
            },20);
        });
    };*/
})

.controller('MyActivitiesCtrl', function ($scope, $ionicModal, $ionicLoading, StorageService, Categories, CategorieFilter) {
    // Setup the loader
    /*$ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $scope.activities = StorageService.getAll();
    $scope.categories = Categories.getAll();

    $ionicLoading.hide();

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/filter-modal.html', {
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
        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (activitie) {
        return CategorieFilter.filter(activitie);
    };*/
})

.controller('MyActivitiesMapCtrl', function ($scope, $stateParams, $ionicLoading, geolocation, StorageService, CategorieFilter) {

    /*$scope.activities = StorageService.getAll();

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    geolocation.getLocation().then(function (data) {
        //Center's the map on Albufera coords
        $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};

        //Mark's user location
        $scope.marker = {
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

        $scope.windowOptions = {
            visible: false
        };

        $scope.onClick = function () {
            $scope.windowOptions.visible = !$scope.windowOptions.visible;
        };

        $scope.closeClick = function () {
            $scope.windowOptions.visible = false;
        };

        $scope.title = "INFO";

        $ionicLoading.hide();
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (activitie) {
        return CategorieFilter.filter(activitie);
    };*/
})

.controller('MyActivitieDetailCtrl', function ($scope, $stateParams, $filter, StorageService, $cordovaSocialSharing, CategorieFilter) {
    
    /*$scope.activitie = StorageService.get($stateParams.activitieId);

    // Social Sharing
    $scope.share = function() {
        $cordovaSocialSharing
        .share($scope.activitie.coords, $scope.activitie.description,
            null, null) // Share via native share sheet
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
    };*/
})

.controller('FavoritesActivitiesCtrl', function ($scope, $ionicModal, $ionicLoading, StorageService, Categories, CategorieFilter) {

    // Setup the loader
    /*$ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $scope.activities = StorageService.getAllFavorites();
    $scope.categories = Categories.getAll();

    $ionicLoading.hide();

    $scope.remove = function (activitie) {
        StorageService.removeFavorite(activitie);
    };

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/filter-modal.html', {
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
        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (activitie) {
        return CategorieFilter.filter(activitie);
    };*/
})

.controller('FavoritesActivitiesMapCtrl', function ($scope, $stateParams, $ionicLoading, geolocation, StorageService, CategorieFilter) {

    /*$scope.activities = StorageService.getAllFavorites();
    
    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    geolocation.getLocation().then(function (data) {
        //Center's the map on Albufera coords
        $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};

        // Mark's user location
        $scope.marker = {
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

        $scope.windowOptions = {
            visible: false
        };

        $scope.onClick = function () {
            $scope.windowOptions.visible = !$scope.windowOptions.visible;
        };

        $scope.closeClick = function () {
            $scope.windowOptions.visible = false;
        };

        $scope.title = "INFO";

        $ionicLoading.hide();
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
    };

    $scope.categorieFilter = function (activitie) {
        return CategorieFilter.filter(activitie);
    };*/
})

.controller('FavoriteActivitieDetailCtrl', function ($scope, $stateParams, $filter, $cordovaSocialSharing, StorageService) {
    
    /*$scope.activitie = StorageService.getFavorite($stateParams.activitieId);

    // Social Sharing
    $scope.share = function() {
        $cordovaSocialSharing
        .share($scope.activitie.coords, $scope.activitie.description,
            null, null) // Share via native share sheet
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
    };*/
})

.controller('AccountCtrl', function ($scope, $ionicPopup, $filter, $translate, $ionicHistory, StorageService) {

    var account = StorageService.getAccount();

    // Show BackButton control
    $scope.showBackButton = function() {
        if ($ionicHistory.currentView() !== null) {
            if ($ionicHistory.currentView().url === "/account") {
                return true;
            } else {
                return false;
            }
        }
        return false;  
    };

    // Show AccountButton control
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
})

// Set the state back to  the top of the tabs view stack whenever the tab is selected
.controller('StateCtrl', function($scope, $state) {


    this.onTabSelected = function(_scope){
    // if we are selecting the home title then 
    // change the state back to the top state
    console.log(_scope.title);
        switch (_scope.title) {
            case 'Incidencias':
                $state.go('tab.incidents', {}, {reload: true});
                showActivities = false;
            break;
            case 'Incidents':
                $state.go('tab.incidents', {}, {reload: true});
                showActivities = false;
            break;
            case 'Mis incidencias':
                $state.go('tab.my-incidents', {});
            break;
            case 'My incidents':
                $state.go('tab.my-incidents', {});
            break;
            case 'Favoritas':
                $state.go('tab.favorites', {});
            break;
            case 'Favorites':
                $state.go('tab.favorites', {});
            break;
            case 'Actividades':
                $state.go('tab.activities', {}, {reload: true});
                showActivities = true;
            break;
            case 'Activities':
                $state.go('tab.activities', {}, {reload: true});
                showActivities = true;
            break;
            case 'Volver':
                $state.go('tab.incidents', {}, {reload: true});
                showActivities = false;
            break;
            case 'Back':
                $state.go('tab.incidents', {}, {reload: true});
                showActivities = false;
            break;
        }
    };

    $scope.showTab = function(tab) {
        switch (tab) {
            case "incidents":
                if (!showActivities) return "ng-show";
                return "ng-hide";
            case "my_incidents":
                if (!showActivities) return "ng-show";
                return "ng-hide";
            case "favorites":
                if (!showActivities) return "ng-show";
                return "ng-hide";
            case "activities":
                return "ng-show";
            case "my_activities":
                if (showActivities) return "ng-show";
                return "ng-hide";
            case "favorites_activities":
                if (showActivities) return "ng-show";
                return "ng-hide";
            case "back":
                if (showActivities) return "ng-show";
                return "ng-hide";
        }
    };
});