(function () {
    'use strict';
    angular.module('<%= serviceName %>App')
        .service('reflexDataService', function($http, $q, $log, $filter, $window, DateFormat) {

            $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            $http.defaults.headers.common['Content-Type']     = 'text/json';

            var transformRequestFunc = function (data) {
                switch ( Object.prototype.toString( data ) ) {
                    case '[object Uint8Array]'        :
                    case '[object Int8Array]'         :
                    case '[object Uint16Array]'       :
                    case '[object Int16Array]'        :
                    case '[object Uint32Array]'       :
                    case '[object Int32Array]'        :
                    case '[object Float32Array]'      :
                    case '[object Float64Array]'      :
                    case '[object CanvasPixelArray]'  :
                    case '[object Uint8ClampedArray]' :
                    case '[object File]'              :
                    case '[object Blob]'              :
                        return data;
                }
                if (data !== null && typeof data === 'object') {
                    var bin0 = zlib.deflate(msgpack.pack(data));
                    var bin = new Uint8Array(bin0.subarray(2,bin0.length-4));// ヘッダ(先頭2バイト)とチェックサム(末尾4バイト)を削除
                    return bin;
//                    return msgpack.pack( data );
                } else {
                    return data;
                }
            };

//        $window.ua = {};
//        var ua     = $window.ua;
//        ua.name    = $window.navigator.userAgent.toLowerCase();
//        ua.isIE    = ( ua.name.indexOf('msie') >= 0 || ua.name.indexOf('trident') >= 0 );
//        if ( ua.isIE ) {
//            ua.verArray = /(msie|rv:?)\s?([\d\.]+)/.exec(ua.name);
//            if ( ua.isIE ) {
//                var version = parseInt( ua.verArray[2] );
//            }
//        }
//IE9以外であれば、arrをmsgpack化してzip圧縮して送信する。
//IE9であれば、arrではなく、entryを送信する（バリデーションエラー時はarrを参照する）

            var isOldIE = angular.element('html').is('.lt-ie10');
        	var isJson = true; // JSON通信フラグ

            var setHeaders = function(token) {
//                $log.debug('setHeaders : ', token);
                if (token) {
                    return { 'Authorization': 'Token ' + token };
                } else {
                    return null;
                }
            };
            var setHeadersByMsgpack = function(token) {
                var result = {
                    'Content-Type'    : 'application/x-msgpack',
                    'Content-Encoding': 'deflate'
                };
                if (token) {
                    result.Authorization = ( 'Token ' + token );
                }
                return result;
            };

            // GET処理
            this.get = function(url, token) {
                return $http({
                    method: 'GET',
                    url: url,
                    headers: setHeaders(token)
                });
            };

            // POST処理
            this.post = function(url, reqdata, token, reqArray) {
                if(isJson || isOldIE || angular.equals(reqArray, null)) {
                    return $http({
                        method: 'POST',
                        url: url,
                        data: JSON.stringify(reqdata),
                        headers: setHeaders(token)
                    });
                } else {
                    return $http({
                        method           : 'POST',
                        url              : url,
                        cache            : false,
                        headers          : setHeadersByMsgpack(token),
                        transformRequest : transformRequestFunc,
                        data             : reqArray
                    });
                }
            };

            // PUT処理
            this.put = function(url, reqdata, token, reqArray) {
                if(isJson || isOldIE || angular.equals(reqArray, null)) {
                    return $http({
                        method: 'PUT',
                        url: url,
                        data: JSON.stringify(reqdata),
                        headers: setHeaders(token)
                    });
                } else {
                    return $http({
                        method           : 'PUT',
                        url              : url,
                        cache            : false,
                        headers          : setHeadersByMsgpack(token),
                        transformRequest : transformRequestFunc,
                        data             : reqArray
                    });
                }
            };

            // DELETE処理
            this.deleted = function(url, token) {
                return $http({
                    method: 'DELETE',
                    url: url,
                    headers: setHeaders(token)
                });
            };

            // データフォーマット変換処理
            this.cast = function(data) {

                var doCast = function(entry){
                    angular.forEach(entry, function(value, key) {
                        if (value instanceof Date) {
                            entry[key] = $filter('date')(value, DateFormat);
                        } else if (angular.equals(value, null)) {
                        	delete entry[key];
                        } else  if (angular.equals(typeof value, 'object')){
                            entry[key] = doCast(value);
                        }
                    });
                    return entry;
                };
                angular.forEach(data.feed.entry, function(value, i) {
                    data.feed.entry[i] = doCast(value);
                }, data);
                return data;
            };

            this.getErrorMesseageList = function(res){
            	var messeage = [];
				if (res.data.feed.entry) {
	                angular.forEach(res.data.feed.entry[0].result.position, function(value, i) {
	                	this.push(value.message);
	                }, messeage);
				} else {
					messeage.push(res.data.feed.subtitle)
				}
				return messeage
            }

        });
}());
