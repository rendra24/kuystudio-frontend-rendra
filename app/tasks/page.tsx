"use client";

import { TaskBoard } from "@/components/tasks/TaskBoard";

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-slate-200">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Task Board KuyStudio - Rendra</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Tasks Management</h2>
              <p className="text-slate-500 mt-1">
                Drag and drop tasks between columns to update status.
              </p>
            </div>
          </div>
          
          <TaskBoard />
        </div>
      </main>
    </div>
  );
}
