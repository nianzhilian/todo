define(function (require, exports, module) {

    var marionette = require('marionette');

    var templateTodoItem = require('hbs!app/todo/templates/todoItem');

    var TodoItemView = marionette.ItemView.extend({
        template: templateTodoItem,

        tagName: 'li',

        ui: {
            edit: '.edit'
        },

        events: {
            'click .destroy': 'onDestroy',
            'dblclick label': 'onEditClick',
            'keypress .edit': 'onEditKeypress',
            'blur .edit': 'onEditBlur',
            'click .toggle': 'toggle'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        onRender: function () {
            this.$el.removeClass('active completed');

            if (this.model.get('completed')) {
                this.$el.addClass('completed');
            } else {
                this.$el.addClass('active');
            }
        },

        onDestroy: function () {
            this.model.destroy();
        },

        toggle: function () {
            this.model.toggle().save();
        },

        onEditClick: function () {
            this.$el.addClass('editing');
            this.ui.edit.focus();
        },

        updateTodo: function () {
            var todoText = this.ui.edit.val();
            if (todoText === '') {
                return this.destroy();
            }
            this.setTodoText(todoText);
            this.completeEdit();
        },

        onEditBlur: function (e) {
            this.updateTodo();
        },

        onEditKeypress: function (e) {
            var ENTER_KEY = 13;
            if (e.which === ENTER_KEY) {
                this.updateTodo();
            }
        },

        setTodoText: function (todoText) {
            if (todoText.trim() === "") { return; }
            this.model.set('title', todoText).save();
        },

        completeEdit: function () {
            this.$el.removeClass('editing');
        }
    });
    
    exports.TodoItemView = TodoItemView;

});