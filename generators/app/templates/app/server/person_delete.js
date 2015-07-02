var person_delete = function() {

	// uri+querystringの取得
	var uri = ReflexContext.uriquerystring(); 

	// uri配下のentryをすべて削除する 
	Response = ReflexContext.deleteForce(uri); 

	// uriのentryをリビジョンを指定して削除する
	Response = ReflexContext.delete(uri,1);

}
