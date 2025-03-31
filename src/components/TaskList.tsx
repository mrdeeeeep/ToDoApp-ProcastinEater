
import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import TaskItem from './TaskItem';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Inbox, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface TaskListProps {
  tasks: any[];
  listType: 'pending' | 'completed';
  className?: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, listType, className }) => {
  const { 
    toggleComplete, 
    removeTask, 
    editTask, 
    reorderTaskItems,
    moveTaskBetweenLists
  } = useTasks();
  const isMobile = useIsMobile();

  const { 
    dragging, 
    sourceListType,
    handleDragStart, 
    handleDragOver, 
    handleDragEnter, 
    handleDragEnd, 
    handleDrop 
  } = useDragAndDrop((sourceIndex, destinationIndex, sourceType, destinationType) => {
    if (sourceType === destinationType) {
      // If dragging within the same list
      reorderTaskItems(sourceIndex, destinationIndex);
    } else {
      // If dragging between lists (completed to pending or pending to completed)
      moveTaskBetweenLists(sourceIndex, sourceType === 'pending');
    }
  });

  if (tasks.length === 0) {
    return (
      <div 
        className={cn("transition-all duration-300", className)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 0, listType)}
        data-list-type={listType}
      >
        <Alert className="border-dashed animate-fade-in backdrop-blur-sm bg-white/30 dark:bg-black/30 rounded-xl border-olive-300 dark:border-olive-700 p-3 sm:p-4">
          {listType === 'pending' ? (
            <Inbox className="h-4 w-4 sm:h-5 sm:w-5 text-olive-600 dark:text-olive-400" />
          ) : (
            <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5 text-olive-600 dark:text-olive-400" />
          )}
          <AlertDescription className="text-olive-700 dark:text-olive-300 text-xs sm:text-sm">
            {listType === 'pending' 
              ? 'No pending tasks. All caught up! Drag completed tasks here to reopen them.' 
              : 'No completed tasks yet. Finish some tasks to see them here!'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "space-y-2 sm:space-y-3 transition-all duration-300",
        listType === 'completed' && "opacity-85",
        dragging && sourceListType !== listType && "border-2 border-dashed border-olive-400 rounded-lg p-2",
        className
      )}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, tasks.length, listType)}
      data-list-type={listType}
    >
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggleComplete={toggleComplete}
          onDelete={removeTask}
          onEdit={editTask}
          onDragStart={(e) => handleDragStart(e, task.id, index, listType)}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDrop={(e) => handleDrop(e, index, listType)}
          isDragging={dragging === task.id}
          listType={listType}
        />
      ))}
    </div>
  );
};

export default TaskList;
