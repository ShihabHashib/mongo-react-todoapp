const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const validateRequest = require("../middleware/validate-request");
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo-controller");

// GET /api/todos
router.get("/", getAllTodos);

// GET /api/todos/:id
router.get("/:id", getTodoById);

// POST /api/todos
router.post(
  "/",
  [
    check("text")
      .trim()
      .notEmpty()
      .withMessage("Please enter a todo item")
      .isLength({ min: 3 })
      .withMessage("Todo must be at least 3 characters long")
      .isLength({ max: 100 })
      .withMessage("Todo must be less than 100 characters")
      .matches(/^[\w\s.,!?()-]+$/i)
      .withMessage(
        "Todo can only contain letters, numbers, and basic punctuation"
      )
      .matches(/[a-zA-Z0-9]+/)
      .withMessage("Todo must contain at least one letter or number"),
  ],
  validateRequest,
  createTodo
);

// PUT /api/todos/:id
router.put(
  "/:id",
  [
    check("completed")
      .isBoolean()
      .withMessage("Completed must be a boolean value"),
  ],
  validateRequest,
  updateTodo
);

// DELETE /api/todos/:id
router.delete("/:id", deleteTodo);

module.exports = router;
