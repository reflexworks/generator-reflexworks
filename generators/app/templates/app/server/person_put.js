var person_put = function() {

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
