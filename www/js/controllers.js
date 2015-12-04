angular.module('starter.controllers', [])

.controller('IncidentsCtrl', function ($scope, $ionicModal, $ionicPopup, $ionicLoading, $translate, Init, Incidents, Categories, CategorieFilter, StorageService) {
    
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

        Incidents.post(data.incidents);
        $scope.incidents = Incidents.getAll();
        Categories.post(data.categories);
        $scope.categories = Categories.getAll();

        $ionicLoading.hide();
    });

    if (StorageService.isFirstVisit()) {
        // Language Selection at first visit
        $ionicPopup.show({
            template: 'El idioma elegido se usará por defecto',
            title: 'Elija un idioma',
            scope: $scope,
            buttons: [
            {
              text: 'Español',
              type: 'button-balanced',
              onTap: function () {
                return 'es';
              }
          },
          {
              text: 'Inglés',
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

.controller('IncidentDetailCtrl', function ($scope, $stateParams, $ionicPopup, $cordovaSocialSharing, Incidents, StorageService) {
    $scope.incident = Incidents.get($stateParams.incidentId);
    console.log($scope.incident);

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
                template: 'No pudo enviarse la incidencia',
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
                    title: 'Aviso',
                    template: 'La incidencia ya se encuentra en Favoritos',
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
                    title: 'Aviso',
                    template: 'Incidencia agregada a Favoritos',
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

.controller('NewIncidentCtrl', function ($scope, $stateParams, $ionicModal, $log, $ionicPopup, $ionicLoading, geolocation, Images, Categories, StorageService, IDGenerator) {
    $scope.categorie = Categories.get($stateParams.categorieId);
    $scope.newForm = {};
    var incidentCoords;

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
            userCoords = data.coords;
            incidentCoords = data.coords;
            // Mark's user location
            $scope.marker = {
                id: 0,
                show: false,
                coords: {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                },
                options: {
                    draggable: true
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
                  incidentCoords.coords.latitude = marker.getPosition().lat();
                  incidentCoords.coords.longitude = marker.getPosition().lng();
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

    $scope.submit = function () {

        var newIncident = {
            id: IDGenerator.generate(),
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
                phone: $scope.newForm.phone
            }
        };

        console.log(newIncident);

        // Save Local Incident
        StorageService.add(newIncident);

        // Send remote Incident...

        // An alert dialog
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Incidencia Enviada',
                template: 'Muchas gracias por su colaboración',
                okType: 'button-balanced'
            });
            alertPopup.then(function (res) {
                window.history.back();
            });
        };

        $scope.showAlert();
    };

})

.controller('MyIncidentsCtrl', function ($scope, $ionicModal, StorageService, Categories, CategorieFilter) {
    $scope.incidents = StorageService.getAll();
    $scope.categories = Categories.getAll();

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

.controller('MyIncidentDetailCtrl', function ($scope, $stateParams, StorageService, $cordovaSocialSharing, CategorieFilter) {
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
                template: 'No pudo enviarse la incidencia',
                okType: 'button-balanced'
            });
            alertPopup.then(function (res) {
            });
      });
    };
})

.controller('FavoritesCtrl', function ($scope, $ionicModal, StorageService, Categories, CategorieFilter) {

    $scope.incidents = StorageService.getAllFavorites();
    $scope.categories = Categories.getAll();
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

.controller('FavoriteDetailCtrl', function ($scope, $stateParams, $cordovaSocialSharing, StorageService) {
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
                template: 'No pudo enviarse la incidencia',
                okType: 'button-balanced'
            });
            alertPopup.then(function (res) {
            });
      });
    };
})

.controller('AccountCtrl', function ($scope, $ionicPopup, $translate, StorageService) {

    var account = StorageService.getAccount();

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
                title: 'Datos guardados',
                template: 'Sus datos se usarán al enviar una incidencia',
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
.controller('StateCtrl', function($state) {
    this.onTabSelected = function(_scope){
    // if we are selecting the home title then 
    // change the state back to the top state
        switch (_scope.title) {
            case 'Incidencias':
            setTimeout(function() {
                $state.go('tab.incidents', {});
            },20);
            break;
            case 'Incidents':
            setTimeout(function() {
                $state.go('tab.incidents', {});
            },20);
            break;
            case 'Mis incidencias':
            setTimeout(function() {
                $state.go('tab.my-incidents', {});
            },20);
            break;
            case 'My incidents':
            setTimeout(function() {
                $state.go('tab.my-incidents', {});
            },20);
            break;
            case 'Favoritas':
            setTimeout(function() {
                $state.go('tab.favorites', {});
            },20);
            break;
            case 'Favorites':
            setTimeout(function() {
                $state.go('tab.favorites', {});
            },20);
            break;  
        }
    };
});