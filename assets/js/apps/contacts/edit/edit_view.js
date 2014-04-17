ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
    Edit.Contact = Marionette.ItemView.extend({
        template: "#contact-form",
        events: {
            "click button.js-submit" : "submitClicked"
        },
        initialize: function(){
            this.title= "Edit " + this.model.get("firstName");
            this.title += " " + this.model.get("lastName");
        },
        onRender: function(){
            if(this.options.generateTitle){
                var $title= $("<h1>", {text: this.title});
                this.$el.prepend($title);
            }
            this.$('.js-submit').text('edit contact');            
        }

    });
});