import React from "react";
import { FaTrash } from "react-icons/fa";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between py-2 px-1 border-b border-gray-100">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onToggle(todo.id)}
      >
        <span
          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-200 ${
            todo.completed
              ? "bg-red-500 border-red-500"
              : "bg-white border-gray-400"
          }`}
        >
          {todo.completed && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        <span
          className={`text-gray-700 ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        <FaTrash />
      </button>
    </li>
  );
}
