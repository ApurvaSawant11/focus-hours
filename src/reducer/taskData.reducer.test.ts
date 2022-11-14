import { initialTaskData } from "context";
import { taskDataReducer } from "./taskData.reducer";

import { TaskState, TaskAction } from "data";
import {
  GET_TASK_DATA,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from "data/constants";

describe("test task actions", () => {
  it("should save tasks created by the user", () => {
    const action: TaskAction = {
      type: GET_TASK_DATA,
      payload: [
        {
          _id: "1",
          taskName: "Add Unit tests",
          taskDescription: "Adding unit tests using jest",
          focusDuration: 25,
          breakDuration: 10,
        },
        {
          _id: "2",
          taskName: "Add task 2",
          taskDescription: "Add task 2 description",
          focusDuration: 15,
          breakDuration: 25,
        },
      ],
    };

    const state: TaskState = taskDataReducer(initialTaskData, action);

    expect(state).toEqual([
      {
        _id: "1",
        taskName: "Add Unit tests",
        taskDescription: "Adding unit tests using jest",
        focusDuration: 25,
        breakDuration: 10,
      },
      {
        _id: "2",
        taskName: "Add task 2",
        taskDescription: "Add task 2 description",
        focusDuration: 15,
        breakDuration: 25,
      },
    ]);
  });

  it("should add a new task", () => {
    const initialTaskState: TaskState = [
      {
        _id: "1",
        taskName: "Add Unit tests",
        taskDescription: "Adding unit tests using jest",
        focusDuration: 25,
        breakDuration: 10,
      },
    ];

    const action: TaskAction = {
      type: CREATE_TASK,
      payload: {
        _id: "3",
        taskName: "New Task Name",
        taskDescription: "New task description",
        focusDuration: 40,
        breakDuration: 20,
      },
    };

    const state: TaskState = taskDataReducer(initialTaskState, action);

    expect(state).toEqual([
      ...initialTaskState,
      {
        _id: "3",
        taskName: "New Task Name",
        taskDescription: "New task description",
        focusDuration: 40,
        breakDuration: 20,
      },
    ]);
  });

  it("should delete a task", () => {
    const initialTaskState: TaskState = [
      {
        _id: "1",
        taskName: "Add Unit tests",
        taskDescription: "Adding unit tests using jest",
        focusDuration: 25,
        breakDuration: 10,
      },
    ];

    const action: TaskAction = {
      type: DELETE_TASK,
      payload: {
        _id: "1",
        taskName: "Add Unit tests",
        taskDescription: "Adding unit tests using jest",
        focusDuration: 25,
        breakDuration: 10,
      },
    };

    const state: TaskState = taskDataReducer(initialTaskState, action);

    expect(state).toEqual([]);
  });

  it("should update the selected task", () => {
    const initialTaskState: TaskState = [
      {
        _id: "1",
        taskName: "Add Unit tests",
        taskDescription: "Adding unit tests using jest",
        focusDuration: 25,
        breakDuration: 10,
      },
    ];

    const action: TaskAction = {
      type: UPDATE_TASK,
      payload: {
        _id: "1",
        taskName: "Updated Task Name",
        taskDescription: "Updated Task Description",
        focusDuration: 55,
        breakDuration: 20,
      },
    };

    const state: TaskState = taskDataReducer(initialTaskState, action);

    expect(state).toEqual([
      {
        _id: "1",
        taskName: "Updated Task Name",
        taskDescription: "Updated Task Description",
        focusDuration: 55,
        breakDuration: 20,
      },
    ]);
  });

  it("should preserve the initial state in case of default", () => {
    const initialTaskState: TaskState = [
      {
        _id: "1",
        taskName: "Add Unit tests",
        taskDescription: "Adding unit tests using jest",
        focusDuration: 25,
        breakDuration: 60,
      },
    ];

    const action: TaskAction = {
      type: "DEFAULT",
    };

    const state: TaskState = taskDataReducer(initialTaskState, action);

    expect(state).toEqual([...initialTaskState]);
  });
});
