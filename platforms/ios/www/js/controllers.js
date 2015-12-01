var popup = false;

angular.module('starter.controllers', [])

.controller('IncidentsCtrl', function ($scope, $ionicModal, $ionicPopup, $translate, Incidents, Categories, CategorieFilter, StorageService) {
    $scope.incidents = Incidents.all();
    $scope.categories = Categories.all();

    if (StorageService.isFirstVisit()) {
        // Language Selection at first visit

        if (popup === false) {
            popup = true;
            $ionicPopup.show({
                template: 'El idioma elegido se usará por defecto',
                title: 'Elija un idioma',
                scope: $scope,
                buttons: [
                  {
                      text: 'Español',
                      type: 'button-positive',
                      onTap: function () {
                          return 'es';
                      }
                  },
                  {
                      text: 'Inglés',
                      type: 'button-positive',
                      onTap: function () {
                          return 'en';
                      }
                  }
                ]
            }).then(function (res) {

                StorageService.setFirstVisit();

                if (res === 'en') {
                    StorageService.setLanguage('en');
                    $translate.use(StorageService.getLanguage());
                } else {
                    StorageService.setLanguage('es');
                    $translate.use(StorageService.getLanguage());
                }
                popup = false;
            });  
        }
        // If is not first visit, set language
    } else {
        $translate.use(StorageService.getLanguage());
    }

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/filter-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    })

    $scope.openModal = function () {
        $scope.modal.show()
    }

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    // CategorieFilter //
    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
    }

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    }
})

.controller('IncidentsMapCtrl', function ($scope, $stateParams, $ionicLoading, geolocation) {

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    // Mark's user location and center's the map on Albufera coords
    geolocation.getLocation().then(function (data) {
        $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12 };

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

})

.controller('IncidentDetailCtrl', function ($scope, $stateParams, $ionicPopup, Incidents, StorageService) {
    $scope.incident = Incidents.get($stateParams.incidentId);

    // share anywhere
    $scope.share = function () {
        $cordovaSocialSharing.share('This is my message', 'Subject string', null, 'http://www.mylink.com');
    }

    $scope.addToFavorites = function () {
        if (StorageService.addToFavorites($scope.incident) === null) {
            // An alert dialog
            $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Aviso',
                    template: 'La incidencia ya se encuentra en Favoritos'
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
                    template: 'Incidencia agregada a Favoritos'
                });
                alertPopup.then(function (res) {
                });
            };

            $scope.showAlert();
        }

    };

})

.controller('CategoriesCtrl', function ($scope, Categories) {
    $scope.categories = Categories.all();
})

.controller('NewIncidentCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup, $ionicLoading, geolocation, Images, Categories, StorageService, IDGenerator) {
    $scope.categorie = Categories.get($stateParams.categorieId);

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/new-incident-image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    })

    $scope.openModal = function () {
        $scope.modal.show()
    }

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    // Take photo from Camera
    $scope.takePhoto = function () {
        Images.GetPicture().then(function (data) {
            console.log(data);
            $scope.imgURI = "data:image/jpeg;base64," + data;
            $scope.closeModal();
        }, function (err) {
            console.err(err);
        });
    }

    // Choose photo from Gallery
    $scope.choosePhoto = function () {
        Images.ChoosePicture().then(function (data) {
            console.log(data);
            $scope.imgURI = "data:image/jpeg;base64," + data;
            $scope.closeModal();
        }, function (err) {
            console.err(err);
        });
    }

    // Geolocation
    $scope.getCoordenades = function () {

        // Setup the loader
        $ionicLoading.show({
            content: 'Cargando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        geolocation.getLocation().then(function (data) {
            $scope.newForm.coords = data.coords.latitude + ", " + data.coords.longitude;
            $ionicLoading.hide();
        });
    }

    // Form Validation
    $scope.newForm = {};
    $scope.newForm.town = "";
    $scope.newForm.description = "";
    incidentCategorie = Categories.get($stateParams.categorieId);

    var account = StorageService.getAccount();

    if (account === undefined) {
        $scope.newForm.name = "";
        $scope.newForm.subname = "";
        $scope.newForm.email = "";
        $scope.newForm.phone = "";
    } else {
        $scope.newForm.name = account.name;
        $scope.newForm.subname = account.subname;
        $scope.newForm.email = account.email;
        $scope.newForm.phone = account.phone;
    }


    $scope.submit = function () {

        var newIncident = {
            id: IDGenerator.generate(),
            categorie: incidentCategorie.name,
            town: $scope.newForm.town,
            date: new Date().toLocaleString(),
            description: $scope.newForm.description,
            image: $scope.imgURI,
            coords: $scope.newForm.coords
        };

        // Save Local Incident
        StorageService.add(newIncident);

        // Send remote Incident...

        // An alert dialog
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Incidencia Enviada',
                template: 'Muchas gracias por su colaboración'
            });
            alertPopup.then(function (res) {
                window.history.back();
            });
        };

        $scope.showAlert();
    }

})

