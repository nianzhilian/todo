define(function (require, exports, module) {

    var backbone = require('backbone');
    var localStorage = require('backbone-localStorage');

    var TodoItem = backbone.Model.extend({
        localStorage: new localStorage('todos-backbone'),
        defaults: {
            title: '',
            completed: false,
            created: 0
        },
        initialize: function () {
            if (this.isNew()) this.set('created', Date.now());
        },
        toggle: function () {
            return this.set('completed', !this.get('completed'));
        },

        isCompleted: function () {
            return this.get('completed');
        }
    });

    exports.TodoItem = TodoItem;
});