// Adding delegated events to task_list

// index.html
<li class="js-task-list-item" data-id="{{id}}">
<input type="checkbox" data-action="complete" />
{{description}}
</li>

// Adding a named selector to defaultAttrs, an onclick listener in after:initialize and an event handler method:
this.defaultAttrs({
	itemSelector: '.js-task-list-item'
});

this.handleItemClick = function(event) {
	// get target item from event
	var $item = $(event.target).closest(this.attr.itemSelector);
	var id = $item.data('id');
	// get action from target element
	var action = $(event.target).closest([data-action]).data('action');
	if (action === 'complete') {
		this.trigger('uiTaskCompleted', {
			taskId: id,
			completed: false
		});
	}
};

this.after('initialize', function() {
	this.on('click', {
		item.Selector: this.handleItemClick
	});
});




