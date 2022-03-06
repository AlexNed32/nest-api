import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController, Crud } from '@nestjsx/crud';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';

@Crud({
  model: {
    type: Todo
  },
})
@ApiTags('todo')
@Controller('rest/todo')
export class TodoController implements CrudController<Todo>{
  constructor(public service: TodoService){}
}
