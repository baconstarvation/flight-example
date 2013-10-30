define(function (require) {
	var defineComponent = require('flight/lib/component');
	return defineComponent(addTask);
	
	function addTask () {
		
		this.defaultAttrs({
			submitSelector: '.js-add-task-submit'
			descriptionSelector: '.js-add-task-description'
		});
		
		// declare handleSubmit method
		this.handleSubmit = function(event, data) {
			var $submit = this.select('submitSelector');
			
			$description.attr('disabled', true);
			$submit.attr('disabled', true);
			
			// don't actually submit the form
			event.preventDefault();
			// get the input element
			var $description = this.select('descriptionSelector');
			var description = $description.val();
			
			// trim whitespace
			description = $.trim(description);
			
			this.trigger('uiAddTask', {
				task: {
					description: description
				}
			});
		};
		
		// initialize
		this.after('initialize', function () {
			// listen for submit events
			this.on('submit', this.handleSubmit);
			console.log('Initializing Add Task form');
		});
	};
});