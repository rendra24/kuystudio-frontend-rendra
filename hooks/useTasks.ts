"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from "@/types/task";
import { taskApi } from "@/lib/api/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await taskApi.getAll();
      setTasks(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (payload: CreateTaskDto) => {
    try {
      const newTask = await taskApi.create(payload);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateTask = async (id: number, payload: UpdateTaskDto) => {
    try {
      // Optimistic update for smoother UI
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...payload } : task))
      );
      
      const updatedTask = await taskApi.update(id, payload);
      
      // Reconcile with actual server data
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      console.error(err);
      // Revert on error
      fetchTasks();
      throw err;
    }
  };

  const removeTask = async (id: number) => {
    try {
      // Optimistic update
      setTasks((prev) => prev.filter((task) => task.id !== id));
      await taskApi.delete(id);
    } catch (err) {
      console.error(err);
      fetchTasks();
      throw err;
    }
  };

  const moveTask = async (id: number, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === newStatus) return;

    await updateTask(id, { status: newStatus });
  };

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    removeTask,
    moveTask,
  };
}
