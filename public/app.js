$(document).ready(function () {
    $.getJSON('/api/todos')
        .then(function (data) {
            addTodos(data);
        })
    $("#todoInput").keypress(function (event) {
        if (event.which == 13) {
            createTodo();
            $(this).val("");
        }
    })
    $('.list').on('click', 'span', function (e) {
        e.stopPropagation();
        deleteTodo($(this).parent());
    })
    $('.list').on("click", 'li', function (e) {
        e.stopPropagation(); //important
        updateTodo($(this));
    })
})

//Check Off Specific Todos By Clicking 
$("ul").on("click", "li", function () {

})

$("h3 i").on("click", function () {
    $("input[type='text']").toggleClass("plus");
})

function updateTodo(todo) {
    var updateUrl = "/api/todos/" + todo.data('id')
    var completed = !todo.data('completed');
    var updateData = { completed: completed };
    $.ajax({
        url: updateUrl,
        method: 'PUT',
        data: updateData
    })
        .then(function (updatedTodo) {
            todo.toggleClass("done");
            todo.data("completed", completed);
        });
    //     })
}
function deleteTodo(li) {
    var deleteUrl = "/api/todos/" + li.data('id');
    $.ajax({
        url: deleteUrl,
        method: 'DELETE'
    })
        .then(function (data) {
            li.fadeOut(500, function () {
                $(this).remove();
            });
        })
        .catch(function (err) {
            console.log(err);
        })
}
function addTodos(todos) {
    todos.forEach(addTodo);
}
function createTodo() {
    var userInput = $('#todoInput').val();
    $.post('/api/todos', { name: userInput })
        .then(function (newTodo) {
            addTodo(newTodo);
        })
        .catch(function (err) {
            console.log(err);
        })
}
function addTodo(todo) {
    var newTodo = $("<li><span><i class='fa fa-trash'></i></a></span> " + todo.name + "</li>");
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $(".list").append(newTodo);
}