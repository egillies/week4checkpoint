import { AppState } from "../AppState.js";
import { Todo } from "../models/Todo.js";
import { api } from "./AxiosService.js"

class TodosService {

    async toggleTodoCompleted(todoId) {
        const completedTodoIndex = AppState.todos.findIndex(t => t.id == todoId)

        const completedTodo = AppState.todos[completedTodoIndex]

        if (!completedTodo) {
            throw new Error("INVALID ID")
        }

        const completed = !completedTodo.completed
        const todoData = { 'completed': completed }

        api.put(`api/todos/${todoId}`, todoData)

        AppState.todos[completedTodoIndex].completed = completed

        AppState.emit('todos')
    }

    async getTodos() {
        const res = await api.get('api/todos')

        console.log('got todos', res.data);

        const builtTodos = res.data.map(r => new Todo(r))

        AppState.todos = builtTodos

        AppState.emit('todos')
    }

    async createTodo(todoData) {
        const res = await api.post('api/todos', todoData)

        console.log('created todo', res.data);

        const builtTodo = new Todo(res.data);

        AppState.todos.push(builtTodo)

        AppState.emit('todos')
    }

    async deleteTodo(todoId) {
        console.log('todo id', todoId);

        const res = await api.delete(`api/todos/${todoId}`)

        console.log(res.data);

        const todoIndex = AppState.todos.findIndex(t => t.id == todoId)

        if (todoIndex < 0) {
            throw new Error(`No todo index found with the id of ${todoId}`)
        }

        AppState.todos.splice(todoIndex, 1)

        AppState.emit('todos')
    }
}
export const todosService = new TodosService()