/**
 * fis.baidu.com
 */


function removeFromRequireCache(reg) {
	for (var path in require.cache) {
		if (reg.test(path)) {
			delete(require.cache[path]);
		}
	}
}


module.exports = function (content, file, settings) {
	

	removeFromRequireCache(/asciidoctor\.js/); //not do cache, fix a bug of asciidoctor.js

	var asciidoctor = require('asciidoctor.js')();

	var opal = asciidoctor.Opal
	var processor = null;

	if (settings.useExtensions) {
		processor = asciidoctor.Asciidoctor(true); 
	} else {
		processor = asciidoctor.Asciidoctor();
	}

	var options = opal.hash2(
	    settings.mod,
	    settings.opt);

	var html = processor.$convert(content, options);
	return html;

};

module.exports.defaultOptions = {
	mod: ['doctype', 'attributes'],
	opt: {doctype: 'default', attributes: ['showtitle']},
	useExtensions: true
};