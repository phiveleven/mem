console.log('hi')

Bookmarks = {};


DEV(function(){

	chrome.bookmarks.getTree(function(results){
		var bookmarks = results[0].children;
		console.assert(bookmarks.length, 'No bookmarks?');

		bookmarks.forEach(function(set){
			set.children.forEach(index);
		});

		console.warn(Bookmarks);
	});
})();


function index(bookmark){
	for (var key in bookmark){
		Bookmarks[key] = Bookmarks[key] || {};
		var value = bookmark[key];
		//console.debug(key, value);
		Bookmarks[key][value] = Bookmarks[key][value] || [];
		Bookmarks[key][value].push(bookmark);
	}
}


/** @param f {Function} wrap function into a timer/logging function  */
function DEV(f){
	var fname = f.toString(),
		context = this;
	return function(){
		var start = new Date,
			ret = f.apply(context, arguments),
			end = new Date,
			fname = f.toString();
		console.group();
		console.debug(ret);
		console.debug(new Date - start + 'ms');
		console.groupEnd();
	};
}