.controller('MyIncidentsCtrl', function ($scope, $ionicModal, StorageService, Categories, CategorieFilter) {
    $scope.incidents = StorageService.getAll();
    $scope.categories = Categories.all();

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/filter-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    })

    $scope.openModal = function () {
        $scope.modal.show()
    }

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
    }

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    }
})

.controller('MyIncidentsMapCtrl', function ($scope, $stateParams, $ionicLoading, geolocation) {

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    // Mark's user location and center's the map on Albufera coords
    geolocation.getLocation().then(function (data) {
        $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12 };

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

        $scope.title = "Usted se encuentra aquí!";

        $ionicLoading.hide();
    });

})

.controller('MyIncidentDetailCtrl', function ($scope, $stateParams, StorageService, CategorieFilter) {
    $scope.incident = StorageService.get($stateParams.incidentId);
})

.controller('FavoritesCtrl', function ($scope, $ionicModal, StorageService, Categories, CategorieFilter) {

    $scope.incidents = StorageService.getAllFavorites();
    $scope.categories = Categories.all();
    $scope.remove = function (incident) {
        StorageService.removeFavorite(incident);
    }

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/filter-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    })

    $scope.openModal = function () {
        $scope.modal.show()
    }

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    // CategorieFilter //

    $scope.includeCategorie = function (categorie) {
        CategorieFilter.includeCategorie(categorie);
    }

    $scope.categorieFilter = function (incident) {
        return CategorieFilter.filter(incident);
    }
})

.controller('FavoritesMapCtrl', function ($scope, $stateParams, $ionicLoading, geolocation, CategorieFilter) {

    // Setup the loader
    $ionicLoading.show({
        content: 'Cargando...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    // Mark's user location and center's the map on Albufera coords
    geolocation.getLocation().then(function (data) {
        $scope.map = { center: { latitude: 39.333, longitude: -0.367 }, zoom: 12 };

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

        $scope.title = "Usted se encuentra aquí!";

        $ionicLoading.hide();
    });

})

.controller('FavoriteDetailCtrl', function ($scope, $stateParams, StorageService) {
    $scope.incident = StorageService.getFavorite($stateParams.incidentId);
})

.controller('AccountCtrl', function ($scope, $ionicPopup, $translate, StorageService) {

    var account = StorageService.getAccount();

    // Form Validation
    $scope.account = {};
    if (account === undefined) {
        $scope.account.name = "";
        $scope.account.subname = "";
        $scope.account.email = ""
        $scope.account.phone = "";
    } else {
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
        }

        StorageService.addAccount(newAccount);

        // An alert dialog
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Datos guardados',
                template: 'Sus datos se usarán al enviar una incidencia'
            });
            alertPopup.then(function (res) {
                window.history.back();
            });
        };

        $scope.showAlert();
    }

    $scope.changeLanguage = function (key) {
        StorageService.setLanguage(key);
        $translate.use(key);
    };
});