import React from 'react';

interface TaskItemProps {
  task: { id: string; description: string; isCompleted: boolean };
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleComplete(task.id)}
          className="mr-2"
        />
        <span className={task.isCompleted ? 'line-through text-gray-500' : ''}>
          {task.description}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
