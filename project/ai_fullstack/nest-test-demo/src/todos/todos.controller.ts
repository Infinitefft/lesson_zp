import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,  // 解析参数为整数
} from '@nestjs/common'

import {
  TodoService,
} from './todos.service'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodoService){

  }
  @Get()
  getTodos() {
    return this.todosService.findAll();
  }
  @Post()
  addTodo(@Body('title') title: string) {
    return this.todosService.addTodo(title);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id, '////');
    return this.todosService.deleteTodo(id);
  }
}