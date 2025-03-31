
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: Priority;
}

export interface TasksState {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  sort: 'date' | 'priority' | 'title';
  sortDirection: 'asc' | 'desc';
}

const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
  }
  return [];
};

const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
};

const initialState: TasksState = {
  tasks: loadTasksFromStorage(),
  filter: 'all',
  sort: 'date',
  sortDirection: 'desc',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToStorage(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToStorage(state.tasks);
      }
    },
    reorderTasks: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, removed);
      saveTasksToStorage(state.tasks);
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
    setSort: (state, action: PayloadAction<'date' | 'priority' | 'title'>) => {
      if (state.sort === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort = action.payload;
        state.sortDirection = 'desc';
      }
    },
  },
});

export const { 
  addTask, 
  updateTask, 
  deleteTask, 
  toggleTaskCompletion, 
  reorderTasks, 
  setFilter, 
  setSort 
} = tasksSlice.actions;

export default tasksSlice.reducer;
