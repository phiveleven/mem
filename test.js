console.clear();


/**/DEV(function(){/**/

	chrome.bookmarks.getTree(function(results){
		var bookmarks = results[0].children.reduce(index, {});

		console.info(bookmarks);
	});
	
/**/})();/**/

/* index */
function index(Bookmarks, bookmark){
	if (bookmark.url) {
		var url = document.createElement('a');
		url.href = bookmark.url;
		'protocol host port pathname search hash'
			.split(/\W/)
			.forEach(function(key){ 
				bookmark[key] = url[key];
			});
	}

	for (var key in bookmark){ 
		var value = bookmark[key];

		if (value instanceof Array)
			// flatten
			Bookmarks = value.reduce(index, Bookmarks);
		else {
			Bookmarks[key] = Bookmarks[key] || {};
			Bookmarks[key][value] = value in Bookmarks[key] ?
				[bookmark].concat(Bookmarks[key][value])
				: bookmark;
		}
	}
	return Bookmarks;
}


/** @param f {Function} wrap into a timer/logging function  */
function DEV(f){
	return function(){
		var start = new Date,
			ret = f(),
			end = new Date;
		console.debug(new Date - start + 'ms');
	};
}/**/