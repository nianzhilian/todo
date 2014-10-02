define(function(require, exports, module) {

var $ = require('jquery');
var backbone = require('backbone');
var marionette = require('marionette');
var activity = require('built/app/activity');
var keys = require('built/app/keys');
var app = require('app/app');

// Views
var HeaderView = require('app/todo/views/header-view').HeaderView;
var FooterView = require('app/todo/views/footer-view').FooterView;
var TodoItemView = require('app/todo/views/todo-item-view').TodoItemView;
var TodoListView = require('app/todo/views/todo-list-view').TodoListView;

// Models
var TodoItem = require('app/todo/models/todo-item-model').TodoItem;
var TodoList = require('app/todo/models/todo-list').TodoList;

var AppController = marionette.Controller.extend({

    initialize: function(options){
        // This call is required to initialize the
        // BUILT App foundation. See below for what's done.
        // You can customize that as necessary.
        //this.BUILT();
        this.app = app;
        this.app.todoList = new TodoList();

        this.showHeader(this.app.todoList);
        this.showMain(this.app.todoList);
        this.showFooter(this.app.todoList);

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

    showMain: function (todoList) {
        var main = new TodoListView({
            collection: todoList
        });
        app.main.show(main);
    },

    showFooter: function (todoList) {
        var footer = new FooterView({
            collection: todoList
        });
        app.footer.show(footer);
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