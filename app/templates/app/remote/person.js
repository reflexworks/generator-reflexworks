var doGet = function() { 

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

var doPost = function() {

	// /personをキーに採番する
	var no = ReflexContext.allocids("/person", 1);
	if (no==1) {
		ReflexContext.rangeids("/person", "1-99");	// 初回のみ枠を指定する
	}
	// 特定の値にセットする
	// ReflexContext.setids("/person", 1);

	// リクエストデータを取得、titleをlogに記録する(feed.rightsに出力される)
	var request = ReflexContext.getRequest();
	ReflexContext.log('p='+request.feed.entry[0].title);

	// レスポンスステータスをセット
	ReflexContext.setStatus('201');

	// レスポンスヘッダをセット
	ReflexContext.setHeader('header1','value1');

	// uri+querystringの取得
	var uri = ReflexContext.uriquerystring(); 

	// リクエストデータをuriにPOSTし、実行結果を返す
	Response = ReflexContext.post(request,uri); 

	// リダイレクトする場合
//  ReflexContext.sendRedirect('/foo');

	// エラーで返す場合
//  ReflexContext.sendError(400);

}

var doPut = function() {

	// リクエストデータを取得、titleをlogに記録する(feed.rightsに出力される)
	var request = ReflexContext.getRequest();
	ReflexContext.log('p='+request.feed.entry[0].title);

	// レスポンスステータスをセット
	ReflexContext.setStatus('200');

	// レスポンスヘッダをセット
	ReflexContext.setHeader('header1','value1');

	// リクエストデータをPUTし、実行結果を返す
	Response = ReflexContext.put(request); 

}

var doDelete = function() {

	// uri+querystringの取得
	var uri = ReflexContext.uriquerystring(); 

	// uri配下のentryをすべて削除する 
	Response = ReflexContext.deleteForce(uri); 

	// uriのentryをリビジョンを指定して削除する
	Response = ReflexContext.delete(uri,1);

}
