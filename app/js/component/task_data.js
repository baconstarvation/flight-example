define(function (require) {
	var defineComponent = require('flight/lib/component');
	var withStorage = require('component/with_storage');
	
	// return a constructor for this component
	return defineComponent(taskData, withStorage);
	
	// component definition
	function taskData () {
		// component methods go here
		
		this.defaultAttrs({
			taskStorageKey: 'tasks'
		});
		
		this.handleAddTask = function(e, data) {
			// generate ID and store on task object
			data.task.id = _.uniqueId('task');
			
			// store task
			this.tasks[data.task.id] = data.task;
			
			this.write(this.attr.taskStorageKey, this.tasks);
			
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
			
			this.tasks = this.read(this.attr.taskStorageKey);
			
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
			this.tasks = this.read(this.attr.taskStorageKey) || {};
			this.on('uiAddTask', this.handleAddTask);
			this.on('uiNeedsTask', this.handleNeedsTask);
			this.on('uiNeedsTasks', this.handleNeedsTasks);
			this.on('uiTaskCompleted', this.handleTaskCompleted);
		});
	}
});


