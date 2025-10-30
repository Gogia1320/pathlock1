import React, { useState } from 'react';

interface TaskItemProps {
  task: { id: string; description: string; isCompleted: boolean };
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group flex items-center justify-between p-4 mb-3 rounded-2xl border border-gray-700/50 backdrop-blur-sm transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl ${
        task.isCompleted 
          ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20' 
          : 'bg-gray-800/30 hover:bg-gray-700/40'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-3 flex-grow">
        {/* Custom Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`relative w-6 h-6 rounded-lg border-2 transition-all duration-300 flex-shrink-0 ${
            task.isCompleted
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-transparent'
              : 'border-gray-600 hover:border-cyan-500'
          }`}
        >
          {task.isCompleted && (
            <svg className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Task Text */}
        <span className={`transition-all duration-300 ${
          task.isCompleted 
            ? 'text-gray-500 line-through' 
            : 'text-white group-hover:text-cyan-100'
        }`}>
          {task.description}
        </span>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className={`p-2 rounded-xl transition-all duration-300 transform ${
          isHovered 
            ? 'opacity-100 scale-100 bg-red-500/20 text-red-400 hover:bg-red-500/30' 
            : 'opacity-0 scale-90'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default TaskItem;