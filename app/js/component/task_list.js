define(function (require) {
	var defineComponent = require('flight/lib/component');
	return defineComponent(taskList);
	function taskList() {
		
		this.handleTaskAdded = function(event, data) {
			// render task list item
			var html = '<li>' + data.task.description + '</li>';
			// append to this.$node. It is assumed this will be a UL
			this.$node.append(html);
		};
		
		this.after('initialize', function() {
			// attach event listeners
			this.on(document, 'dataTaskAdded', this.handleTaskAdded);
		});	
	};
	return defineComponent(taskList);
});