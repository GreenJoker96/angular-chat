angular.module('services')
    .service('localStorage', localStorage);

function localStorage() {

    var prefix = 'angularChat';

    this.add = (key, value) => {
        return window.localStorage.setItem(prefix + '.' + key, JSON.stringify(value));
    };

    this.get = (key) => {
        return JSON.parse(window.localStorage.getItem(prefix + '.' + key));
    };

    this.remove = (key) => {
        return window.localStorage.removeItem(prefix + '.' + key);
    };

}