ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
    
    Entities.FilteredCollection = function(options){
        var original = options.collection;
        var filtered = new original.constructor();
        filtered.add(original.models);
        filtered.filterFunction = options.filterFunction;

        var applyFilter = function(filterCriterion, filterStrategy) {
            var collection = original;
            var criterion;
            if(filterStrategy === "filter"){
                criterion = filterCriterion.trim();
            } else {
                criterion = filterCriterion;
            }
        }

        return filtered;
    }

});