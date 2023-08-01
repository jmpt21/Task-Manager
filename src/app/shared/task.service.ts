import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TaskModel} from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get<TaskModel[]>(`http://localhost:3000/api/task`)
  }
  getTask(id: string) {
    return this.http.get<TaskModel>(`http://localhost:3000/api/task/${id}`)
  }
  addTask(task: TaskModel) {
    return this.http.post<TaskModel>(`http://localhost:3000/api/task`,
        {
            title : task.title,
            date : new Date(task.date),
            state: task.state
        }
    )
  }
  updateTask(task: TaskModel) {
    return this.http.put<TaskModel>(`http://localhost:3000/api/task/${task._id}`,
        {
          "title" : task.title,
          "date" : new Date(task.date),
          "state": task.state
        })
  }
  deleteTask(id: string) {
    return this.http.delete<string>(`http://localhost:3000/api/task/${id}`)
  }
}
