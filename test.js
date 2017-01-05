console.clear();


document.addEventListener('DOMContentLoaded', function(){

	chrome.bookmarks.getTree(function(results){
		// 1. index browser bookmarks
		var bookmarks = results[0].children.reduce(index, {});
		console.info(bookmarks);
		// 2. interpolate data into html
		document.body.appendChild(interpolate(bookmarks));
		throw 'TODO: append table with data'
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
	}

	if (bookmark.host){
		bookmark.domain = (bookmark.host.match(/[^\.]+\.\w+$/) || [''])[0];
	}

	for (var key in bookmark){ 
		var value = bookmark[key];

		if (value instanceof Array)
			// flatten
			Bookmarks = value.reduce(index, Bookmarks);
		else {
			Bookmarks[key] = archive(Bookmarks[key], value, bookmark);
		}
	}
	return Bookmarks;
}

/* function archive */
function archive(context, value, item){
	context = context || {};
	context[value] = value in context ?
		[item].concat(context[value])
		: item;
	return context;
}

/* interpolate */
function interpolate(data){
	var thead = document.createElement('thead'),
		tbody = document.createElement('tbody')
	for (var column in data){
		var th = document.createElement('th'),
			td = document.createElement('td');
		th.innerText = column;
		td.innerText = data[column];
		thead.appendChild(th);
	}
	return document.createElement('table');
}

