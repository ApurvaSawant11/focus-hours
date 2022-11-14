import axios from "axios";
import { getTaskData, createTask, updateTask, deleteTask } from "services";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

// Arrange Act Assert

describe("Get Task Service", () => {
  it("should return user's tasks", async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: {
        tasks: [
          {
            _id: "1",
            taskName: "Add Unit tests",
            taskDescription: "Adding unit tests using jest",
            focusDuration: 25,
            breakDuration: 5,
          },
        ],
      },
    });

    const tasks = await getTaskData();

    expect(tasks).toEqual([
      {
        _id: "1",
        taskName: "Add Unit tests",
        taskDescription: "Adding unit tests using jest",
        focusDuration: 25,
        breakDuration: 5,
      },
    ]);
  });

  it("should return error message when API call fails", async () => {
    mockedAxios.get.mockRejectedValue({
      isAxiosError: true,
      response: { data: { errors: ["Couldn't fetch tasks"] } },
    });
    mockedAxios.isAxiosError.mockImplementation((payload) => true);

    const tasks = await getTaskData();

    expect(tasks).toEqual({ errorMessage: "Couldn't fetch tasks" });
    expect(axios.isAxiosError).toBeCalledTimes(2);
  });
});

describe("Create Task Service", () => {
  const newTask = {
    _id: "1",
    taskName: "Add Unit tests",
    taskDescription: "Adding unit tests using jest",
    focusDuration: 25,
    breakDuration: 5,
  };

  it("should create a task", async () => {
    mockedAxios.post.mockResolvedValue({
      status: 201,
      data: { tasks: [{ ...newTask }] },
    });
    const tasks = await createTask(newTask);

    expect(tasks).toEqual([
      {
        ...newTask,
      },
    ]);
  });

  it("should return error message when API call fails", async () => {
    mockedAxios.post.mockRejectedValue({
      isAxiosError: true,
      response: { data: { errors: ["Couldn't create a task"] } },
    });
    mockedAxios.isAxiosError.mockImplementation((payload) => true);

    const tasks = await createTask(newTask);

    expect(tasks).toEqual({ errorMessage: "Couldn't create a task" });
  });
});

describe("Update Task Service", () => {
  const updatedTask = {
    _id: "1",
    taskName: "Add Unit tests",
    taskDescription: "Adding unit tests using jest",
    focusDuration: 25,
    breakDuration: 5,
  };

  it("should update task", async () => {
    mockedAxios.post.mockResolvedValue({
      status: 201,
      data: { tasks: [{ ...updatedTask }] },
    });
    const tasks = await updateTask(updatedTask);

    expect(tasks).toEqual([
      {
        ...updatedTask,
      },
    ]);
  });

  it("should return error message when API call fails", async () => {
    mockedAxios.post.mockRejectedValue({
      isAxiosError: true,
      response: { data: { errors: ["Couldn't update task"] } },
    });
    mockedAxios.isAxiosError.mockImplementation((payload) => true);

    const tasks = await updateTask(updatedTask);

    expect(tasks).toEqual({ errorMessage: "Couldn't update task" });
  });
});

describe("Delete Task Service", () => {
  it("should delete a task", async () => {
    mockedAxios.delete.mockResolvedValue({ status: 200, data: { tasks: [] } });

    const tasks = await deleteTask("1");

    expect(tasks).toEqual([]);
  });

  it("should return error message when API call fails", async () => {
    mockedAxios.delete.mockRejectedValue({
      isAxiosError: true,
      response: { data: { errors: ["Couldn't delete task"] } },
    });
    mockedAxios.isAxiosError.mockImplementation((payload) => true);

    const tasks = await deleteTask("1");

    expect(tasks).toEqual({ errorMessage: "Couldn't delete task" });
  });
});
