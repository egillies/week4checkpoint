import { AppState } from "../AppState.js";

export class Todo {
  constructor(data) {
    this.id = data.id
    this.description = data.description
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.completed = data.completed
  }


  get TodoTemplate() {
    return `
    <div class="col-3 m-auto mb-3">
      <section class="row glass-box">
        <p>${this.createdAt.toLocaleString()}</p>
        <p>${this.description}</p>
        <p> <input ${this.completed ? 'checked' : ''} onchange="app.TodosController.toggleTodoCompleted('${this.id}')" type="checkbox"></p>
        <p>${this.ComputeDeleteButton}</p>
      </section>
    </div>
    `
  }

  get CreateForm() {
    return `

    <form onsubmit="app.TodosController.createTodo(event)">
    <label for="todoText">Todo Name</label>
    <input type="text" class="mb-3" id="todoText" minlength="3" required name="description">
    <button class="btn btn-success" type="submit">Submit</button>
  </form>
`
  }

  get ComputeDeleteButton() {
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }
    return `<button onclick="app.TodosController.deleteTodo('${this.id}')" class="btn btn-danger">Delete To-Do</button>`
  }

}