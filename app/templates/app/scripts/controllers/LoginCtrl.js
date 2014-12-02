(function () {
    'use strict';
    angular.module('<%= serviceName %>App')
        .controller('LoginCtrl', function ($scope, $log, $timeout,
        		reflexDataService, createTokenService) {

        	var init = function(){

        		$scope.loginError = {messeage: ''};
        		$scope.InputError = {messeage: ''};
        		$scope.loginError.messeage = 'Failed to login .';
        		$scope.InputError.messeage = 'Please enter the account or password .';

        		$scope.login = function(){

            		$scope.errorMesseage = null;
            		$scope.errorStatus = null;

            		var user = $scope.user;
            		var pass = angular.element('input[type="password"]').val();
            		var getPass = function(def_pass){
        				var shaObj = new jsSHA(def_pass, "ASCII");
        				return shaObj.getHash("SHA-256", "B64");
            		};
            		if (user && pass) {
                		pass = getPass(pass);
                		var auth = createTokenService.getRxidToApikey(user, pass, '<%= apiKey %>', '<%= serviceName %>');
                		reflexDataService.get('/d?_uid&_RXID=' + auth).then(function(res){
                			location.href = '/';
                		},function(res){
                			$scope.errorMesseage = $scope.loginError;
                			$scope.errorStatus = res.status;
                		});
            		} else {
            			$scope.errorMesseage = $scope.InputError;
            		}
            	};
        	};

        	$timeout(function(){
        		init();
        	}, 0);

        });
}());
