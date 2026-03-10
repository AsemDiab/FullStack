import { AppDataSource } from "../../config/AppDataSource.ts";
import { Task } from "../Entities/Task.ts";
import { User } from "../Entities/User.ts";

const taskRepository = AppDataSource.getRepository(Task);

export async function getAllTasks(
  ownerId: string,
  skip: number,
  take: number,
): Promise<Task[]> {
  return await taskRepository.find({
    where: { user: { id: ownerId } },
    skip,
    take,
  });
}

export async function getTaskById(
  id: string,
  ownerId: string,
): Promise<Task | null> {
  return await taskRepository.findOne({ where: { id, user: { id: ownerId } } });
}

export async function createTask(
  content: string,
  ownerId: string,
  status: boolean = false,
): Promise<Task> {
  const user: User = (await AppDataSource.getRepository(User).findOne({
    where: { id: ownerId },
  })) as User;

  const task = taskRepository.create({
    content,
    status,
    user,
  });

  console.log("Creating task:", task);
  return await taskRepository.save(task);
}

export async function updateTask(
  id: string,
  ownerId: string,
  content?: string,
  status?: boolean,
): Promise<Task | null> {
  const task = await taskRepository.findOne({
    where: { id, user: { id: ownerId } },
  });
  if (task) {
    if (content !== undefined) task.content = content;
    if (status !== undefined) task.status = status;
    return await taskRepository.save(task);
  }
  return null;
}

export async function deleteTaskById(
  id: string,
  ownerId: string,
): Promise<Task | null> {
  const task = await taskRepository.findOne({
    where: { id, user: { id: ownerId } },
  });
  if (task) {
    await taskRepository.remove(task);
  }
  return task;
}

export async function getTasksByStatus(
  status: boolean,
  ownerId: string,
): Promise<Task[]> {
  return await taskRepository.find({
    where: { status, user: { id: ownerId } },
  });
}

export async function clearAllTasks(ownerId: string): Promise<void> {
  await taskRepository.delete({ user: { id: ownerId } });
}

export async function clearCompletedTasks(ownerId: string): Promise<void> {
  await taskRepository.delete({ status: true, user: { id: ownerId } });
}

export async function getTaskCount(ownerId: string): Promise<number> {
  return await taskRepository.count({
    where: { user: { id: ownerId } },
  });
}
