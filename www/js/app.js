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
