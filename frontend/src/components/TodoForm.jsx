import { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const TodoForm = ({ onAddTodo, setError, todos }) => {
  const [newTodo, setNewTodo] = useState("");

  const validateTodo = (text) => {
    if (!text || !text.trim()) {
      return "Please enter a todo item";
    }

    const trimmedText = text.trim();

    if (trimmedText.length < 3) {
      return "Todo must be at least 3 characters long";
    }
    if (trimmedText.length > 100) {
      return "Todo must be less than 100 characters";
    }

    if (!/^[\w\s.,!?()-]+$/i.test(trimmedText)) {
      return "Todo can only contain letters, numbers, and basic punctuation";
    }

    if (
      todos.some(
        (todo) => todo.text.toLowerCase() === trimmedText.toLowerCase()
      )
    ) {
      return "This todo already exists";
    }

    if (!/[a-zA-Z0-9]+/.test(trimmedText)) {
      return "Todo must contain at least one letter or number";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateTodo(newTodo);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    onAddTodo(newTodo.trim());
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <motion.input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="w-5 h-5" />
          Add
        </motion.button>
      </div>
    </form>
  );
};

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TodoForm;
