console.clear();


document.addEventListener('DOMContentLoaded', function(){

	chrome.bookmarks.getTree(function(results){
		// 1. index browser bookmarks
		console.info(Catalog(results[0].children));
	});

});







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