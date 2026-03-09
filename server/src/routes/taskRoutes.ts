import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
  clearAllTasksController,
  clearCompletedTasksController,
} from "../controllers/taskController.ts";
import { verifyToken } from "../middleware/verifyToken.ts";
import { authorizeOwnership } from "../middleware/authorizeOwnership.ts";
import { validateCreateTask } from "../middleware/validateCreateTaskInput.ts";
import { validateUpdateTask } from "../middleware/validateUpdateTask.ts";

export const TaskRouter = Router({ mergeParams: true });

TaskRouter.use(verifyToken);
// TaskRouter.use(authorizeOwnership);

TaskRouter.get("/", getAllTasksController);
TaskRouter.get("/:task_id", getTaskByIdController);
TaskRouter.post("/", validateCreateTask, createTaskController);
TaskRouter.delete("/clearAll", clearAllTasksController);
TaskRouter.delete("/clearCompleted", clearCompletedTasksController);
TaskRouter.delete("/:task_id", deleteTaskController);
TaskRouter.patch("/:task_id", validateUpdateTask, updateTaskController);
