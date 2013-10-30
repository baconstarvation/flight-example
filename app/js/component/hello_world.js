define(function (require) {
	// import dependencies
	var defineComponent = require('flight/lib/component');
	
	// export component constructor
	return defineComponent(taskManager);
	
	// component definition
	function taskManager () {
		// execute some code after initialization
		this.after('initialize', function () {
			console.log('Hello, world!');
		});
	};
});