angular.module('services')
    .service('User', User);

function User($state, localStorage) {

    var vm = this;
    vm.currentUser = null;
    vm.userToken = null;

    this.isLoggedIn = () => vm.currentUser !== null;

    this.logIn = (user, token) => {
        localStorage.add('currentUser', user);
        localStorage.add('userToken', token);
        this.getLoggedInUser();
        $state.go('home');
    };

    this.getLoggedInUser = () => {
        vm.currentUser = localStorage.get('currentUser');
    };

    this.getUserToken = () => {
        return localStorage.get('userToken');
    };

    this.logout = () => {
        localStorage.remove('currentUser');
        localStorage.remove('userToken');
        vm.currentUser = null;
        vm.userToken = null;
        $state.go('login');
    };
}