  import React, { useEffect, useState } from "react";
  import TodoList from "./components/TodoList";
  import TodoInput from "./components/TodoInput";
  import API from "./api"; 

  function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Lấy todo từ backend
    const fetchTodos = async () => {
      try {
        const res = await API.get("/");
        setTodos(res.data);
      } catch (err) {
        setError("Không thể tải danh sách công việc!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchTodos();
    }, []);

    // Thêm todo mới
    const addTodo = async (title) => {
      try {
        await API.post("/", { title });
        fetchTodos(); 
      } catch (err) {
        setError("Không thể thêm công việc mới!");
        console.error(err);
      }
    };
  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      await API.patch(`/${id}`, { completed: !todo.completed });
      fetchTodos(); 
    } catch (err) {
      setError("Không thể cập nhật công việc!");
      console.error(err);
    }
  };

    // Xóa todo
    const deleteTodo = async (id) => {
      try {
        await API.delete(`/${id}`);
        fetchTodos();
      } catch (err) {
        setError("Không thể xóa công việc!");
        console.error(err);
      }
    };

    return (
      <div className="bg-gradient-to-br from-indigo-900 via-red-600 to-yellow-400 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg w-[350px]">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            TODO-LIST
          </h1>

          {/* Input tách riêng */}
          <TodoInput onAdd={addTodo} />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {loading ? (
            <p className="text-center text-gray-500">Đang tải...</p>
          ) : (
            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
          )}
        </div>
      </div>
    );
  }

  export default App;
