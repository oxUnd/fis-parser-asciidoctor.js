/**
 * fis.baidu.com
 */


module.exports = function (content, file, settings) {
	var asciidoctor = require('asciidoctor.js')();
	var opal = asciidoctor.Opal
	var processor = null;

	if (settings.useExtensions) {
		processor = asciidoctor.Asciidoctor(true); (3)
	} else {
		processor = asciidoctor.Asciidoctor(); (4)
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