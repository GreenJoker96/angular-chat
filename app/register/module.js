angular.module('register', []);

angular.module('register')
    .controller('RegisterController', RegisterController)
    .config($stateProvider => {
        $stateProvider
            .state('register', {
                url: '/register',
                controller: 'RegisterController',
                templateUrl: 'register/register.html',
                controllerAs: 'register'
            });
    });

function RegisterController(Register) {
    this.registration = Register.registration;
    this.createAccount = Register.createAccount;
}