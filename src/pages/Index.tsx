
import { Provider } from 'react-redux';
import { store } from '@/store';
import TaskManager from '@/components/TaskManager';
import { Github, Linkedin, CalendarCheck, Utensils, Check, Star, ListTodo } from 'lucide-react';
import Logo from '@/assets/icons/logo.png';

const Index = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-olive-100 to-olive-200 dark:from-olive-900 dark:to-olive-800 flex flex-col relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-olive-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          {/* Grid patterns */}
          <div className="absolute inset-0 bg-grid-white/[0.03] dark:bg-grid-white/[0.05]"></div>
          
          {/* Light effect */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-olive-400/30 rounded-full filter blur-[100px] opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full filter blur-[100px] opacity-20"></div>
          
          {/* Floating icons */}
          <div className="absolute top-[15%] left-[10%] text-olive-400/30 animate-float animation-delay-1000">
            <CalendarCheck size={40} />
          </div>
          <div className="absolute top-[35%] right-[15%] text-accent/30 animate-float animation-delay-3000">
            <ListTodo size={36} />
          </div>
          <div className="absolute bottom-[20%] left-[20%] text-olive-500/30 animate-float animation-delay-2000">
            <Check size={48} />
          </div>
          <div className="absolute bottom-[30%] right-[25%] text-secondary/40 animate-float animation-delay-4000">
            <Star size={32} />
          </div>
        </div>
        
        <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-olive-700 to-accent dark:from-olive-400 dark:to-accent flex items-center justify-center gap-2">
              <img src={Logo} width="100" height="50" />
              <span>ProcastinEater</span>
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center justify-center gap-2">
              Consume your tasks with delight
            </p>
          </div>
          
          <TaskManager />
        </main>
        
        <footer className="relative z-10 bg-white/30 dark:bg-black/30 backdrop-blur-sm py-6 border-t border-olive-200 dark:border-olive-800 rounded-t-3xl mt-4">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center gap-4 mb-3">
              <a href="https://github.com/mrdeeeeep" target="_blank" rel="noopener noreferrer" 
                className="p-2 bg-gradient-to-br from-olive-600 to-olive-700 hover:from-olive-500 hover:to-olive-600 text-white rounded-full transition-all hover:scale-110 shadow-md">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/deep-baro-863386239/" target="_blank" rel="noopener noreferrer" 
                className="p-2 bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-white rounded-full transition-all hover:scale-110 shadow-md">
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-sm text-olive-700 dark:text-olive-300">&copy; {new Date().getFullYear()} ProcastinEater. All tasks are stored locally in your browser.</p>
            <p className="text-xs text-olive-500 dark:text-olive-400 mt-1">Made with 💚 by Deeeeep™</p>
          </div>
        </footer>
      </div>
    </Provider>
  );
};

export default Index;
