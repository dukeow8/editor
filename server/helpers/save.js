
module.exports = function() {
	var args = Array.prototype.slice.call(arguments);
	if (!args.every(Number.isFinite)) {
    	throw new TypeError('save() exprects photo or array of photos')
  }
	return args.map(x => x+2);
}