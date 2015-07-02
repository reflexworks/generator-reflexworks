/**
 * 認証用トークン作成サービス
 */
(function () {
    'use strict';
    angular.module('<%= serviceName %>App')
    .service('createTokenService', function($rootScope) {

    	var _count_str = 0;
    	var getWsseObj = function(Password, Token) {
    	    var PasswordDigest, Nonce, Created, shaObj, nonceEncoded;
    	    var r = new Array;
    	    var datatime = isodatetime();

    	    _count_str++;

    	    if (!Token) Token = '';
    	    Nonce = b64_sha1(datatime + 'There is more than words' + _count_str);
    	    nonceEncoded = encode64(Nonce);
    	    Created = datatime;

    	    shaObj = new jsSHA(Token + Nonce + Created + Password, "ASCII");
    	    PasswordDigest = shaObj.getHash("SHA-256", "B64");

    	    r[0] = nonceEncoded;
    	    r[1] = Created;
    	    r[2] = PasswordDigest;
    	    return r;
    	};

    	// WSSEオブジェクト作成：固定値のAPIキーなし
    	var getWsse = function(username, password){
    	    var w = getWsseObj(password, null);
            return 'UsernameToken Username="' + username + '", PasswordDigest="' + w[2] + '", Created="' + w[1] + '", Nonce="' + w[0] + '"';
		};
    	// WSSEオブジェクト作成：固定値のAPIキーあり
    	var getWsseToApikey = function(username, password, apiKey, apiName){
    	    var w = getWsseObj(password, apiKey);
            return 'UsernameToken Username="' + username + ':'+ apiName +'", PasswordDigest="' + w[2] + '", Created="' + w[1] + '", Nonce="' + w[0] + '"';
		};

		var getRxidObj = function(wsse){

			/**
			 * RXIDのcreatedをWSSE用("yyyy-MM-dd'T'HH:mm:ss+99:99"形式の文字列)に変換
			 * @param created
			 */
			var getDateTimeOfRXID = function(created){
				var dated = created.slice(0,19);
				var endstr = created.split(dated)[1].slice(0,3);
				dated = dated.replace(/-/g,'').replace(/T/g,'').replace(/:/g,'');
				endstr = endstr.indexOf('+') !== -1 ? endstr.replace(/\+/g,'P') : endstr.replace(/-/g,'M');
				return dated + endstr;
			};

			/**
			 * rotate13(簡易暗号化)
			 * @param s
			 * @return 暗号化文字列
			 */
			var rot13 = function(s) {

				var sb = [];
			    for (var i = 0; i < s.length; ++i) {
			        var c = s.charCodeAt(i);
			        if       (c === '@'.charCodeAt(0)) c = '!'.charCodeAt(0);
			        else if  (c === '!'.charCodeAt(0)) c = '@'.charCodeAt(0);
			        else if  (c === '/'.charCodeAt(0)) c = '~'.charCodeAt(0);
			        else if  (c === '~'.charCodeAt(0)) c = '/'.charCodeAt(0);
			        else if  (c === '+'.charCodeAt(0)) c = '*'.charCodeAt(0);
			        else if  (c === '*'.charCodeAt(0)) c = '+'.charCodeAt(0);
			        else if  (c >= 'a'.charCodeAt(0) && c <= 'm'.charCodeAt(0)) c += 13;
			        else if  (c >= 'A'.charCodeAt(0) && c <= 'M'.charCodeAt(0)) c += 13;
			        else if  (c >= 'n'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) c -= 13;
			        else if  (c >= 'N'.charCodeAt(0) && c <= 'Z'.charCodeAt(0)) c -= 13;

			        if (s[i] !== '=') {
			        	sb.push(String.fromCharCode(c));
			        }
			    }
			    return sb.join('');
			};

			var wsseItem = wsse.replace('UsernameToken ','').split(', ');
			var Username = wsseItem[0].split('="')[1].split('"')[0];
			var PasswordDigest = wsseItem[1].split('="')[1].split('"')[0];
			var Created = wsseItem[2].split('="')[1].split('"')[0];
			var Nonce = wsseItem[3].split('="')[1].split('"')[0];

			return getDateTimeOfRXID(Created)+'-'+rot13(Nonce)+'-'+rot13(PasswordDigest)+'-'+rot13(Username);

		};

		// RXIDオブジェクト作成：固定値のAPIキーなし
		var getRxid = function(username, password){
    	    var wsseObj = getWsse(username, password);
    	    return getRxidObj(wsseObj);
		};
    	// RXIDオブジェクト作成：固定値のAPIキーあり
		var getRxidToApikey = function(username, password, apiKey, apiName){
    	    var wsseObj = getWsseToApikey(username, password, apiKey, apiName);
    	    return getRxidObj(wsseObj);
		};
        return {
			getWsse: getWsse,
			getWsseToApikey: getWsseToApikey,
			getRxid: getRxid,
			getRxidToApikey: getRxidToApikey
        };
    });
}());
