define(function (require, exports, module) {

    var backbone = require('backbone');
    var localStorage = require('backbone-localStorage');
    var TodoItem = require('app/todo/models/todoItemModel').TodoItem;

    var TodoList = backbone.Collection.extend({
        model: TodoItem,
        localStorage: new localStorage('todos-backbone'),

        getCompleted: function () {
            return this.filter(this._isCompleted);
        },

        getActive: function () {
            return this.reject(this._isCompleted);
        },

        comparator: function (todo) {
            return todo.get('created');
        },

        _isCompleted: function (todo) {
            return todo.isCompleted();
        }
    });

    exports.TodoList = TodoList;

});