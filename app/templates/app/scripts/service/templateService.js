/**
 * テンプレート JSON 取得サービス
 */
(function () {
    'use strict';
    angular
    .module('<%= serviceName %>App')
    .service('templateService', function ($q, $resource, MasterPath) {

        var deferred = $q.defer();

        var service = {
            get : function() {
                return deferred.promise;
            },
            templateValue : ''
        };

        var onSuccess = function(resolveObj) {
            var src = resolveObj.feed.entry[0].content["$$text"];
            var data = {
                template : src.split('\n')
            };

            service.templateValue = src.split('\n');

            deferred.resolve(data);
        };
        var onFault = function(rejectObj) {
        	if (angular.equals(rejectObj.status, 403)
        			|| angular.equals(rejectObj.status, 401)
        			|| angular.equals(rejectObj.status, 417)) {
        		location.href = 'login.html';
        	} else {
        		console.log('template Error: ', rejectObj);
        	}
        };

        $resource(MasterPath['template'])
        .get()
        .$promise
        .then(onSuccess, onFault);

        return service;
    });
}());