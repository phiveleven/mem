console.clear();


document.addEventListener('DOMContentLoaded', function(){

	chrome.bookmarks.getTree(function(results){
		// 1. index browser bookmarks
		var bookmarks = results[0].children.reduce(index, {});
		console.info(bookmarks);
	});

});

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
		bookmark.domain = 
			(bookmark.host.match(/[^\.]+\.\w+$/) || [''])[0];
	}

	for (var key in bookmark){ 
		var value = bookmark[key];

		if (value instanceof Array)
			// flatten
			Bookmarks = value.reduce(index, Bookmarks);
		else
			Bookmarks[key] = archive(Bookmarks[key], value, bookmark);
	}

	return Bookmarks;
}

/* archive */
function archive(context, value, item){
	context = context || {};
	context[value] = value in context ?
		[item].concat(context[value])
		: item;
	return context;
}

