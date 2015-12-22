angular.module('starter', ['ionic', 'ngCordova', 'ngStorage', 'pascalprecht.translate', 'geolocation', 'uiGmapgoogle-maps', 'starter.controllers', 'starter.services'])

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
        templateUrl: "templates/tabs.html"
        }
    )

    // Each tab has its own nav history stack:

    // INCIDENTS TABS
    .state('tab.incidents', {
        url: '/incidents',
        views: {
            'tab-incidents': {
                templateUrl: 'templates/incidents/tab-incidents.html'
                // controller: is called on tabs.html
            }
        }
    })
        .state('tab.incidents-map', {
            url: '/incidents-map',
            views: {
                'tab-incidents': {
                    templateUrl: 'templates/incidents/tab-incidents-map.html',
                    controller: 'IncidentsMapCtrl'
                }
            }
        })
        .state('tab.incidents-grid', {
            url: '/incidents-grid',
            views: {
                'tab-incidents': {
                    templateUrl: 'templates/incidents/tab-incidents-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })
        .state('tab.new', {
            url: '/new',
            views: {
                'tab-incidents': {
                    templateUrl: 'templates/incidents/tab-new.html',
                    controller: 'CategoriesCtrl'
                }
            }
        })
        .state('tab.new-incident-form', {
            url: '/new/:categorieId',
            views: {
                'tab-incidents': {
                    templateUrl: 'templates/incidents/new-incident-form.html',
                    controller: 'NewIncidentCtrl'
                }
            }
        })
      .state('tab.incident-detail', {
          url: '/incidents/:incidentId',
          views: {
              'tab-incidents': {
                  templateUrl: 'templates/incidents/incident-detail.html',
                  controller: 'IncidentDetailCtrl'
              }
          }
      })

    .state('tab.my-incidents', {
        url: '/my-incidents',
        views: {
            'tab-my-incidents': {
                templateUrl: 'templates/incidents/tab-my-incidents.html'
                // controller: is called on tabs.html
            }
        }
    })
        .state('tab.my-incidents-map', {
            url: '/my-incidents-map',
            views: {
                'tab-my-incidents': {
                    templateUrl: 'templates/incidents/tab-my-incidents-map.html',
                    controller: 'MyIncidentsMapCtrl'
                }
            }
        })
        .state('tab.my-incidents-grid', {
            url: '/my-incidents-grid',
            views: {
                'tab-my-incidents': {
                    templateUrl: 'templates/incidents/tab-my-incidents-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })
        .state('tab.my-incident-detail', {
            url: '/my-incidents/:incidentId',
            views: {
                'tab-my-incidents': {
                    templateUrl: 'templates/incidents/my-incident-detail.html',
                    controller: 'MyIncidentDetailCtrl'
                }
            }
        })

    .state('tab.favorites', {
        url: '/favorites',
        views: {
            'tab-favorites': {
                templateUrl: 'templates/incidents/tab-favorites.html'
                // controller: is called on tabs.html
            }
        }
    })
        .state('tab.favorites-map', {
            url: '/favorites-map',
            views: {
                'tab-favorites': {
                    templateUrl: 'templates/incidents/tab-favorites-map.html',
                    controller: 'FavoritesMapCtrl'
                }
            }
        })
        .state('tab.favorites-grid', {
            url: '/favorites-grid',
            views: {
                'tab-favorites': {
                    templateUrl: 'templates/incidents/tab-favorites-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })
        .state('tab.favorite-detail', {
            url: '/favorites/:incidentId',
            views: {
                'tab-favorites': {
                    templateUrl: 'templates/incidents/favorite-detail.html',
                    controller: 'FavoriteDetailCtrl'
                }
            }
        })

    /// ACTIVITIES TABS
    .state('tab.activities', {
        url: '/activities',
        views: {
            'tab-activities': {
                templateUrl: 'templates/activities/tab-activities.html'
                // controller: is called on tabs.html
            }
        }
    })

    .state('tab.activities-map', {
            url: '/activities-map',
            views: {
                'tab-activities': {
                    templateUrl: 'templates/activities/tab-activities-map.html',
                    controller: 'ActivitiesMapCtrl'
                }
            }
        })
        .state('tab.activities-grid', {
            url: '/activities-grid',
            views: {
                'tab-activities': {
                    templateUrl: 'templates/activities/tab-activities-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })
        .state('tab.new-activitie', {
            url: '/new-activitie',
            views: {
                'tab-activities': {
                    templateUrl: 'templates/activities/tab-new-activitie.html',
                    controller: 'CategoriesCtrl'
                }
            }
        })
        .state('tab.new-activitie-form', {
            url: '/new/:categorieId',
            views: {
                'tab-activities': {
                    templateUrl: 'templates/activities/new-activitie-form.html',
                    controller: 'NewActivitieCtrl'
                }
            }
        })
      .state('tab.activitie-detail', {
          url: '/activities/:activitieId',
          views: {
              'tab-activities': {
                  templateUrl: 'templates/activities/activitie-detail.html',
                  controller: 'ActivitieDetailCtrl'
              }
          }
        })

    .state('tab.my-activities', {
        url: '/my-activities',
        views: {
            'tab-my-activities': {
                templateUrl: 'templates/activities/tab-my-activities.html'
                // controller: is called on tabs.html
            }
        }
    })
        .state('tab.my-activities-map', {
            url: '/my-activities-map',
            views: {
                'tab-my-activities': {
                    templateUrl: 'templates/activities/tab-my-activities-map.html',
                    controller: 'MyActivitiesMapCtrl'
                }
            }
        })
        .state('tab.my-activities-grid', {
            url: '/my-activities-grid',
            views: {
                'tab-my-activities': {
                    templateUrl: 'templates/activities/tab-my-activities-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })
        .state('tab.my-activitie-detail', {
            url: '/my-activities/:activitieId',
            views: {
                'tab-my-activities': {
                    templateUrl: 'templates/activities/my-activitie-detail.html',
                    controller: 'MyActivitieDetailCtrl'
                }
            }
        })

    .state('tab.favorites-activities', {
        url: '/favorites-activities',
        views: {
            'tab-favorites-activities': {
                templateUrl: 'templates/activities/tab-favorites-activities.html'
                // controller: is called on tabs.html
            }
        }
    })
        .state('tab.favorites-activities-map', {
            url: '/favorites-activities-map',
            views: {
                'tab-favorites-activities': {
                    templateUrl: 'templates/activities/tab-favorites-activities-map.html',
                    controller: 'FavoritesMapCtrl'
                }
            }
        })
        .state('tab.favorites-activities-grid', {
            url: '/favorites-activities-grid',
            views: {
                'tab-favorites-activities': {
                    templateUrl: 'templates/activities/tab-favorites-activities-grid.html'
                    // controller: is called on tabs.html
                }
            }
        })
        .state('tab.favorite-activitie-detail', {
            url: '/favorites-activitie/:activitieId',
            views: {
                'tab-favorites-activities': {
                    templateUrl: 'templates/activities/favorite-activitie-detail.html',
                    controller: 'FavoriteDetailCtrl'
                }
            }
        })

    // ACCOUNT TAB
    .state('account', {
        url: '/account',
        templateUrl: 'templates/account.html',
        controller: 'AccountCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/incidents');
});
