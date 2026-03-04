import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  create(title: string): Promise<Todo> {
    const todo = this.todoRepository.create({ title, completed: false });
    return this.todoRepository.save(todo);
  }

  async toggle(id: number): Promise<Todo | undefined> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) return undefined;
    todo.completed = !todo.completed;
    return this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.todoRepository.delete(id);
    // null-safe check
    return (result.affected ?? 0) > 0;
  }
}