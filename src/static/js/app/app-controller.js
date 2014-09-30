define(function(require, exports, module) {

var $ = require('jquery');
var backbone = require('backbone');
var marionette = require('marionette');
var activity = require('built/app/activity');
var keys = require('built/app/keys');
var app = require('app/app');

// Views
var HeaderView = require('app/todo/views/headerView').HeaderView;
var FooterView = require('app/todo/views/footerView').FooterView;
var TodoItemView = require('app/todo/views/todoItemView').TodoItemView;
var TodoListView = require('app/todo/views/todoListView').TodoListView;

// Models
var TodoItem = require('app/todo/models/todoItemModel').TodoItem;
var TodoList = require('app/todo/models/todoListModel').TodoList;

var AppController = marionette.Controller.extend({

    initialize: function(options){
        // This call is required to initialize the
        // BUILT App foundation. See below for what's done.
        // You can customize that as necessary.
        //this.BUILT();
        this.app = app;
        this.app.todoList = new TodoList();

        this.showHeader(this.app.todoList);
        this.showFooter(this.app.todoList);
        this.showTodoList(this.app.todoList);

        //app.listenTo(this.app.todoList, 'reset add remove', this.toggleFooter, this);
        this.app.todoList.fetch();
    },

    index: function(){
        /* Ready. Set. Go! */
        // Your Application's Regions are set in the app/app.js
        // everything else starts here. (or in another route :)
    },

    showHeader: function (todoList) {
        var header = new HeaderView({
            collection: todoList
        });
        app.header.show(header);
    },

    showFooter: function (todoList) {
        var footer = new FooterView({
            collection: todoList
        });
        app.footer.show(footer);
    },

    showTodoList: function (todoList) {
        var main = new TodoListView({
            collection: todoList
        });
        app.main.show(main);
    },

    toggleFooter: function() {
        app.footer.$el.toggle(this.todoList.length);
    },

    // Set the filter to show complete or all items
    filterItems: function (filter) {
        var newFilter = filter && filter.trim() || 'all';
        app.main.$el.attr('class', filter);
        app.footer.currentView.ui.filters
				.removeClass('selected')
				.filter('[href="#' + filter + '"]')
				.addClass('selected');
    }
});

exports.AppController = AppController;
});