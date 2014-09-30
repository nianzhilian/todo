define(function (require, exports, module) {

    var marionette = require('marionette');
    var templateTodoList = require('hbs!app/todo/templates/todoList');
    var TodoItemView = require('app/todo/views/todoItemView').TodoItemView;

    var TodoListView = marionette.CompositeView.extend({
        template: templateTodoList,

        childView: TodoItemView,
        childViewContainer: '#todo-list',

        ui: {
            toggle: '#toggle-all'
        },

        events: {
            'click #toggle-all': 'onToggleAllClick'
        },

        initialize: function () {
            this.listenTo(this.collection, 'all', this.update);
        },

        onRender: function () {
            this.update();
        },

        update: function () {
            function reduceCompleted(left, right) {
                return left && right.get('completed');
            }

            var allCompleted = this.collection.reduce(reduceCompleted, true);

            this.ui.toggle.attr('checked', allCompleted);
            this.$el.parent().toggle(!!this.collection.length);
        },

        removeItem: function () {
            this.collection.render();
        },

        onToggleAllClick: function (e) {
            var isChecked = e.currentTarget.checked;

            this.collection.each(function (todo) {
                todo.save({ 'completed': isChecked });
            });
        }
    });

    exports.TodoListView = TodoListView;

});