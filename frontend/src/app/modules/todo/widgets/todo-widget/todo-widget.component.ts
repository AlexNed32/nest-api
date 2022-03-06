import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../../../model/todo';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.css']
})
export class TodoWidgetComponent implements OnInit{
  public title = '';
  public todoList: Todo[];
  private httpClient: HttpClient;

  constructor( httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  ngOnInit(): void {
    this.httpClient.get<Todo[]>('http://localhost:3000/rest/todo')
    .subscribe(todoList => {
      this.todoList = todoList;
    })
  }

  onCreate(): void {
    if(this.title){
      this.httpClient.post<Todo>(
        'http://localhost:3000/rest/todo',
        {
          title: this.title
        }
      ).subscribe(todo => {
          this.todoList.push(todo);
        })
        this.title = '';
    }
  }

  onRemove(todoDelete: Todo){
    this.httpClient.delete<void>(
      'http://localhost:3000/rest/todo/' + todoDelete.id
    ).subscribe(() => {
        this.todoList = this.todoList.filter(todo=>todo.id !== todoDelete.id)
      })
  }

  onComplited(todoOnComplited: Todo){
    this.httpClient.patch<Todo>(
      'http://localhost:3000/rest/todo/' + todoOnComplited.id,
      {
        isCompleted: !todoOnComplited.isCompleted
      }
    ).subscribe((updatedTodo: Todo) => {
      this.todoList = this.todoList.map(todo=>todo.id !== updatedTodo.id ? todo : updatedTodo)
      })
  }
}
