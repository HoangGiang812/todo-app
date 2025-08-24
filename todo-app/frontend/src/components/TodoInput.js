import React, { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        placeholder="Add your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-r-full font-semibold"
      >
        ADD
      </button>
    </form>
  );
}
