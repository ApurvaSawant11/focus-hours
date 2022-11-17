import axios from "axios";
import { Task } from "types";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (axios.isAxiosError(error)) {
    return error.response?.data?.errors[0] as string;
  }
  return String(error);
};

// Get all the tasks of the user
const getTaskData = async (): Promise<
  Task[] | { errorMessage: string } | undefined
> => {
  try {
    const response = await axios.get("/api/tasks");
    if (response.status === 200) {
      return response.data.tasks;
    }
  } catch (err) {
    console.log("Error in getTaskData service", getErrorMessage(err));
    return { errorMessage: getErrorMessage(err) };
  }
};

// Create new task
const createTask = async (
  task: Task
): Promise<Task[] | { errorMessage: string } | undefined> => {
  try {
    const response = await axios.post("/api/tasks", task);
    if (response.status === 201) {
      return response.data.tasks;
    }
  } catch (error) {
    console.log("Error in createTask service", getErrorMessage(error));
    return { errorMessage: getErrorMessage(error) };
  }
};

// Update task
const updateTask = async (
  task: Task
): Promise<Task[] | { errorMessage: string } | undefined> => {
  try {
    const response = await axios.post(`/api/tasks/${task._id}`, task);
    if (response.status === 201) {
      return response.data.tasks;
    }
  } catch (error) {
    console.log("Error in updateTask service", getErrorMessage(error));
    return { errorMessage: getErrorMessage(error) };
  }
};

// Delete task
const deleteTask = async (
  taskId: string
): Promise<Task[] | { errorMessage: string } | undefined> => {
  try {
    const response = await axios.delete(`/api/tasks/${taskId}`);
    if (response.status === 200) {
      return response.data.tasks;
    }
  } catch (error) {
    console.log("Error in deleteTask service", getErrorMessage(error));
    return { errorMessage: getErrorMessage(error) };
  }
};

export { getTaskData, createTask, updateTask, deleteTask };
