import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const API_URL = "/api/todos"; // backend URL

  // Fetch todos from backend safely
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      }
    };

    fetchData();
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
      });
      const createdTodo: Todo = await res.json();
      setTodos([...todos, createdTodo]);
      setNewTodo("");
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  // Toggle todo completed
  const toggleTodo = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}/toggle`, { method: "POST" });
      const updatedTodo: Todo = await res.json();
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>To-Do List</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTodo} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;