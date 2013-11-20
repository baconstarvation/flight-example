define(function (require) {
	var defineComponent = require('flight/lib/component');
	return defineComponent(taskList);
	function taskList() {
		
		this.defaultAttrs({ 
			taskItemSelector: '.js-task-item',
		});
		
		this.addTask(task) {
			// render task list item
			var $taskItem = this.$taskItemTemplate.clone();
			$taskItem.text(task.description);
			this.$node.append($taskItem);
		};
		
		this.addTask = function(task) {
			// render task list item
			var html = '<li>' + task.description + '</li>';
			
			// append to task item container
			this.$node.append(html);	
		};
		
		this.handleTaskCreated = function(event, data) {
			this.addTask(data.task);
		};
		
		this.handleTasks = function(event, data) {
			data.tasks.forEach(this.addTask, this);
		};
		
		this.handleTaskAdded = function(event, data) {
			// render task list item
			var html = '<li>' + data.task.description + '</li>';
			// append to this.$node. It is assumed this will be a UL
			this.$node.append(html);
		};
		
		this.after('initialize', function() {
			// get template
			this.$taskItemTemplate = this.select('taskItemSelector').clone();
			this.select('taskItemSelector').remove();
			
			// attach event listeners
			this.on(document, 'dataTaskAdded', this.handleTaskAdded);
		});	
	};
	return defineComponent(taskList);
});