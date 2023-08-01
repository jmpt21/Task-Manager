/*type TaskStates = 'Ahead' | 'In progress' | 'Done'

export const TaskStateSelected = [
  {value: 'Ahead'},
  {value: 'In progress'},
  {value: 'Done'}
]

export class TaskModel {
  constructor(
    public title: string,
    public date: Date,
    public state: TaskStates,
    public _id?: string
  ) {}

}*/
type TaskStates = 'Ahead' | 'In progress' | 'Done'
export const TaskStateSelected = [
  {value: 'Ahead'},
  {value: 'In progress'},
  {value: 'Done'}
]
export interface TaskModel {
  _id?: string
  title: string,
  date: Date,
  state: TaskStates
}
