(function () {
    'use strict';
    angular.module('<%= serviceName %>App')
        .service('feedToArrayService', function($log) {

            var FIELD_PATTERN = /^( *)([a-zA-Z_$][0-9a-zA-Z_$.]*)(?:\(([a-zA-Z$]+)\))?((?:\[([0-9]+)?\]|\{([\-0-9]*)~?([\-0-9]+)?\})?)(\!?)(?:=(.+))?$/
         	var DATE_PATTERN = /^(\d{2})\/(\d{2})\/(\d{2})$/


         	var validate= function(prop,value,row,err) {

         		var token = [];

         		for(var i=0;i<8;i++) {
         			token[i] = prop.replace(FIELD_PATTERN, "$"+(i+2));
         		}

         		var result = {};
         		result['colName'] = token[0];
         		result['rowIndex'] = row;

         		if (value) {

         		switch (token[1].toLowerCase()) {
         			case 'boolean':
            			    if (typeof value != 'boolean') {
         					result['message'] = 'Booleanでなければなりません。';
         					result['code'] = 'boolean_error';
         					err.push(result);
         					return false;
         				}
         				break;
         			case 'datestring':

           			    if (typeof value != 'string') {
         					result['message'] = '正しい日付を指定してください。';
         					result['code'] = 'date_error';
         					err.push(result);
         		            return false;
         				}

         				for(var i=0;i<3;i++) {
         					token[i] = value.replace(DATE_PATTERN, "$"+(i+1));
         				}
         				var yy = '20'+token[0];
         				var mm = token[1]-1;
         				var dd = token[2];
         				var date = new Date(yy, mm, dd);

         		        if(isNaN(date)){
         					result['message'] = '正しい日付を指定してください。';
         					result['code'] = 'date_error';
         					err.push(result);
         		            return false;

         		        }else if (!(date.getFullYear() == yy && date.getMonth() == mm && date.getDate() == dd)) {
         					result['message'] = '正しい日付を指定してください。';
         					result['code'] = 'date_error';
         					err.push(result);
         					return false;
         		        }
         				break;
         			case 'int':
         			case 'long':
         			case 'float':
         			case 'double':
         				if (typeof value != 'number') {
         					if (typeof value == 'string') {
         						if (isNaN(Number(value))) {
         							result['message'] = '数値でなければなりません。';
                 					result['code'] = 'number_error';
         							err.push(result);
         							return false;
         						}else {
         							if (!angular.equals(token[4], '')&&!angular.equals(token[5], '')) {
         								if (Number(value)<Number(token[4])) {
         									result['message'] = '値が小さすぎます。';
                         					result['code'] = 'number_small_error';
         									err.push(result);
         									return false;
         								}
         								if (Number(token[5])<Number(value)) {
         									result['message'] = '値が大きすぎます。';
                         					result['code'] = 'number_large_error';
         									err.push(result);
         									return false;
         								}
         							}
         							if (!angular.equals(token[4], '')&&angular.equals(token[5], '')) {
         								if (Number(token[4])<Number(value)) {
         									result['message'] = '値が大きすぎます。';
                         					result['code'] = 'number_large_error';
         									err.push(result);
         									return false;
         								}
         							}
         							break;
         						}
         					}else {
         						result['message'] = '数値でなければなりません。';
             					result['code'] = 'number_error';
         						err.push(result);
         						return false;
         					}
         				}else {
         					if (!angular.equals(token[4], '')&&!angular.equals(token[5], '')) {
         						if (value<Number(token[4])) {
         							result['message'] = '値が小さすぎます。';
                 					result['code'] = 'number_small_error';
         							err.push(result);
         							return false;
         						}
         						if (Number(token[5])<value) {
         							result['message'] = '値が大きすぎます。';
                 					result['code'] = 'number_large_error';
         							err.push(result);
         							return false;
         						}
         					}
         					if (!angular.equals(token[4], '')&&angular.equals(token[5], '')) {
         						if (Number(token[4])<value) {
         							result['message'] = '値が大きすぎます。';
                 					result['code'] = 'number_large_error';
         							err.push(result);
         							return false;
         						}
         					}
         					break;
         				}
         		}

         		if (angular.isArray(value)) {
         			if (value.length==0&&!angular.equals(token[6], '')) {
         				result['message'] = '必須項目です。';
     					result['code'] = 'required_error';
         				err.push(result);
         				return false;
         			}else{
             			var regex =  new RegExp(token[7].replace(/\\\\/g,'\\'));
             			for(var i=0;i<value.length;i++) {
	             			if (!regex.exec(value[i])) {
	             				result['message'] = '不正なフォーマットです。';
	         					result['code'] = 'format_error';
	             				err.push(result);
	             				return false;
	             			}
             			}
         			}
         		}else {
             		if (!angular.equals(token[7], '')) {
             			var regex =  new RegExp(token[7].replace(/\\\\/g,'\\'));
             			if (!regex.exec(value)) {
             				result['message'] = '不正なフォーマットです。';
         					result['code'] = 'format_error';
             				err.push(result);
             				return false;
             			}
             		}
         		}

         		}else

         		if (!angular.equals(token[6], '')) {
         				result['message'] = '必須項目です。';
     					result['code'] = 'required_error';
         				err.push(result);
         				return false;
         		}

         		return true;
         	}

            var e2a = function(M, parent, value, row, err) {

                var result = [];
            	for ( var key in value) {
            		if ((typeof value[key]) == "object") {
            			if (value[key] instanceof Array) {
            				var b = [];
            				for ( var i = 0; i < value[key].length; i++) {
                				var a = [];
            					a.push(value[key][i]);
            					b[i]= a;
            				}
            				result[M[parent][key]._[0]] = b;
            			} else {
            				result[M[parent][key]._[0]] = e2a(M[parent], key, value[key],row,err);
            			}
            		} else {
                		if (M[parent][key]) {
                			result[M[parent][key]._[0]] = value[key];
                		}
            		}
            	}

                var i = 0;

                for (var item in M[parent]) {
                	if(M[parent][item]._) {
                        validate( M[parent][item]._[1], result[M[parent][item]._[0]],row,err);
                	}
            		if (!angular.equals(item, '_')) {
            			if (result[i]==undefined){
            				result[i] = null;
            			}
            			i++;
            		}
            	}

                return result;
            };

            var t2m2 = function (template, i, ancestor) {
                var result = {};
                var parent = template[i].replace(FIELD_PATTERN, "$2");
                var indp   = template[i].replace(FIELD_PATTERN, "$1").length;
                var k      = 0;
                var l      = template.length;
                result[parent] = {};
                for ( var j = i + 1; j < l; j++) {
                    var prop = template[j].replace(FIELD_PATTERN, "$2");
                    var indc = template[j].replace(FIELD_PATTERN, "$1").length;
                    if ( angular.equals( indc, (indp + 1) ) ) {
            			var p = ancestor+'.'+template[j].replace(/^\s+|\[\]|{}|\s+$/g,'');
                        result[parent][prop] = t2m2(template, j, ancestor)[prop];
                        result[parent][prop]['_'] = [];
                        result[parent][prop]['_'][0] = k;
                        result[parent][prop]['_'][1] = p;
                        k++;
                    } else if (indc <= indp) {
                        return result;
                    }
                }
                return result;
            };

            var t2m = function (templ) {
                var ATOM_ENTRY_TEMPLATE = [
                    "$xmlns",
                    "$xml$lang",
                    "$xml$base",
                    "author{}",
                    " $xml$lang",
                    " $xml$base",
                    " name",
                    " uri",
                    " email",
                    "category{}",
                    " $xml$lang",
                    " $xml$base",
                    " $term",
                    " $scheme",
                    " $label",
                    "content",
                    " $xml$lang",
                    " $xml$base",
                    " $src",
                    " $type",
                    " $$text",
                    "contributor{}",
                    " $xml$lang",
                    " $xml$base",
                    " name",
                    " uri",
                    " email",
                    "id",
                    "id$xml$lang",
                    "id$xml$base",
                    "link{}",
                    " $xml$lang",
                    " $xml$base",
                    " $href",
                    " $rel",
                    " $type",
                    " $hreflang",
                    " $title",
                    " $length",
                    "published",
                    "published$xml$lang",
                    "published$xml$base",
                    "rights",
                    "rights$type",
                    "rights$xml$lang",
                    "rights$xml$base",
                    "summary",
                    "summary$type",
                    "summary$xml$lang",
                    "summary$xml$base",
                    "title",
                    "title$type",
                    "title$xml$lang",
                    "title$xml$base",
                    "subtitle",
                    "subtitle$type",
                    "subtitle$xml$lang",
                    "subtitle$xml$base",
                    "updated",
                    "updated$xml$lang",
                    "updated$xml$base"
                ];

                var template = ATOM_ENTRY_TEMPLATE;

            	for ( var i = 1; i < templ.length; i++) {
            		if (templ[i].length>0) {
            			template.push(templ[i]);
            		}
            	}

                var result = {
                    'entry' : {}
                };
                var k = 0;
                angular.forEach(template, function(item, index) {
                    var prop = item.replace(FIELD_PATTERN, "$2");
                    var indp = item.replace(FIELD_PATTERN, "$1").length;
        			var p = item.replace(/^\s+|\[\]|{}|!|\s+$/g,'');
                    if ( angular.equals(indp, 0) ) {
                        result['entry'][prop] = t2m2(template, index, p)[prop];
                        result['entry'][prop]['_'] = [];
                        result['entry'][prop]['_'][0] = k++;
                        result['entry'][prop]['_'][1] = p;
                    }
                });
                return result;
            };

            //public methods
            var service = {};
//            service.f2a = function(templ, src) {
            service.f2a = function(src, templ) {
                var i;
                var array = [];
                for (i = 0; i < 16; i++) {
                    array[i] = null;
                }
                var n = t2m(templ.template);
                array[15] = [];
            	var err = [];
                for ( i = 0; i < src.feed.entry.length; i++) {
                    array[15][i] = e2a(n, 'entry', src.feed.entry[i],i,err);
                }

                var result = {};
                //TODO:なおす
            	result.type = src.feed.entry.length==1 ? 'form' : 'table';
            	result.position = err;
            	if (err.length>0) array[0]= result;

            	for ( var i=0;i<err.length;i++) {
            		$log.debug('err='+err[i].rowIndex+' :'+err[i].colName+' :'+err[i].message);
            	}

                return array;
            };

            return service;

        });
}());
