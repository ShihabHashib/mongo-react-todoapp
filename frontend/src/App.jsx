import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import ErrorMessage from "./components/ErrorMessage";
import BackgroundAnimation from "./components/BackgroundAnimation";
import LoadingSpinner from "./components/LoadingSpinner";
import { useHttpClient } from "./hooks/useHttpClient";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchTodos = async () => {
      try {
        const data = await sendRequest("http://localhost:5000/api/todos");
        if (isActive) {
          setTodos(data);
        }
      } catch (err) {
        // Error is handled by the hook
      }
    };

    fetchTodos();

    return () => {
      isActive = false;
    };
  }, [sendRequest]);

  const handleAddTodo = async (newTodo) => {
    try {
      const data = await sendRequest(
        "http://localhost:5000/api/todos",
        "POST",
        JSON.stringify({ text: newTodo, completed: false }),
        {
          "Content-Type": "application/json",
        }
      );
      setTodos([...todos, data]);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const updatedTodo = await sendRequest(
        `http://localhost:5000/api/todos/${id}`,
        "PUT",
        JSON.stringify({ completed: !todo.completed }),
        {
          "Content-Type": "application/json",
        }
      );
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await sendRequest(`http://localhost:5000/api/todos/${id}`, "DELETE");
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden p-6">
        <ErrorMessage error={error || formError} onClose={clearError} />

        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Todo List
        </motion.h1>

        <TodoForm
          onAddTodo={handleAddTodo}
          setError={setFormError}
          todos={todos}
        />

        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="my-4"
            >
              <LoadingSpinner />
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && todos.length === 0 && (
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
