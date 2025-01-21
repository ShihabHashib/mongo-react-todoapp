const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Todo text is required"],
      trim: true,
      minlength: [3, "Todo must be at least 3 characters long"],
      maxlength: [100, "Todo must be less than 100 characters"],
      validate: {
        validator: function (value) {
          // Allow letters, numbers, spaces and basic punctuation
          return /^[\w\s.,!?()-]+$/i.test(value) && /[a-zA-Z0-9]+/.test(value); // Must contain at least one alphanumeric
        },
        message:
          "Todo can only contain letters, numbers, and basic punctuation",
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for faster queries
todoSchema.index({ userId: 1, completed: 1 });

// Middleware to prevent duplicate todos for the same user
todoSchema.pre("save", async function (next) {
  const Todo = this.constructor;
  const existingTodo = await Todo.findOne({
    userId: this.userId,
    text: this.text,
    _id: { $ne: this._id },
  });

  if (existingTodo) {
    next(new Error("A todo with this text already exists"));
  }
  next();
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
