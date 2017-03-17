angular.module('home', []);

angular.module('home')
    .controller('HomeController', HomeController)
    .config($stateProvider => {
        $stateProvider
            .state('home', {
                url: '/home',
                controller: 'HomeController',
                templateUrl: 'home/home.html',
                controllerAs: 'home'
            });
    });

function HomeController() {
    this.home = 'All set, get coding.';
}