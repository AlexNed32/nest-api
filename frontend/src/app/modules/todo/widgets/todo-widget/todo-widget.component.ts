import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../model/todo';
import { BACKEND_BASE_DOMAIN } from 'src/env';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.css']
})
export class TodoWidgetComponent implements OnInit{
  public title = '';

  public todoList$: Observable<Todo[]>
  public loading$: Observable<boolean>

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoList$ = this.todoService.entities$;
    this.loading$ = this.todoService.loading$;
    this.todoService.getAll();
  }

  onCreate(): void {
    if(this.title){
      this.todoService.add(this.title)
        this.title = '';
    }
  }

  onRemove(todo: Todo){
    this.todoService.remove(todo.id)
  }

  onComplited(todo: Todo){
   this.todoService.update(todo)
  }
}
