import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css'; // Assuming you have some basic styling or will use Tailwind

interface TaskItem {
  id: string;
  description: string;
  isCompleted: boolean;
}

type Filter = 'all' | 'active' | 'completed';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const API_URL = 'http://localhost:5093/api/tasks';
  const LOCAL_STORAGE_KEY = 'react-task-manager-tasks';

  // Initial load: Try localStorage, then fetch from backend
  useEffect(() => {
    const loadInitialTasks = async () => {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        try {
          setTasks(JSON.parse(storedTasks));
        } catch (e) {
          console.error("Error parsing tasks from localStorage on initial load:", e);
          // If localStorage is corrupt, try fetching from backend
          await fetchTasks();
        }
      } else {
        await fetchTasks();
      }
    };
    loadInitialTasks();
  }, []);

  // Sync tasks state to localStorage
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data)); // Also update localStorage with backend data
    } catch (error) {
      console.warn("Error fetching tasks from backend. Using local data if available.", error);
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
    if (filter === 'active') {
      return !task.isCompleted;
    } else if (filter === 'completed') {
      return task.isCompleted;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Task Manager</h1>
        <AddTask onAddTask={handleAddTask} />
        <div className="flex justify-center mb-4 space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Completed
          </button>
        </div>
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default App;
