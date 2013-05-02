JpSub
=====

A really simple Javascript pub sub library. 

Created with the intention to support simple publish subscribe across multiple frames. 

So we can do this in one frame: 

	var events = new jpsub.events(new jpsub.eventStore(window.top));
	events.publish('SomeEvent', { data: 'Testing' });

and this in another:

	var events = new jpsub.events(new jpsub.eventStore(window.top));
	events.subscribe('SomeEvent', function(data) {
		// Do something	
	});

window.top is passed as the container in which to create a common event store

There is no support from cross domain frames
