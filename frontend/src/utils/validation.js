export const validateTodo = (text, todos) => {
  // Empty check
  if (!text || !text.trim()) {
    throw new Error("Please enter a todo item");
  }

  const trimmedText = text.trim();

  // Length checks
  if (trimmedText.length < 3) {
    throw new Error("Todo must be at least 3 characters long");
  }
  if (trimmedText.length > 100) {
    throw new Error("Todo must be less than 100 characters");
  }

  // Character validation
  if (!/^[\w\s.,!?()-]+$/i.test(trimmedText)) {
    throw new Error(
      "Todo can only contain letters, numbers, and basic punctuation"
    );
  }

  // Duplicate check
  if (
    todos.some((todo) => todo.text.toLowerCase() === trimmedText.toLowerCase())
  ) {
    throw new Error("This todo already exists");
  }

  // Content check
  if (!/[a-zA-Z0-9]+/.test(trimmedText)) {
    throw new Error("Todo must contain at least one letter or number");
  }

  return trimmedText;
};
