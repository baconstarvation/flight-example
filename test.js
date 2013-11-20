// * One way (inefficient) of doing it --
// Constructing templates in components
<script src="bower_components/hogan/lib/template.js">
</script>
<script src="bower_components/hogan/lib/compiler.js">
</script>

this.addTask = function(task) {
	// render task list item
	var html = this.taskItemTemplate.render(task);
	// append to task item container
	this.select('taskContainerSelector').append(html);
};

this.after('initialize', function() {
	// compile template
	this.taskItemTemplate = Hogan.compile('<li>{{description}}</li>');
})








//* Creating a templating mixin, then seeing the first part of server-side compilation by adding templates as a dependency in with_template

//Creating a templating mixin
define(function() {
	return function withTemplate() {
		this.before('initialize', function() {
			this.taskItemTemplate = Hogan.compile('<li>{{description}}</li>');
		});
	};
});

//Creating a templating mixin - part 2
define(function() {
	return withTemplate;
	
	function withTemplate() {
		this.defaultAttrs({taskItemTemplate: '<li>{{description}}</li>'});
		this.render = function(templateName, renderOptions) {
			if(this.templates[templateName]) {
				return this.templates{templateName}.render(renderOptions);
			}
		};
	
		this.before('initialize', function() {
			this.templates = {};
			this.templates.taskItem = Hogan.compile(this.attr.taskItemTemplate);
		});
	};
});

//Then, in the component:
var html = this.render('taskItem', task);

// ** Server-Side Compilation
// Adding templates as a dependency in ui/with_template:
define (function() {
	var templates = require('templates'); // path to templates.js\
	return withTemplate;
	
	function withTemplate () {
		this.render = function(templateName, renderOptions) {
			// check template exists
			if(templates[templateName]) {
				// return rendered template
				return templates[templateName].render(renderOptions);
			}
		};
	};
});




// Working with dynamic HTML - event delegation
// handleItemClick

// handleItemClick would only be called if the user clicks on an element with class .js-item
defaultAttrs({
	itemSelector: '.js-item'
});

this.after('initialize', function() {
	this.on('click', {
		itemSelector: this.handleItemClick
	});
});

// This allows multiple delegated event listeners to be attached in a single statement:

this.on('click', {
	taskItemSelector: this.handleTaskItemClick,
	taskCompleteSelector: this.handleTaskCompleteClick
});

// Listen for clicks on the parent then determine the action based on the attributes of the target element -- achievable by adding a data-action attribute in the element:

<li class="js-task-item" data-id="1234">
	<input type="checkbox" data-action="complete" />
		Make tea
</li>

	// When the event handler is called, it can interrogate the event target to determine the required action or task ID:

this.handleClick = function(event) {
	var action = $(event.target).closest('[data-action]').data('action');
	var id = $(event.target).closest('.js-task-item').data('id');
	switch(action) {
		case 'complete':
			// do something
	}
}

this.after('initialize', function() {
	this.on('click', this.handleClick);
});
















