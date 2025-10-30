import React, { useState } from 'react';

interface AddTaskProps {
  onAddTask: (description: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAddTask(description);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new task"
        className="flex-grow p-2 border border-gray-300 rounded-l"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
