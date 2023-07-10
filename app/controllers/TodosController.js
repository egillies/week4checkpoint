import { AppState } from "../AppState.js"
import { Todo } from "../models/Todo.js"
import { todosService } from "../services/TodosService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"
import { setText } from "../utils/Writer.js"

function _drawTodos() {
    const todos = AppState.todos
    let template = ''
    todos.forEach(t => template += t.TodoTemplate)
    const uncompletedTodos = todos.filter(t => t.completed == false)
    setHTML('todoList', template)
    setText('uncompletedTodoCount', uncompletedTodos.length)
}

function _showForm() {
    const account = AppState.account

    if (!account) {
        return
    }

    const todoForm = document.getElementById('todoForm')

    todoForm.classList.remove('d-none')
}

export class TodosController {
    constructor() {
        console.log('todos controller loaded');

        AppState.on('todos', _drawTodos)
        AppState.on('account', this.getTodos)
        AppState.on('account', _drawTodos)
        AppState.on('account', _showForm)
    }

    drawTodoForm() {
        setHTML('todoForm', Todo.CreateForm)
    }

    async getTodos() {
        try {
            await todosService.getTodos()
        } catch (error) {
            console.error(error);
            Pop.error(error.message)
        }
    }

    async createTodo(event) {
        try {
            event.preventDefault();

            console.log('button works');

            const form = event.target

            const todoData = getFormData(form)

            console.log('todo data', todoData);

            await todosService.createTodo(todoData)

            form.reset()

        } catch (error) {
            console.error(error);
            Pop.error(error.message)
        }
    }

    async toggleTodoCompleted(todoId) {
        try {
            await todosService.toggleTodoCompleted(todoId)
        } catch (error) {
            console.error(error);
            Pop.error(error.message)
        }
    }

    async deleteTodo(todoId) {
        try {
            const wantsToDelete = await Pop.confirm('Are you sure you want to delete this to-do?')

            if (!wantsToDelete) {
                return
            }
            await todosService.deleteTodo(todoId)
        } catch (error) {
            console.error(error);
            Pop.error(error.message)
        }
    }
}




