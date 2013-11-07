define(function (require) {
	var defineComponent = require('flight/lib/component');
	return defineComponent(addTask);
	
	function addTask () {
		
		this.defaultAttrs({
			submitSelector: '.js-add-task-submit',
			descriptionSelector: '.js-add-task-description'
		});
		
		// declare handleTaskAdded method
		this.handleTaskAdded = function(event, data) {
			this.select('submitSelector').attr('disabled', false);
			this.select('descriptionSelector').attr('disabled', false);
		};
		
		// declare handleSubmit method
		this.handleSubmit = function(event, data) {
			var $submit = this.select('submitSelector');
			
			// don't actually submit the form
			event.preventDefault();
			
			// get the input element
			var $description = this.select('descriptionSelector');
			var description = $description.val();
			
			// trim whitespace
			description = $.trim(description);
			console.log(description);
			
			this.trigger('uiAddTask', {
				task: {
					description: description
				}
			});
			
			$description.attr('disabled', true);
			$submit.attr('disabled', true);
		};
		
		// initialize
		this.after('initialize', function () {
			// listen for submit events
			this.on('submit', this.handleSubmit);
			this.on('dataTaskAdded', this.handleTaskAdded);
			console.log('Initializing Add Task form');
		});
	};
});