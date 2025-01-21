const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
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
    check("title").notEmpty().trim().withMessage("Title is required"),
    check("description").optional().trim(),
    check("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean"),
  ],
  createTodo
);

// PUT /api/todos/:id
router.put(
  "/:id",
  [
    check("title").optional().trim(),
    check("description").optional().trim(),
    check("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean"),
  ],
  updateTodo
);

// DELETE /api/todos/:id
router.delete("/:id", deleteTodo);

module.exports = router;
