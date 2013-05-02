
var jpsub = jpsub || {} ;

jpsub.events = function(eventStore) {

    var self = this; 

    var _private = {
        publish: function(event, data){
            var events = _private.store.query(event);
            var length = events.length;
            for(var i = 0; i < length; i++){
                events[i].callback(data);
            }
        },
        subscribe: function(event, callback){
            _private.store.add({eventName: event, callback: callback});
        }
    }

    var _public = {
        publish: function(event, data) {
            _private.publish(event, data);
        },
        subscribe: function(event, callback) {
            _private.subscribe(event, callback);
        }
    }

    _private.store = eventStore; 

    return _public;
}

jpsub.eventStore = function(container) {

    var _private = {
        store: undefined, 
        init: function() {
            container.jpsub = container.jpsub || {};
            container.jpsub.events = container.jpsub.events || {};
            container.jpsub.events.store = container.jpsub.events.store || [];
            _private.store = container.jpsub.events.store;
        },
        add: function(event){
            _private.store.push(event);
        },
        query: function(eventName){
            var items = [];
            var length = _private.store.length;
            for(var i = 0; i < length; i++){
                var item = _private.store[i];
                if(item.eventName === eventName)
                    items.push(item);
            }
            return items;
        }
    }

    var _public = {
        add: function(event) { _private.add(event); },
        query: function(eventName) { return _private.query(eventName); }
    }

    _private.init();

    return _public;
}