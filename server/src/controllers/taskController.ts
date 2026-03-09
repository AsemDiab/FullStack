import { Request, Response } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById,
  getTasksByStatus,
  clearAllTasks,
  clearCompletedTasks,
} from "../database/mutations/taskServices.ts";

export async function getAllTasksController(req: Request, res: Response) {
  try {
    const userId = req.params.user_id;
    const userIdStr = Array.isArray(userId) ? userId[0] : userId;
    const tasks = await getAllTasks(userIdStr);
    return res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving tasks",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getTaskByIdController(req: Request, res: Response) {
  try {
    const { task_id } = req.params;
    const userId = req.params.user_id;
    const taskId = Array.isArray(task_id) ? task_id[0] : task_id;
    const userIdStr = Array.isArray(userId) ? userId[0] : userId;
    const task = await getTaskById(taskId, userIdStr);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function createTaskController(req: Request, res: Response) {
  try {
    console.log("Creating task:", req.body);
    console.log("User ID:", req.params.user_id);
    const { content, status } = req.body;
    const userId = req.params.user_id;
    const userIdStr = Array.isArray(userId) ? userId[0] : userId;

    if (!content) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const task = await createTask(content, userIdStr, status);
    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateTaskController(req: Request, res: Response) {
  try {
    const { task_id } = req.params;
    const userId = req.params.user_id;
    const taskId = Array.isArray(task_id) ? task_id[0] : task_id;
    const userIdStr = Array.isArray(userId) ? userId[0] : userId;
    const { content, status } = req.body;

    const task = await updateTask(taskId, userIdStr, content, status);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function deleteTaskController(req: Request, res: Response) {
  try {
    const { task_id } = req.params;
    const userId = req.params.user_id;
    const taskId = Array.isArray(task_id) ? task_id[0] : task_id;
    const userIdStr = Array.isArray(userId) ? userId[0] : userId;
    const task = await deleteTaskById(taskId, userIdStr);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getTasksByStatusController(req: Request, res: Response) {
  try {
    const { status } = req.params;
    const userId = req.params.user_id;
    const isCompleted = status === "completed" || status === "true";

    const tasks = await getTasksByStatus(isCompleted, userId);
    return res.status(200).json({
      message: `Tasks retrieved successfully for status: ${status}`,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving tasks by status",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function clearAllTasksController(req: Request, res: Response) {
  try {
    const userId = req.params.user_id;
    const userIdStr = Array.isArray(userId) ? userId[0] : userId;
    await clearAllTasks(userIdStr);
    return res.status(200).json({
      message: "All tasks cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error clearing all tasks",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function clearCompletedTasksController(
  req: Request,
  res: Response,
) {
  try {
    const userId = req.params.user_id;
    const userIdStr = Array.isArray(userId) ? userId[0] : userId;
    console.log("Clearing completed tasks for user:", userIdStr);
    await clearCompletedTasks(userIdStr);
    return res.status(200).json({
      message: "Completed tasks cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error clearing completed tasks",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
