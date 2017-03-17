angular.module('app', [
    'templates',
    'ui.router',
    'directives',
    'services',
    'home',
    'register',
    'login',
    'chat'
])
    .config(function ($urlRouterProvider, $stateProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $urlRouterProvider.otherwise('/home');
    })
    .run(function (User) {
        User.getLoggedInUser();
    });