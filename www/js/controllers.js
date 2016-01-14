angular.module('starter.controllers', [])

.controller('IncidentsMapCtrl', function ($scope, $stateParams, $ionicHistory, $ionicLoading, $ionicPopup, $ionicModal, $filter, $translate, Init, Incidents, Categories, Activities, ActivityTypes, CategorieFilter, StorageService) {

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $scope.randomMarkers = [];
    $scope.incidents = Incidents.getAll();
    $scope.categories = Categories.getAll();
    $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};

    var addMarker = function(i){
        var marker = {
            id: i,
            idKey: "id",
            latitude: $scope.incidents[i].coords.latitude,
            longitude: $scope.incidents[i].coords.longitude,
            show: false,
            categorie: $scope.incidents[i].categorie,
            id_incident: $scope.incidents[i].id,
            description: $scope.incidents[i].description,
            image: $scope.incidents[i].image,
            icon: 'img/green_marker.png'
        };
        return marker;
    };

    // Add markers
    if ($scope.incidents.length > 0) {
        for(var i=0; i< $scope.incidents.length; i++){
                                
            $scope.randomMarkers.push(addMarker(i));
        }
    }

    $scope.onClick = function(marker, eventName, model) {
        model.show = !model.show;
    };

    // Refresh Map
    $scope.$on( "$ionicView.enter", function() {
        $ionicHistory.clearCache();
    });

    if ($scope.incidents.length === 0) {
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

            // Add markers
            for(var i=0; i< $scope.incidents.length; i++){
                                
                $scope.randomMarkers.push(addMarker(i));
            }

            console.log($scope.markers);

            var sendData = function(newIncident) {
                Incidents.post(newIncident).then(function(data){
                    if (data === 'error') {
                        console.log('Error');
                    } else {
                        // Remove incident from not sent
                        StorageService.removeNotSent(newIncident.id);
                    }
                });
            };

            // Check if there are any incident to sent
            var notSentIncidents = [];
            notSentIncidents = StorageService.getAllNotSent();

            if (notSentIncidents.length > 0) {
                for (i=0; i < notSentIncidents.length; i++) {
                 
                    var newIncident = StorageService.getNotSent(notSentIncidents[i].id);

                    newIncident.categorie = newIncident.categorieId;

                    sendData(newIncident);
                }
            }
        });
    }

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

    $ionicLoading.hide();

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
        $scope.randomMarkers = [];
        // Add markers
        for(var i=0; i< $scope.incidents.length; i++){
            if (CategorieFilter.filter($scope.incidents[i]) !== null) {
                $scope.randomMarkers.push(addMarker(i));
            }                   
        }
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
            datetime: moment().format('DD/MM/YYYY hh:mm:ss'),
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
            datetime: moment().format('DD/MM/YYYY hh:mm:ss'),
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
        console.log(newIncidentLocal);

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
            }

            $scope.newForm = {};

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

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $scope.randomMarkers = [];
    $scope.incidents = StorageService.getAll();
    $scope.categories = Categories.getAll();
    $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};

    // Refresh Map
    $scope.$on( "$ionicView.enter", function() {
        $ionicHistory.clearCache();
    });

    var addMarker = function(i){
        var marker = {
            id: i,
            idKey: "id",
            latitude: $scope.incidents[i].coords.latitude,
            longitude: $scope.incidents[i].coords.longitude,
            show: false,
            categorie: $scope.incidents[i].categorie,
            id_incident: $scope.incidents[i].id,
            description: $scope.incidents[i].description,
            image: $scope.incidents[i].image,
            icon: 'img/green_marker.png'
        };
        return marker;
    };

    // Add markers
    if ($scope.incidents.length > 0) {
        for(var i=0; i< $scope.incidents.length; i++){
                                
            $scope.randomMarkers.push(addMarker(i));
        }
    }

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

    $ionicLoading.hide();

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
        $scope.randomMarkers = [];
        // Add markers
        for(var i=0; i< $scope.incidents.length; i++){
            if (CategorieFilter.filter($scope.incidents[i]) !== null) {
                $scope.randomMarkers.push(addMarker(i));
            }                   
        }
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

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $scope.randomMarkers = [];
    $scope.incidents = StorageService.getAllFavorites();
    $scope.categories = Categories.getAll();
    $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};

    // Refresh Map
    $scope.$on( "$ionicView.enter", function() {
        $ionicHistory.clearCache();
    });

    var addMarker = function(i){
        var marker = {
            id: i,
            idKey: "id",
            latitude: $scope.incidents[i].coords.latitude,
            longitude: $scope.incidents[i].coords.longitude,
            show: false,
            categorie: $scope.incidents[i].categorie,
            id_incident: $scope.incidents[i].id,
            description: $scope.incidents[i].description,
            image: $scope.incidents[i].image,
            icon: 'img/green_marker.png'
        };
        return marker;
    };

    // Add markers
    if ($scope.incidents.length > 0) {
        for(var i=0; i< $scope.incidents.length; i++){
                                
            $scope.randomMarkers.push(addMarker(i));
        }
    }

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

    $ionicLoading.hide();

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
        $scope.randomMarkers = [];
        // Add markers
        for(var i=0; i< $scope.incidents.length; i++){
            if (CategorieFilter.filter($scope.incidents[i]) !== null) {
                $scope.randomMarkers.push(addMarker(i));
            }                   
        }
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

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $scope.randomMarkers = [];
    $scope.activities = Activities.getAll();
    $scope.activityTypes = ActivityTypes.getAll();
    $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12};

    var addMarker = function(i){
        var marker = {
            id: i,
            idKey: "id",
            latitude: $scope.activities[i].coords.latitude,
            longitude: $scope.activities[i].coords.longitude,
            show: false,
            activityType: $scope.activities[i].activityType,
            id_incident: $scope.activities[i].id,
            description: $scope.activities[i].description,
            image: $scope.activities[i].image,
            icon: 'img/green_marker.png'
        };
        return marker;
    };

    // Add markers
    if ($scope.activities.length > 0) {
        for(var i=0; i< $scope.activities.length; i++){
                                
            $scope.randomMarkers.push(addMarker(i));
        }
    }

    // Refresh Map
    $scope.$on( "$ionicView.enter", function() {
        $ionicHistory.clearCache();
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

    $ionicLoading.hide();

    // TypeFilter //
    $scope.includeType = function (type) {
        ActivityTypeFilter.includeType(type);
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