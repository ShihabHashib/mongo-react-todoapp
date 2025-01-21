import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <motion.ul className="space-y-3">
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
