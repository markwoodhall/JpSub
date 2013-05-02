
var jpsub = jpsub || {} ;

jpsub.events = function(eventStore) {

    var self = this; 

    var _private = {
        publish: function(event, data){
            var events = _private.store.query(event);
            for(var i = 0; i < events.length; i++){
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
            for(var i = 0; i < _private.store.length; i++){
                if(_private.store[i].eventName === eventName)
                    items.push(_private.store[i]);
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