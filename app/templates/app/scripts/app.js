'use strict';
angular.module('<%= serviceName %>App', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
])
    .config(function ($provide, $routeProvider, $httpProvider) {

        var routePath  = {
                'TOP' : '/',
                'REFLEX_DATA_SERVICE_DEMO' : '/reflexDataServiceDemo',
                'PDF_CREATE_DEMO': '/PDFCreateDemo',
                'XLS_CREATE_DEMO': '/XLSCreateDemo',
                'SERVER_SIDE_JAVASCRIPT_DEMO': '/serverSideJavascript'
            };
            $provide.constant('RoutePath', routePath);

            $routeProvider
                .when(routePath.TOP, { templateUrl: 'views/MainView.html', controller: 'MainCtrl' })
                .when(routePath.REFLEX_DATA_SERVICE_DEMO, { templateUrl: 'views/ReflexDataServiceDemo.html', controller: 'ReflexDataServiceDemoCtrl' })
                .when(routePath.PDF_CREATE_DEMO, { templateUrl: 'views/PDFCreateDemo.html', controller: 'PDFCreateDemoCtrl' })
                .when(routePath.XLS_CREATE_DEMO, { templateUrl: 'views/XLSCreateDemo.html', controller: 'XLSCreateDemoCtrl' })
                .when(routePath.SERVER_SIDE_JAVASCRIPT_DEMO, { templateUrl: 'views/ServerSideJavascriptDemo.html', controller: 'ServerSideJavascriptDemoCtrl' })
                .otherwise({
                    redirectTo: routePath.TOP
                });

});


( function() {
    try {
        var a = new Uint8Array(1);
        return; //no need
    } catch(e) { }

    function subarray(start, end) {
        return this.slice(start, end);
    }

    function set_(array, offset) {
        if (arguments.length < 2) offset = 0;
        for (var i = 0, n = array.length; i < n; ++i, ++offset)
            this[offset] = array[i] & 0xFF;
    }

    // we need typed arrays
    function TypedArray(arg1) {
        var result;
        if (typeof arg1 === "number") {
            result = new Array(arg1);
            for (var i = 0; i < arg1; ++i)
                result[i] = 0;
        } else
            result = arg1.slice(0);
        result.subarray = subarray;
        result.buffer = result;
        result.byteLength = result.length;
        result.set = set_;
        if (typeof arg1 === "object" && arg1.buffer)
            result.buffer = arg1.buffer;

        return result;
    }

    window.Uint8Array = TypedArray;
    window.Uint32Array = TypedArray;
    window.Int32Array = TypedArray;

} ());
