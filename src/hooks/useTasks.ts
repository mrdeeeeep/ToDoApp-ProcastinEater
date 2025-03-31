
import { useAppSelector, useAppDispatch } from './redux';
import { 
  Task, 
  addTask, 
  updateTask, 
  deleteTask, 
  toggleTaskCompletion, 
  reorderTasks,
  setSort,
  setFilter
} from '../store/tasksSlice';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

export const useTasks = () => {
  const { tasks, filter, sort, sortDirection } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const createTask = (
    title: string, 
    description: string = '', 
    priority: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
    };
    
    dispatch(addTask(newTask));
    
    toast({
      title: 'Task Created',
      description: `"${title}" has been added to your tasks.`,
    });
    
    return newTask;
  };

  const editTask = (task: Task) => {
    dispatch(updateTask(task));
    
    toast({
      title: 'Task Updated',
      description: `"${task.title}" has been updated.`,
    });
  };

  const removeTask = (id: string, title: string) => {
    dispatch(deleteTask(id));
    
    toast({
      title: 'Task Deleted',
      description: `"${title}" has been removed.`,
      variant: 'destructive',
    });
  };

  const toggleComplete = (id: string) => {
    dispatch(toggleTaskCompletion(id));
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? 'Task Reopened' : 'Task Completed',
        description: `"${task.title}" ${task.completed ? 'has been moved back to pending' : 'has been marked as complete'}`,
        variant: 'default',
      });
    }
  };

  const reorderTaskItems = (sourceIndex: number, destinationIndex: number) => {
    dispatch(reorderTasks({ sourceIndex, destinationIndex }));
  };
  
  const moveTaskBetweenLists = (taskIndex: number, isPending: boolean) => {
    // We get the actual task from the correct list (based on whether it was a pending or completed task)
    const sourceList = isPending ? pendingTasks : completedTasks;
    
    // Make sure the index is valid
    if (taskIndex >= 0 && taskIndex < sourceList.length) {
      const taskToToggle = sourceList[taskIndex];
      if (taskToToggle) {
        toggleComplete(taskToToggle.id);
      }
    }
  };

  const changeSort = (newSort: 'date' | 'priority' | 'title') => {
    dispatch(setSort(newSort));
  };

  const changeFilter = (newFilter: 'all' | 'active' | 'completed') => {
    dispatch(setFilter(newFilter));
  };

  // Split tasks into pending and completed
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Apply filter
  const filteredTasks = filter === 'all' 
    ? tasks 
    : filter === 'active' 
      ? pendingTasks 
      : completedTasks;

  const sortTasks = (tasksToSort: Task[]) => {
    return [...tasksToSort].sort((a, b) => {
      let comparison = 0;
      
      if (sort === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sort === 'priority') {
        const priorityValues = { low: 0, medium: 1, high: 2 };
        comparison = priorityValues[a.priority] - priorityValues[b.priority];
      } else if (sort === 'title') {
        comparison = a.title.localeCompare(b.title);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  return {
    tasks: sortTasks(filteredTasks),
    pendingTasks: sortTasks(pendingTasks),
    completedTasks: sortTasks(completedTasks),
    filter,
    sort,
    sortDirection,
    createTask,
    editTask,
    removeTask,
    toggleComplete,
    reorderTaskItems,
    moveTaskBetweenLists,
    changeFilter,
    changeSort,
  };
};
