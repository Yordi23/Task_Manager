import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        // @Body('title') title: string,
        // @Body('description') description: string,
        @Body() createTaskDto: CreateTaskDto,
    ): Promise<Task> {
        // return this.tasksService.createTask(title, description);
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    //   //My Solution
    //   // @Patch('/:id/status')
    //   // updateTaskStatus(
    //   //   @Param('id') id: string,
    //   //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    //   // ): Task {
    //   //   return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
    //   // }

    //   //Course Solution
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
