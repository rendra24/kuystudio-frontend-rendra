"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task, TaskStatus } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onUpdate: (id: number, data: { title: string; status: TaskStatus }) => Promise<any>;
  onDelete: (id: number) => Promise<void>;
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editStatus, setEditStatus] = useState<TaskStatus>(task.status);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await onUpdate(task.id, { title: editTitle, status: editStatus });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        setIsLoading(true);
        await onDelete(task.id);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-50 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg h-[120px]"
      />
    );
  }

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
        <Card className="hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
          <CardContent className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-2">
              <p className="font-medium text-slate-900 leading-tight break-words">
                {task.title}
              </p>
              <Badge variant={task.status === "done" ? "default" : "secondary"}>
                {task.status}
              </Badge>
            </div>
            
            <div className="flex justify-end gap-2 mt-2" onPointerDown={(e) => e.stopPropagation()}>
               <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    {/* Stop propagation to prevent dragging while interacting with form */}
                    <div onPointerDown={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-title" className="text-black font-semibold">Title</Label>
                          <Input
                            id="edit-title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-status" className="text-black font-semibold">Status</Label>
                          <select
                              id="edit-status"
                              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-slate-950 cursor-pointer"
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value as TaskStatus)}
                            >
                              <option value="pending">Pending</option>
                              <option value="done">Done</option>
                            </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isLoading}>Save Changes</Button>
                      </DialogFooter>
                    </div>
                  </DialogContent>
               </Dialog>

              <Button 
                variant="destructive" 
                size="sm" 
                className="h-7 text-xs"
                onClick={handleDelete}
                disabled={isLoading}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
