
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Task } from '@/store/tasksSlice';
import TaskEditDialog from './TaskEditDialog';
import { useTasks } from '@/hooks/useTasks';

const CreateTaskButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { createTask } = useTasks();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveTask = (task: Task) => {
    createTask(task.title, task.description, task.priority);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpenDialog} className="gap-2 text-base">
        <Plus className="h-5 w-5" />
        Add Task
      </Button>

      <TaskEditDialog
        task={{
          id: '',
          title: '',
          description: '',
          completed: false,
          createdAt: new Date().toISOString(),
          priority: 'medium',
        }}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveTask}
      />
    </>
  );
};

export default CreateTaskButton;
