console.clear();

var Bookmarks = { by:{}, values:{} };


/** /DEV(function(){/**/

	chrome.bookmarks.getTree(function(results){
		var bookmarks = results[0].children;
		console.assert(bookmarks.length, 'No bookmarks?');

		bookmarks.forEach(function(set){
			set.children.forEach(index);
		});

		console.warn(Bookmarks.by);
	});
	
/** /})();/**/


function index(bookmark){
	//console.group(bookmark.title);
	if (bookmark.children)
		bookmark.children.forEach(index);
	else {
		// get more data about the url
		var url = document.createElement('a');
		url.href = bookmark.url;
		'protocol host port pathname search hash'.split(/\W/)
			.forEach(function(key){ 
				bookmark[key] = url[key];
			});

		// 
		for (var key in bookmark){
			var value = bookmark[key];
			//console.debug(key, value);

			Bookmarks.by[key] = Bookmarks.by[key] || {};
			if (value in Bookmarks.by[key])
				// duplicate?
				Bookmarks.by[key][value] = [].concat(Bookmarks.by[key][value], bookmark);
			else Bookmarks.by[key][value] = bookmark;
		}
	}
	//console.groupEnd();
}


/** @param f {Function} wrap function into a timer/logging function  * /
function DEV(f){
	var fname = f.toString(),
		context = this;
	return function(){
		var start = new Date,
			ret = f.apply(context, arguments),
			end = new Date,
			fname = f.toString();
		console.debug(new Date - start + 'ms');
	};
}/**/