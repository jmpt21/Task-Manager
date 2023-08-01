import {Component, OnInit} from '@angular/core';
import {TaskModel, TaskStateSelected} from '../shared/task.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../shared/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  taskId: string | null = null
  task: TaskModel
  taskStateSelect: typeof TaskStateSelected = []
  selectedOption: string = 'Ahead'
  edit: boolean = false

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {
    this.task = {title: '', date: new Date(Date.now()), state: 'Ahead'}
  }

  ngOnInit(): void {
    this.taskStateSelect = TaskStateSelected

    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id')!

      if(this.taskId !== null) { //Get task for edit
        this.taskService.getTask(this.taskId).pipe().subscribe(task => {
          this.task = task
          this.edit = true
        })
      }
    })
  }
  onSubmit(task: TaskModel) {
    if (this.task._id) { //Update task
      this.taskService.updateTask(this.task).pipe().subscribe((data: TaskModel) => {
        console.log(data)
        this.router.navigate(['/tasks'])
            .then()
            .catch(err => {
              console.log(err)
            })
      })
    } else { //Create task
      this.task = task
      this.taskService.addTask(this.task).pipe().subscribe((data: TaskModel) => {
        console.log(data)
        this.router.navigate(['/tasks'])
            .then()
            .catch(err => {
              console.log(err)
            })
      })
    }
  }
}
