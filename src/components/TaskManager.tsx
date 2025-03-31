
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TaskList from './TaskList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTasks } from '@/hooks/useTasks';
import { Plus, Calendar, Tag, SortAsc, SortDesc, ListFilter, Inbox, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/store/tasksSlice';
import TaskEditDialog from './TaskEditDialog';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const TaskManager: React.FC = () => {
  const { tasks, pendingTasks, completedTasks, sort, sortDirection, changeSort, createTask } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentActiveTab, setCurrentActiveTab] = useState('date');
  const isMobile = useIsMobile();
  
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
  
  const handleSortChange = (value: string) => {
    changeSort(value as 'date' | 'priority' | 'title');
    setCurrentActiveTab(value);
  };

  const SortIcon = sortDirection === 'desc' ? SortDesc : SortAsc;
  
  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      {/* Prominent Add Task Button - Moved to top */}
      <div className="flex justify-center my-4 sm:my-6">
        <motion.div 
          className="z-20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={handleOpenDialog} 
            size={isMobile ? "default" : "lg"}
            className="rounded-full px-4 sm:px-8 bg-accent hover:bg-accent/90 text-white shadow-lg"
          >
            <Plus className="h-5 w-5 sm:h-6 sm:w-6 mr-1" />
            <span className="text-sm sm:text-base">Add New Task</span>
          </Button>
        </motion.div>
      </div>

      {/* Sort Tab - Repositioned to center and made longer, with responsive padding */}
      <div className="mb-4 sm:mb-8 flex justify-center">
        <Card className="w-full max-w-2xl shadow-md border-olive-300 dark:border-olive-700 bg-white/70 dark:bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden">
          <CardContent className="p-1 sm:p-2">
            <Tabs 
              defaultValue="date" 
              value={sort}
              onValueChange={handleSortChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full rounded-lg bg-olive-100/50 dark:bg-olive-800/30 p-1">
                <TabsTrigger 
                  value="date" 
                  className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-olive-500 data-[state=active]:to-accent data-[state=active]:text-white rounded-md transition-all duration-300 data-[state=active]:shadow-md text-xs sm:text-sm py-1"
                >
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="inline">Date</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="priority" 
                  className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-olive-500 data-[state=active]:to-accent data-[state=active]:text-white rounded-md transition-all duration-300 data-[state=active]:shadow-md text-xs sm:text-sm py-1"
                >
                  <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="inline">Priority</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="title" 
                  className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-olive-500 data-[state=active]:to-accent data-[state=active]:text-white rounded-md transition-all duration-300 data-[state=active]:shadow-md text-xs sm:text-sm py-1"
                >
                  <ListFilter className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="inline">Name</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Sort Direction Button - Centered */}
              <div className="flex items-center justify-center mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => changeSort(sort)} 
                  className="text-olive-600 dark:text-olive-400 flex items-center justify-center text-xs sm:text-sm"
                >
                  <SortIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  {sortDirection === 'desc' ? 'Descending' : 'Ascending'}
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Desktop View - Side by Side Columns */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 md:gap-6">
        <Card className="shadow-md animate-fade-in rounded-2xl border-olive-300 dark:border-olive-700 bg-white/70 dark:bg-black/40 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center text-lg sm:text-xl font-semibold text-olive-800 dark:text-olive-300">
              <span className="bg-olive-500/20 text-olive-700 dark:text-olive-300 rounded-full w-7 h-7 inline-flex items-center justify-center mr-2">
                {pendingTasks.length}
              </span>
              <span className="flex items-center gap-2">
                <Inbox className="h-5 w-5 text-olive-600" />
                Pending Tasks
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <TaskList tasks={pendingTasks} listType="pending" className="min-h-[300px]" />
          </CardContent>
        </Card>

        <Card className="shadow-md animate-fade-in rounded-2xl border-olive-300 dark:border-olive-700 bg-white/70 dark:bg-black/40 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center text-lg sm:text-xl font-semibold text-olive-800 dark:text-olive-300">
              <span className="bg-muted/80 text-muted-foreground rounded-full w-7 h-7 inline-flex items-center justify-center mr-2">
                {completedTasks.length}
              </span>
              <span className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-olive-600" />
                Completed Tasks
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <TaskList tasks={completedTasks} listType="completed" className="min-h-[300px]" />
          </CardContent>
        </Card>
      </div>

      {/* Mobile View - Tabbed Interface */}
      <div className="md:hidden w-full">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-3 rounded-xl bg-olive-100/50 dark:bg-olive-800/30 text-xs sm:text-sm">
            <TabsTrigger 
              value="pending" 
              className="relative rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-olive-500 data-[state=active]:to-accent data-[state=active]:text-white py-1.5"
            >
              <span className="flex items-center gap-1.5">
                <Inbox className="h-3 w-3 sm:h-4 sm:w-4" />
                Pending
              </span>
              <span className="absolute -top-1.5 -right-1.5 bg-olive-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {pendingTasks.length}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="relative rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-olive-500 data-[state=active]:to-accent data-[state=active]:text-white py-1.5"
            >
              <span className="flex items-center gap-1.5">
                <CheckSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                Completed
              </span>
              <span className="absolute -top-1.5 -right-1.5 bg-olive-400 text-olive-800 dark:text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {completedTasks.length}
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-0">
            <Card className="shadow-md animate-slide-in rounded-2xl border-olive-300 dark:border-olive-700 bg-white/70 dark:bg-black/40 backdrop-blur-sm">
              <CardContent className="p-3 sm:p-6">
                <TaskList tasks={pendingTasks} listType="pending" className="min-h-[300px]" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <Card className="shadow-md animate-slide-in rounded-2xl border-olive-300 dark:border-olive-700 bg-white/70 dark:bg-black/40 backdrop-blur-sm">
              <CardContent className="p-3 sm:p-6">
                <TaskList tasks={completedTasks} listType="completed" className="min-h-[300px]" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

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
    </div>
  );
};

export default TaskManager;
