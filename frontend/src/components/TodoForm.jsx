import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { validateTodo } from "../utils/validation";

const TodoForm = ({ onAddTodo, setError: setGlobalError, todos }) => {
  const [newTodo, setNewTodo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedTodo = validateTodo(newTodo, todos);
      await onAddTodo(validatedTodo);
      setNewTodo("");
      setLocalError("");
      setGlobalError("");
    } catch (err) {
      setLocalError(err.message);
      setGlobalError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <motion.input
          type="text"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
            setLocalError("");
            setGlobalError("");
          }}
          placeholder="Add a new todo..."
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none ${
            localError
              ? "border-red-500"
              : "border-gray-300 focus:border-purple-500"
          }`}
          whileFocus={{ scale: 1.02 }}
          disabled={isSubmitting}
        />
        <motion.button
          type="submit"
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            isSubmitting
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          } text-white transition-colors`}
          whileHover={!isSubmitting ? { scale: 1.05 } : {}}
          whileTap={!isSubmitting ? { scale: 0.95 } : {}}
          disabled={isSubmitting}
        >
          <PlusIcon className="w-5 h-5" />
          {isSubmitting ? "Adding..." : "Add"}
        </motion.button>
      </div>
      <AnimatePresence>
        {newTodo.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-sm"
          >
            <span
              className={`${
                newTodo.length > 100 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {newTodo.length}/100 characters
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TodoForm;
