function Base() {
	this.events = {}
}
Base.extend = function () {
	var That = this
	function Sub() {
		That.call(this)
	}
	Sub.prototype = new That()
	for (let i in arguments) {
		for (let key in arguments[i]) {
			if (i == 1) {
				Sub[key] = arguments[i][key]	
			} else {
				Sub.prototype[key] = arguments[i][key]
			}
		}
	}
	Sub.extend = That.extend
	return Sub
}

Base.prototype.on = function (event, callback) {
	if (!Array.isArray(this.events[event])) {
		this.events[event] = []
	}
	this.events[event].push(callback.bind(this))
}
Base.prototype.trigger = function (event) {
	var args = [].slice.call(arguments, 1)
	if (Array.isArray(this.events[event])) {
		this.events[event].forEach(item => {
			item(args)
		})
	}
} 

module.exports = Base