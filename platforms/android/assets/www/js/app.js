angular.module('starter', ['ionic', 'ngCordova', 'ngStorage', 'pascalprecht.translate', 'geolocation', 'uiGmapgoogle-maps', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function (uiGmapGoogleMapApiProvider, $translateProvider) {
    // Google Maps Configuration
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAayzuHxlfJUmzMRkBRHIxvXOen2dTYUyU',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });

    // Translate Dictionary
    /*$translateProvider.translations('en', { // ENGLISH
        // tabs
        STATUS: 'Status',
        NEW_INCIDENT: 'New incident',
        INCIDENTS: 'Incidents',
        MY_INCIDENTS: 'My incidents',
        FAVORITES: 'Favorites',
        PROFILE: 'Profile',
        // tab-new
        SELECT: 'Select categorie:',
        CLEANING: 'Cleaning',
        PUBLIC_ROAD: 'Public Road',
        SIGNS: 'Signs',
        GRAFFITI: 'Graffiti',
        FURNITURE: 'Furniture',
        GARDENS: 'Gardens',
        LIGHTING: 'Lighting',
        TRANSPORT: 'Transport',
        IDEAS: 'Ideas for Albufera 2016',
        FACILITIES: 'Municipal Facilities',
        IMPROVEMENTS: 'Improvements for Albufera',
        OTHERS: 'Others',
        // new-incident-form
        IMAGE: 'Image',
        ADD_IMAGE: 'Add image',
        LOCATION: 'Location',
        GET_COORDS: 'Get coordinates',
        COORDS: 'Coordinates',
        DESCRIPTION: 'Description',
        DATA: 'Personal data',
        NEVER: 'They will never be published',
        NAME: 'Name',
        SUBNAME: 'Subname',
        EMAIL: 'Email',
        PHONE: 'Telephone',
        SEND: 'Send',
        PLEASE: 'Please, be as brief and specific as possible',
        // new-incident-image-modal
        SELECT_ACTION: 'Select an action',
        CANCEL: 'Cancel',
        TAKE_PHOTO: 'Take photo',
        CHOOSE_FROM_GALLERY: 'Choose from gallery',
        // tab-incidents
        FILTER: 'Search filter',
        // filter-modal
        CAT_FILTER: 'Filter by category',
        ACCEPT: 'Accept',
        // tab-incidents-map
        INFO: 'You are here!',
        // incident-detail
        LIKE: 'Like',
        SHARE: 'Share',
        ADD_FAVORITES: 'Add to Favorites',
        // tab-my-incidents
        STILL: 'Still has not created any incident',
        // tab-favorites
        NOT_ADDED: 'Still not added any incident to your favorites',
        // favorite-detail
        REMOVE_FAVORITE: 'Remove from Favorites',
        // tab-account
        CONTACT: 'Contact information',
        THIS_INFO: 'This information will be used to create an incident',
        SAVE: 'Save',
        LANGUAGE: 'Language',
        SPANISH: 'Spanish',
        ENGLISH: 'English'
    })
    .translations('es', { // SPANISH
        // tabs
        STATUS: 'Estado',
        NEW_INCIDENT: 'Nueva incidencia',
        INCIDENTS: 'Incidencias',
        MY_INCIDENTS: 'Mis incidencias',
        FAVORITES: 'Favoritas',
        PROFILE: 'Perfil',
        // tab-new
        SELECT: 'Seleccione la categoría:',
        CLEANING: 'Limpieza',
        PUBLIC_ROAD: 'Vía Pública',
        SIGNS: 'Señales',
        GRAFFITI: 'Pintadas',
        FURNITURE: 'Mobiliario',
        GARDENS: 'Jardines',
        LIGHTING: 'Alumbrado',
        TRANSPORT: 'Transporte',
        IDEAS: 'Ideas Albufera 2016',
        FACILITIES: 'Instalaciones Municipales',
        IMPROVEMENTS: 'Mejoras para Albufera',
        OTHERS: 'Otros',
        // new-incident-form
        IMAGE: 'Imagen',
        ADD_IMAGE: 'Añadir imagen',
        LOCATION: 'Localización',
        GET_COORDS: 'Obtener coordenadas',
        COORDS: 'Coordenadas',
        DESCRIPTION: 'Descripción',
        DATA: 'Datos personales',
        NEVER: 'Nunca serán publicados',
        NAME: 'Nombre',
        SUBNAME: 'Apellidos',
        EMAIL: 'Email',
        PHONE: 'Teléfono',
        SEND: 'Enviar',
        PLEASE: 'Por favor, sea lo más breve y específico posible',
        // new-incident-image-modal
        SELECT_ACTION: 'Seleccionar una acción',
        CANCEL: 'Cancelar',
        TAKE_PHOTO: 'Hacer una foto',
        CHOOSE_FROM_GALLERY: 'Elegir de la galería',
        // tab-incidents
        FILTER: 'Filtrar búsqueda',
        // filter-modal
        CAT_FILTER: 'Filtrar por categorías',
        ACCEPT: 'Aceptar',
        // incident-detail
        LIKE: 'Me gusta',
        SHARE: 'Compartir',
        ADD_FAVORITES: 'Añadir a Favoritos',
        // tab-incidents-map
        INFO: 'Usted se encuentra aquí!',
        // tab-my-incidents
        STILL: 'Todavía no ha creado ninguna incidencia',
        // tab-favorites
        NOT_ADDED: 'No ha añadido ninguna incidencia a sus favoritas',
        // favorite-detail
        REMOVE_FAVORITE: 'Quitar de favoritos',
        // tab-account
        CONTACT: 'Datos de contacto',
        THIS_INFO: 'Esta información se utilizará al crear una incidencia',
        SAVE: 'Guardar',
        LANGUAGE: 'Idioma',
        SPANISH: 'Español',
        ENGLISH: 'Inglés'
    });*/

    $translateProvider.useStaticFilesLoader({
    prefix: '../languages/',
    suffix: '.json'
    });

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
        templateUrl: "templates/tabs.html"
        }
    )

    // Each tab has its own nav history stack:

    .state('tab.incidents', {
        url: '/incidents',
        views: {
            'tab-incidents': {
                templateUrl: 'templates/tab-incidents.html'
                // controller: is called on tabs.html
            }
        }
    })
        .state('tab.incidents-map', {
            url: '/incidents-map',
            views: {
                'tab-incidents': {
                    templateUrl: 'templates/tab-incidents-map.html',
                    controller: 'IncidentsMapCtrl'
                }
            }
        })
        .state('tab.incidents-grid', {
            url: '/incidents-grid',
            views: {
                'tab-incidents': {
                    templateUrl: 'templates/tab-incidents-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })
        .state('tab.new', {
            url: '/new',
            views: {
                'tab-incidents': {
                    templateUrl: 'templates/tab-new.html',
                    controller: 'CategoriesCtrl'
                }
            }
        })
        .state('tab.new-incident-form', {
            url: '/new/:categorieId',
            views: {
                'tab-incidents': {
                    templateUrl: 'templates/new-incident-form.html',
                    controller: 'NewIncidentCtrl'
                }
            }
        })
      .state('tab.incident-detail', {
          url: '/incidents/:incidentId',
          views: {
              'tab-incidents': {
                  templateUrl: 'templates/incident-detail.html',
                  controller: 'IncidentDetailCtrl'
              }
          }
      })

    .state('tab.my-incidents', {
        url: '/my-incidents',
        views: {
            'tab-my-incidents': {
                templateUrl: 'templates/tab-my-incidents.html'
                // controller: is called on tabs.html
            }
        }
    })
        .state('tab.my-incidents-map', {
            url: '/my-incidents-map',
            views: {
                'tab-my-incidents': {
                    templateUrl: 'templates/tab-my-incidents-map.html',
                    controller: 'MyIncidentsMapCtrl'
                }
            }
        })
        .state('tab.my-incidents-grid', {
            url: '/my-incidents-grid',
            views: {
                'tab-my-incidents': {
                    templateUrl: 'templates/tab-my-incidents-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })
        .state('tab.my-incident-detail', {
            url: '/my-incidents/:incidentId',
            views: {
                'tab-my-incidents': {
                    templateUrl: 'templates/my-incident-detail.html',
                    controller: 'MyIncidentDetailCtrl'
                }
            }
        })

    .state('tab.favorites', {
        url: '/favorites',
        views: {
            'tab-favorites': {
                templateUrl: 'templates/tab-favorites.html'
                // controller: is called on tabs.html
            }
        }
    })
        .state('tab.favorites-map', {
            url: '/favorites-map',
            views: {
                'tab-favorites': {
                    templateUrl: 'templates/tab-favorites-map.html',
                    controller: 'FavoritesMapCtrl'
                }
            }
        })
        .state('tab.favorites-grid', {
            url: '/favorites-grid',
            views: {
                'tab-favorites': {
                    templateUrl: 'templates/tab-favorites-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })
        .state('tab.favorite-detail', {
            url: '/favorites/:incidentId',
            views: {
                'tab-favorites': {
                    templateUrl: 'templates/favorite-detail.html',
                    controller: 'FavoriteDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/incidents');

});
