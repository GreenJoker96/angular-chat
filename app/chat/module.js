angular.module('chat', []);

angular.module('chat')
    .controller('ChatController', ChatController)
    .config($stateProvider => {
        $stateProvider
            .state('chat', {
                url: '/chat',
                controller: 'ChatController',
                templateUrl: 'chat/chat.html',
                controllerAs: 'chat'
            });
    });

function ChatController($scope, localStorage, $http) {
    var socket = io();

    var vm = this;

    vm.messages = [];

    vm.message ={
        sender: localStorage.get('currentUser').username,
        body: ''
    };

    $http.get('/getMessages').then(res => {
       res.data.chat.messages.forEach((message) => {
           vm.messages.push({body: message.sender + ' says ' + message.body});
       });
    });

    vm.sendMessage = () => {
        if (vm.message !== '') {
            socket.emit('chat message', vm.message);
        }
        vm.message.body = '';
        return false;
    };

    vm.addMessage = (msg) => {
        $scope.$apply(vm.messages.push({body: msg.sender + ' says ' + msg.body}));
    };

    socket.on('chat message', (msg) => {
        vm.addMessage(msg);
    });

}