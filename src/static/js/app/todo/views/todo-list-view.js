define(function (require, exports, module) {

    var marionette = require('marionette');
    var templateTodoList = require('hbs!app/todo/templates/todoList');
    var TodoItemView = require('app/todo/views/todo-item-view').TodoItemView;

    var TodoListView = marionette.CompositeView.extend({
        template: templateTodoList,

        childView: TodoItemView,
        childViewContainer: '#todo-list',

        ui: {
            toggleAll: '#toggle-all'
        },

        events: {
            'click #toggle-all': 'onToggleAllClick'
        },

        initialize: function () {
            this.listenTo(this.collection, 'all', this.handleToggleAllState);
        },

        onRender: function () {
            this.handleToggleAllState();
        },

        handleToggleAllState: function () {
            if (this.collection.length <= 0) {
                this.ui.toggleAll.hide();
            } else {
                this.ui.toggleAll
                  .prop('checked', this.allTodosCompleted())
                  .show();
            }
        },

        onToggleAllClick: function () {
            var checkAll = this.ui.toggleAll.is(':checked');
            this.collection.invoke('set', { 'completed': checkAll });
        },

        allTodosCompleted: function () {
            var allCompleted = this.collection.reduce(function (allCompleted, todo) {
                return todo.get('completed') === true;
            }, false);

            return allCompleted;
        }
    });

    exports.TodoListView = TodoListView;

});