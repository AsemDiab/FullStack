import { AppDataSource } from "../../config/AppDataSource.ts";
import { User } from "../Entities/User.ts";

const userRepository = AppDataSource.getRepository(User);

export async function getAllUsers(): Promise<User[]> {
  return await userRepository.find();
}

export async function getUserById(id: string): Promise<User | null> {
  return await userRepository.findOne({ where: { id } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await userRepository.findOne({ where: { email } });
}

export async function createUser(
  email: string,
  password: string,
): Promise<User> {
  const user = userRepository.create({
    email,
    password_hash: password,
  });
  return await userRepository.save(user);
}

export async function deleteUserById(id: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { id } });
  if (user) {
    await userRepository.remove(user);
  }
  return user;
}
