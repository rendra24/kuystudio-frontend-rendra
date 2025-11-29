export type TaskStatus = "pending" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskDto {
  title: string;
  status?: TaskStatus;
}

export interface UpdateTaskDto {
  title?: string;
  status?: TaskStatus;
}
