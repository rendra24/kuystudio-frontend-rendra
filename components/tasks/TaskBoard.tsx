"use client";

import { useState } from "react";
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Task, TaskStatus } from "@/types/task";
import { TaskColumn } from "./TaskColumn";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
import { useTasks } from "@/hooks/useTasks";
import { createPortal } from "react-dom";

export function TaskBoard() {
  const { tasks, isLoading, error, addTask, updateTask, removeTask, moveTask } = useTasks();
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Avoid accidental drags
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const doneTasks = tasks.filter((t) => t.status === "done");

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(Number(active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overId = over.id;

    if (!activeTask) return;

    if (overId === "pending" || overId === "done") {
      if (activeTask.status !== overId) {
        moveTask(activeTask.id, overId as TaskStatus);
      }
    } else {
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask && activeTask.status !== overTask.status) {
        moveTask(activeTask.id, overTask.status);
      }
    }

    setActiveId(null);
  }
  
  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        Error: {error}
        <button onClick={() => window.location.reload()} className="ml-2 underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <TaskForm onSubmit={addTask} />

      {isLoading && tasks.length === 0 ? (
        <div className="text-center py-12 text-slate-500">Loading tasks...</div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <TaskColumn 
              id="pending" 
              title="Pending" 
              tasks={pendingTasks} 
              onUpdateTask={updateTask}
              onDeleteTask={removeTask}
            />
            <TaskColumn 
              id="done" 
              title="Done" 
              tasks={doneTasks}
              onUpdateTask={updateTask}
              onDeleteTask={removeTask}
            />
          </div>

          {createPortal(
            <DragOverlay>
              {activeTask ? (
                <div className="opacity-80 rotate-2 cursor-grabbing">
                   <TaskCard 
                      task={activeTask} 
                      onUpdate={async () => {}} 
                      onDelete={async () => {}} 
                    />
                </div>
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      )}
    </div>
  );
}
