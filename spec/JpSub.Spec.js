/// <reference path="../src/jpsub.js" />

describe("jpsub Events", function () {
    var events;

    beforeEach(function () {
        events = new jpsub.events(new jpsub.eventStore({}));
    });

    it("should have a publish method", function () {
        expect(events.publish).not.toBeUndefined();
    });

    it("should have a subscribe method", function() {
        expect(events.subscribe).not.toBeUndefined();
    })

    it("should be possible to publish and subscribe to an event", function() {

        var published = false; 

        events.subscribe('Saved', function(data) { 
            published = true;
        })

        events.publish('Saved', { data: "some data"});

        expect(published).toBe(true);

    })

    it("should be possible to publish an event to multiple subscribers", function() {

        var publishedCount = 0; 

        events.subscribe('Saved', function(data) { 
            publishedCount = publishedCount + 1;
        })

        events.subscribe('Saved', function(data) {
            publishedCount = publishedCount + 1;
        })

        events.publish('Saved', { data: "some data"});

        expect(publishedCount).toBe(2);

    })
});

