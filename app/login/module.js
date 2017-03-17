angular.module('login', []);

angular.module('login')
    .controller('LoginController', LoginController)
    .config($stateProvider => {
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: 'login/login.html',
                controllerAs: 'login'
            })
            .state('logout', {
                onEnter: (User) => {
                    User.logout();
                }
            });
    });

function LoginController($http, User) {
    this.creds = {
        email: '',
        password: ''
    };


    this.signIn = () => {
        $http.post('/userLogin', this.creds).then(res => {
            User.logIn(res.data.user);
        });
    };
}