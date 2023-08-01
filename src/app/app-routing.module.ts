import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskEditComponent} from "./task-edit/task-edit.component";

const routes: Routes = [
  {path: 'tasks', component: TaskListComponent},
  {path: 'tasks/:id/edit', component: TaskEditComponent},
  {path: 'tasks/new', component: TaskEditComponent},
  {path: '*', redirectTo: '/tasks', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
