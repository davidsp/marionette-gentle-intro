ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){

    Entities.Contact = Backbone.Model.extend({
        defaults: {
            firstName: "",
            lastName: "",
            phoneNumber: ""
        },
        urlRoot: "contacts",
        validate: function(attrs, options){
            var errors = {}
            if(!attrs.firstName) {
                errors.firstName = "can't be blank";
            }
            if(!attrs.lastName) {
                errors.lastName = "can't be blank";
            }
            else {
                if(attrs.lastName.length < 2){
                    errors.lastName = "too short";
                }
            }
            if (! _.isEmpty(errors)) {
                return errors;
            }
        }
    });
    Entities.ContactCollection = Backbone.Collection.extend({
        url: "contacts",
        model: Entities.Contact,
        comparator: "firstName"
    });

    var initializeContacts = function(){
        var contacts = new Entities.ContactCollection([
            { id: 1, firstName: "Alicae", lastName: "Arten", phoneNumber: "555-0184" },
            { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163" },
            { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129" }
        ]);
        contacts.forEach(function(contact){
            contact.save();
        })
        return contacts.models;
    };
    var API = {
        getContactEntities: function(){
            var contacts = new Entities.ContactCollection();
            var defer = $.Deferred();
            contacts.fetch({
                success: function(data){
                    defer.resolve(data);
                }
            });
            var promise = defer.promise();

            $.when(promise).done(function(contacts){
                if(contacts.length === 0){
                    var models =  initializeContacts();
                    contacts.reset(models);
                } 
            });
            return promise;
        },
        getContactEntity: function(contactId) {
            var contact = new Entities.Contact({id: contactId});
            var defer = $.Deferred();
            setTimeout(function(){
                contact.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data) {
                        defer.resolve(undefined);
                    }
                });
            },2000);
            return defer.promise();
        }
    }

    Entities.configureStorage(Entities.Contact);


    Entities.configureStorage(Entities.ContactCollection);

    ContactManager.reqres.setHandler("contact:entities", function(){
        return API.getContactEntities();
    })
    ContactManager.reqres.setHandler("contact:entity", function(id){
        return API.getContactEntity(id);
    })
});