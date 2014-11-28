(function () {
    'use strict';
    angular.module('<%= serviceName %>App')
        .controller('MainCtrl', function ($scope, $log, $resource) {

            var init = function() {

                $scope.masseage = 'Hellow <%= serviceName %>';

            };
            init();

        });
}());
