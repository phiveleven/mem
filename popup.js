// constants
var query = 'oracle.com';

if ('test')
	console.debug(+new Date, 'OK');

// document ready
document.addEventListener('DOMContentLoaded',function(){

			//document.querySelector('button#index').addEventListener('click', function() {
				//chrome.bookmarks.search(query, DEV(Index));
			//});

});

/*
 * This pattern comes up often as a setter:
 * assuming
 * 	object[key] = {}
 * then 
 * 	object[key] = value
 * unless
 *  object[key] = [value].concat(object[key])
 */



// hoistland ===============

/** @constructor new Index ([collection]) */
function Index(collection){
	return Array
		// ES6 Array.from(collection)
		.from(collection)
		// main indexer
		.reduce(function(index, item){
			index.length++;
			for (var key in item){
				var value = item[key];
				
				// init keys branch
				if (!index.cols[key]) 
					index.cols[key] = {};
				
				if (!index.cols[key][value]){
					index.cols[key][value] = item;
					(function(){
						// seen this
						index.counts[key] = 1 + (index.counts[key]|0);
						if (collection.length == index.counts[key])
							// unique key across collection
							index.uniq[key] = index.cols[key];
					})();
				} else index.cols[key][value] = 
					// merge
					[item].concat(index.cols[key][value]);

				// init values branch
				if (!index.values[value]) 
					index.values[value] = {};
				
				if (!index.values[value][key]) {
					index.values[value][key] = item;
					(function(){
						// card counting, async all the analytics here
						index.counts[value] = 1 + (index.counts[value]|0);
					})();
				} else index.values[value][key] =
					// merge
					[item].concat(index.values[value][key]);
				
				// maybe some content analysis too
				// http://openup.tso.co.uk/des (CORS)
				// http://viewer.opencalais.com/
			}
			return index;
		}, { cols:{}, values:{}, length:0, uniq:{}, counts:{} });
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
		console.group(fname);
		console.debug(ret);
		console.debug(new Date - start + 'ms');
		console.groupEnd();
	};
}
