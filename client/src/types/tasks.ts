export enum TaskType {
  text = 1,
  progress = 2,
  list = 3,
  habit = 4,
}

export interface ITag {
  id: number;
  color: string;
  text: string;
}

export interface ITags {
  tags?: ITag[];
}

export interface INoteTask extends ITags {
  id: number;
  type?: TaskType.text;
  name: string;
}

export interface ITodo extends ITags {
  id: number;
  completed: boolean;
  name?: string;
}

export interface ITodosTask extends ITags {
  id: number;
  type?: TaskType.list;
  todos: ITodo[];
  name?: string;
}

export interface IProgressTask extends ITags {
  id: number;
  type?: TaskType.progress;
  name: string;
  total: number;
  current: number;
  has_limit: boolean;
}

export interface IHabitTask extends ITags {
  id: number;
  name: string;
  type?: TaskType.habit;
  dates?: string[];
}
