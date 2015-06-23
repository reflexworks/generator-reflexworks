var person_post = function() {

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
