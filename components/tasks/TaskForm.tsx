"use client";

import { useState } from "react";
import { CreateTaskDto, TaskStatus } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface TaskFormProps {
  onSubmit: (data: CreateTaskDto) => Promise<any>;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      await onSubmit({ title, status });
      setTitle("");
      setStatus("pending");
    } catch (error) {
      console.error("Failed to create task", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-8 w-full max-w-3xl mx-auto border-dashed border-2 shadow-none bg-slate-50/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-slate-700">Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="grid gap-2 w-full">
            <Label htmlFor="title" className="sr-only">Task Title</Label>
            <Input
              id="title"
              placeholder="Type your task here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              className="bg-white"
              required
            />
          </div>
          <div className="w-full sm:w-[140px]">
            <Label htmlFor="status" className="sr-only">Status</Label>
            <select
              id="status"
              className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              disabled={isSubmitting}
            >
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
          </div>
          <Button type="submit" disabled={isSubmitting || !title.trim()}>
            {isSubmitting ? "Adding..." : "Add"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
