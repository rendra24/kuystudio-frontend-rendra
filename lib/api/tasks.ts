import { Task, CreateTaskDto, UpdateTaskDto } from "@/types/task";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_URL = `${BASE_URL}/api/tasks`;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(
      error.message || `Request failed with status ${response.status}`
    );
  }
  const data = await response.json();
  // Handle wrapped responses for single items (commonly used in Laravel Resources)
  if (data && data.data && !Array.isArray(data.data)) {
    return data.data as T;
  }
  return data as T;
}

export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    const res = await fetch(API_URL, {
      cache: "no-store",
    });
    const data = await res.json();

    if (Array.isArray(data)) {
      return data;
    }

    if (data && Array.isArray(data.data)) {
      return data.data;
    }

    if (data && data.data && Array.isArray(data.data.data)) {
      return data.data.data;
    }

    return [];
  },

  getOne: async (id: number): Promise<Task> => {
    const res = await fetch(`${API_URL}/${id}`);
    return handleResponse<Task>(res);
  },

  create: async (data: CreateTaskDto): Promise<Task> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Task>(res);
  },

  update: async (id: number, data: UpdateTaskDto): Promise<Task> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Task>(res);
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete task ${id}`);
    }
  },
};
