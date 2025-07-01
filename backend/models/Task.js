const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);




// This code defines a Mongoose schema for a "Task" model in a Node.js application.
// The schema includes two fields: "title" (a required string) and "completed"
// (a boolean that defaults to false). The schema also includes timestamps for
// creation and update times. Finally, the schema is exported as a Mongoose model named "Task".
// This model can be used to interact with a MongoDB collection of tasks, allowing for
// operations such as creating, reading, updating, and deleting tasks in the database.
// The `timestamps: true` option automatically adds `createdAt` and `updatedAt`
// fields to the documents, which can be useful for tracking when tasks were created and last modified