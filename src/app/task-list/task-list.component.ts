import {Component, OnInit} from '@angular/core';
import {TaskService} from "../shared/task.service";
import {catchError, Observable, of} from "rxjs";
import {TaskModel} from "../shared/task.model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{
  tasks: Observable<TaskModel[]> | undefined;
  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.tasks = this.taskService.getAllTasks()
  }
  deleteTask(id: string) {
    this.taskService.deleteTask(id)
      .pipe(
        catchError(err => {
          return of(err)
        })
      )
      .subscribe(data => {
        console.log(`Deleted data: ${Object.values(data)}`)
        this.tasks = this.taskService.getAllTasks()
      })
  }
}
