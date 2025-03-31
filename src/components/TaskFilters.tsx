
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useTasks } from '@/hooks/useTasks';

const TaskFilters: React.FC = () => {
  const { filter, sort, sortDirection, changeFilter, changeSort } = useTasks();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <Tabs 
        defaultValue={filter}
        value={filter} 
        onValueChange={(value) => changeFilter(value as 'all' | 'active' | 'completed')}
        className="w-full sm:w-auto"
      >
        <TabsList className="grid grid-cols-3 w-full sm:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
        <Select 
          value={sort} 
          onValueChange={(value) => changeSort(value as 'date' | 'priority' | 'title')}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date {sort === 'date' && (sortDirection === 'desc' ? '(Newest)' : '(Oldest)')}</SelectItem>
            <SelectItem value="priority">Priority {sort === 'priority' && (sortDirection === 'desc' ? '(High)' : '(Low)')}</SelectItem>
            <SelectItem value="title">Title {sort === 'title' && (sortDirection === 'desc' ? '(Z-A)' : '(A-Z)')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TaskFilters;
