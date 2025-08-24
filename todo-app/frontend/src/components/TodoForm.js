import React from "react";
import { X } from "lucide-react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between py-2 border-b border-gray-100">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onToggle(todo._id)}
      >
        <span
          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
            todo.completed ? "bg-red-500 border-red-500" : "border-gray-400"
          }`}
        >
          {todo.completed && (
            <span className="w-2 h-2 bg-white rounded-full"></span>
          )}
        </span>
        <span
          className={`text-gray-700 ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo._id)}
        className="text-gray-400 hover:text-red-500"
      >
        <X size={18} />
      </button>
    </li>
  );
}
