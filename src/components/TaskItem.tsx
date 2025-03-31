
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/store/tasksSlice';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, MoveVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import TaskEditDialog from './TaskEditDialog';

interface TaskItemProps {
  task: Task;
  index: number;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  onEdit: (task: Task) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  listType: 'pending' | 'completed';
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  onToggleComplete,
  onDelete,
  onEdit,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDragEnd,
  onDrop,
  isDragging,
  listType,
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id, task.title);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditSave = (editedTask: Task) => {
    onEdit(editedTask);
    setEditDialogOpen(false);
  };

  const priorityColors = {
    low: 'bg-task-low text-white',
    medium: 'bg-task-medium text-white',
    high: 'bg-task-high text-white',
  };

  return (
    <>
      <div
        className={cn(
          'task-item group flex items-start gap-3 p-4 border rounded-lg bg-white shadow-sm transition-all duration-300',
          task.completed && 'bg-muted/40',
          isDragging && 'dragging scale-95 opacity-50',
          listType === 'completed' && 'bg-muted/30 border-dashed',
          'hover:shadow-md transform hover:-translate-y-1'
        )}
        draggable
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        data-task-id={task.id}
      >
        <div className="flex-shrink-0 pt-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            className={cn("mt-1", task.completed && "animate-scale-in")}
          />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                'font-medium text-base line-clamp-2',
                task.completed && 'line-through text-muted-foreground'
              )}
            >
              {task.title}
            </h3>
            <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {listType === 'pending' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleEditClick}
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {task.description && (
            <p
              className={cn(
                'text-sm text-muted-foreground mt-1 line-clamp-2',
                task.completed && 'line-through'
              )}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant="secondary"
              className={cn(
                "text-xs",
                priorityColors[task.priority]
              )}
            >
              {task.priority}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {format(new Date(task.createdAt), 'MMM d, yyyy')}
            </span>
            <div className="flex-grow"></div>
            <span className="text-xs text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <MoveVertical className="h-3 w-3" /> Drag to move
            </span>
          </div>
        </div>
      </div>

      <TaskEditDialog
        task={task}
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleEditSave}
      />
    </>
  );
};

export default TaskItem;
