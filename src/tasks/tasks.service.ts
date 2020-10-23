import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { title } from 'process';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  //My Solution
  //   updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
  //     const { status } = updateTaskStatusDto;
  //     let updatedTask;

  //     this.tasks = this.tasks.map(task => {
  //       if (task.id === id) {
  //         task.status = status;
  //         updatedTask = task;
  //         return task;
  //       }
  //       return task;
  //     });

  //     return updatedTask;
  //   }

  //Course Solution
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
