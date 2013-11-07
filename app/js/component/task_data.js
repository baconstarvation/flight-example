define(function (require) {
	var defineComponent = require('flight/lib/component');
	
	// return a constructor for this component
	return defineComponent(taskData);
	
	// component definition
	function taskData () {
		// component methods go here
		this.handleAddTask = function(e, data) {
			// generate ID and store on task object
			data.task.id = Date.now();
			// store task
			this.tasks[data.task.id] = data.task;
			
			// trigger event
			this.trigger('dataTaskAdded', {
				task: data.task
			});
		};
		
		this.handleNeedsTask = function(e, data) {
			var task = this.tasks[data.taskId];
			if (task) {
				this.trigger('dataTask', {
					task: task
				});
			}
		};
		
		this.handleNeedsTasks = function() {
			// convert this.tasks to an array to allow easy iteration in UI // components
			var tasks = Object.keys(this.tasks).map(function(key) {
				return this.tasks[key];
			}, this);
			
			// trigger data event
			this.trigger('dataTasks', {
				tasks: tasks
			});
		};
		
		this.handleTaskCompleted = function(event, data) {
			var task = this.tasks[data.taskId];
			if (task) {
				task.completed = true;
				this.trigger('dataTaskCompleted', {
					task: task
				});
			}
		};
		
		this.after('initialize', function() {
			this.tasks = {};
			this.on('uiAddTask', this.handleAddTask);
			this.on('uiNeedsTask', this.handleNeedsTask);
			this.on('uiNeedsTasks', this.handleNeedsTasks);
			this.on('uiTaskCompleted', this.handleTaskCompleted);
		});
	}
});


