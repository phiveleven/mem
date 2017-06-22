console.clear();


document.addEventListener('DOMContentLoaded', function(){

	chrome.bookmarks.getTree(function(tree){
		var bookmarks = 
			tree
			.reduce(flatten, [])
			// most recent
			//.sort((a, b) => b.dateAdded - a.dateAdded)
			// expand url and date
			.map(expand)
			// group
			.reduce(group('host'), {})
			// dedup
			//.sort((a,b) => a.url - b.url)
			//.map(b => b.url)
			//.reduce(similar, []);

		// truncate for debugging
		//bookmarks.length = 100;
		console.log(bookmarks);
		// Catalog browser bookmarks
		// console.info(Catalog(tree[0].children));
	});

});

function group(by){
	return function(grouped, bookmark){
		var key = bookmark[by];
		grouped[key] = grouped[key] || [];
		grouped[key].push(bookmark);
		return grouped;
	}
}
/*function similar(bookmark){
	// identical

	// url == url
	// similar
	// host pathname search hash
	return bookmark;
}*/
function expand(bookmark){
	// url
	var url = document.createElement`a`;
	url.href = bookmark.url;
	'protocol host pathname search hash'
		.split(' ')
		.forEach(property => bookmark[property] = url[property]);
	// date
	bookmark.added = new Date(bookmark.dateAdded);
	return bookmark;
}
function flatten(bookmarks, node){
	//developer.chrome.com/extensions/bookmarks#type-BookmarkTreeNode
	if (node.children)
		bookmarks.concat(node.children.reduce(flatten, bookmarks));
	else
		bookmarks.push(node);
	return bookmarks;
}




/*
┌─┐┌─┐┌┬┐┌─┐┬  ┌─┐┌─┐
│  ├─┤ │ ├─┤│  │ ││ ┬
└─┘┴ ┴ ┴ ┴ ┴┴─┘└─┘└─┘ w17*/
function Catalog(...items){
    return items.reduce((catalog), {});

    function catalog(dict, item){
        for (let [key, value] of Object.entries(item)){
            let initial = key in dict? dict[key]: {};
            switch (value.constructor.name){
                case 'Array':
                    dict[key] = value.reduce(catalog, initial);
                    break;
                case 'Object':
                    dict[key] = [value].reduce(catalog, initial);
                    break;
                default:
                    dict[key] = archive(initial, value, item);
                    break;
            }
        }
        return dict;

        function archive(context, key, item){
            context[key] = key in context ?
                context[key].concat(item)
                : [item];
            return context;
        }
    }
}