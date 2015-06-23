var person_get = function() { 

	// cookieの取得
	var cookies = ReflexContext.getCookies();

	// HTTPヘッダの取得
	var headers = ReflexContext.getHeaders();

	// querystringを取得してlogに記録(feed.rightsに出力される)
	var querystring = ReflexContext.querystring();
	ReflexContext.log(' querystring='+querystring);

	// pathinfoを取得してlogに記録(feed.rightsに出力される)
	var pathinfo = ReflexContext.pathinfo();
	ReflexContext.log(' pathinfo='+pathinfo);

	// contenttypeを取得してlogに記録(feed.rightsに出力される)
	var contenttype = ReflexContext.contenttype();
	ReflexContext.log(' contenttype='+contenttype);

	// xlsテンプレートの指定があればxls出力
	var parameter = ReflexContext.parameter("_templatexls");
	if (parameter) { 
		ReflexContext.toXls(feed);
	}

	// pdfテンプレートの指定があればpdf出力
	var parameter = ReflexContext.parameter("_templatepdf");
	if (parameter) { 	
		ReflexContext.toPdf(feed);
	}

	// uri+querystringの取得
	var uriquery = ReflexContext.uriquerystring(); 

	// 件数の取得
	var count = ReflexContext.count(uriquery);
	ReflexContext.log('count='+count);

	// entryの取得
	var entry = ReflexContext.getEntry(uriquery); 

	// feedを取得して結果をレスポンスする
	Response = ReflexContext.getFeed(uriquery); 

}

