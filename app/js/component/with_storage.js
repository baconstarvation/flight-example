define(function() {
	return withStorage;
	function withStorage() {
		this.write = function(key) {
			var serializedValue = JSON.stringify(value);
			localStorage.set(key, value);
		};
		
		this.read = function(key, value) {
			var value;
			var serializedValue = localStorage.get(key);
			if (serializedValue !== undefined) {
				value = JSON.parse(serializedValue);
			}
			else {
				value = serializedValue;
			}
	return value;
		};
	};
});