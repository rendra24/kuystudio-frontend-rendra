"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task, TaskStatus } from "@/types/task";
import { TaskCard } from "./TaskCard";
import { cn } from "@/lib/utils";

interface TaskColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onUpdateTask: (id: number, data: any) => Promise<any>;
  onDeleteTask: (id: number) => Promise<void>;
}

export function TaskColumn({ id, title, tasks, onUpdateTask, onDeleteTask }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div className="flex flex-col h-full rounded-lg bg-slate-50/50 border border-slate-100">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white rounded-t-lg">
        <h2 className="font-semibold text-slate-800">{title}</h2>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      <div 
        ref={setNodeRef} 
        className={cn(
          "flex-1 p-4 space-y-3 min-h-[200px] transition-colors",
          isOver ? "bg-slate-100/80" : ""
        )}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))}
          {tasks.length === 0 && !isOver && (
            <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-slate-200 text-sm text-slate-400">
              No tasks
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}
