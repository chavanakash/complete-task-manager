const express = require("express");
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;




// This code defines the routes for handling tasks in a Node.js application using Express.
// It imports the necessary modules and the task controller functions.
// The `router` object is created using `express.Router()` to define the routes.
// The routes are defined for the base path `/` to handle GET requests for retrieving tasks and POST requests for creating a new task.
// Additionally, routes are defined for specific task IDs (using `:id`) to handle PUT requests for updating a task and DELETE requests for deleting a task.
// Finally, the router is exported so it can be used in other parts of the application, such as in the main server file.
// This modular approach helps keep the code organized and maintainable, allowing for easy addition