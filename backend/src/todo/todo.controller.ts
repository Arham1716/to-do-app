import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.findAll();
  }

  @Post()
  addTodo(@Body('title') title: string) {
    return this.todoService.create(title);
  }

  @Post(':id/toggle')
  toggleTodo(@Param('id') id: string) {
    return this.todoService.toggle(Number(id));
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.delete(Number(id));
  }
}