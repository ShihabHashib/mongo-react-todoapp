import { motion } from "framer-motion";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <motion.li
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg"
    >
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(todo._id)}
        >
          <CheckCircleIcon
            className={`w-6 h-6 ${
              todo.completed ? "text-green-500" : "text-gray-400"
            }`}
          />
        </motion.button>
        <span
          className={`${
            todo.completed ? "line-through text-gray-400" : "text-gray-700"
          }`}
        >
          {todo.text}
        </span>
      </div>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onDelete(todo._id)}
        className="text-red-500"
      >
        <TrashIcon className="w-5 h-5" />
      </motion.button>
    </motion.li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
