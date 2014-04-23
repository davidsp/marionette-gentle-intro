var ContactManager = new Marionette.Application();

ContactManager.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({
        el: "#dialog-region"
    })
});

ContactManager.navigate = function(route, options) {
    options || (options = {});
    Backbone.history.navigate(route,options);
}

ContactManager.getCurrentRouter = function () {
    return Backbone.history.fragment
}


ContactManager.on("initialize:after", function(){
    if(Backbone.history) {
        Backbone.history.start();
        if(this.getCurrentRouter() === "") {
            ContactManager.trigger("contacts:list");
        }
    }
});
