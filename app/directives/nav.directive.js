angular.module("directives")
    .directive('customNav', customNav);

function customNav() {

    function controller(User) {
        this.isLoggedIn = User.isLoggedIn;
    }

    return {
        restrict: 'E',
        controller: controller,
        controllerAs: 'customNav',
        bindToController: true,
        templateUrl: 'directives/customNav.html',
        scope: {

        }
    };

}