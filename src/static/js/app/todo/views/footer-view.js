define(function (require, exports, module) {

    var marionette = require('marionette');

    var templateFooter = require('hbs!app/todo/templates/footer');

    var FooterView = marionette.ItemView.extend({
        template: templateFooter,

        ui: {
            todoCount: '#todo-count .count',
            todoCountLabel: '#todo-count .label',
            clearCountButton: '#clear-completed',
            clearCount: '#clear-completed .count',
            filters: '#filters a'
        },

        events: {
            'click #clear-completed': 'onClearClick'
        },

        initialize: function () {
            this.listenTo(this.collection, 'all', this.updateCount);
        },

        onRender: function () {
            this.updateCount();
        },

        updateCount: function () {
            var activeCount = this.collection.getActive().length,
            completedCount = this.collection.getCompleted().length;
            this.ui.todoCount.html(activeCount);
            this.ui.todoCountLabel.html(activeCount === 1 ? 'item' : 'items');
            this.ui.clearCount.html(completedCount === 0 ? '' : '(' + completedCount + ')');
            this.ui.clearCountButton.toggle(!!completedCount);
        },

        onClearClick: function () {
            var completed = this.collection.getCompleted();
            completed.forEach(function destroy(todo) {
                todo.destroy();
            });
        }
    });

    exports.FooterView = FooterView;

});