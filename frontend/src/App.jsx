import { useState } from "react";
import { motion } from "framer-motion";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import ErrorMessage from "./components/ErrorMessage";
import BackgroundAnimation from "./components/BackgroundAnimation";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden p-6">
        <ErrorMessage error={error} />

        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Todo List
        </motion.h1>

        <TodoForm onAddTodo={handleAddTodo} setError={setError} todos={todos} />

        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />

        {todos.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-6"
          >
            No todos yet. Add some tasks!
          </motion.p>
        )}
      </div>

      <BackgroundAnimation />
    </motion.div>
  );
}

export default App;
