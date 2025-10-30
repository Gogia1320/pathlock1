import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css';

interface TaskItem {
  id: string;
  description: string;
  isCompleted: boolean;
}

type Filter = 'all' | 'active' | 'completed';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = 'http://localhost:5093/api/tasks';
  const LOCAL_STORAGE_KEY = 'react-task-manager-tasks';

  useEffect(() => {
    const loadInitialTasks = async () => {
      setIsLoading(true);
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        try {
          setTasks(JSON.parse(storedTasks));
        } catch (e) {
          console.error("Error parsing tasks from localStorage:", e);
          await fetchTasks();
        }
      } else {
        await fetchTasks();
      }
      setIsLoading(false);
    };
    loadInitialTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<TaskItem[]>(API_URL);
      setTasks(response.data);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
    } catch (error) {
      console.warn("Error fetching tasks from backend:", error);
    }
  };

  const handleAddTask = async (description: string) => {
    try {
      const response = await axios.post<TaskItem>(API_URL, { description, isCompleted: false });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      try {
        const updatedTask = { ...taskToUpdate, isCompleted: !taskToUpdate.isCompleted };
        await axios.put(`${API_URL}/${id}`, updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
      } catch (error) {
        console.error("Error toggling task completion:", error);
      }
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  const completedCount = tasks.filter(task => task.isCompleted).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="bg-gray-900/70 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl w-full max-w-md relative z-10 neon-glow">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg mr-3 transform rotate-12"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Task Manager
            </h1>
          </div>
          <p className="text-gray-400 text-sm">Manage your tasks in style</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/30">
            <div className="text-2xl font-bold text-cyan-400">{totalCount}</div>
            <div className="text-xs text-gray-400">Total Tasks</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/30">
            <div className="text-2xl font-bold text-purple-400">{completedCount}</div>
            <div className="text-xs text-gray-400">Completed</div>
          </div>
        </div>

        <AddTask onAddTask={handleAddTask} />

        {/* Filter Buttons */}
        <div className="flex justify-center mb-6 space-x-2 bg-gray-800/30 rounded-2xl p-1">
          {(['all', 'active', 'completed'] as Filter[]).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === filterType
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="text-xs text-gray-500">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} shown
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;