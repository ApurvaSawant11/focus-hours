import { initialTaskData } from "context";

import { TaskState, TaskAction } from "data";
import {
  GET_TASK_DATA,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from "data/constants";

const taskDataReducer = (
  state: TaskState = initialTaskData,
  action: TaskAction
) => {
  switch (action.type) {
    case GET_TASK_DATA:
      return [...state, ...action.payload];

    case CREATE_TASK:
      return [...state, action.payload];

    case UPDATE_TASK:
      return [
        ...state.reduce(
          (taskData, currentTask) =>
            currentTask._id === action.payload._id
              ? [...taskData, { ...action.payload }]
              : [...taskData, currentTask],
          initialTaskData
        ),
      ];

    case DELETE_TASK:
      return [...state.filter((task) => task._id !== action.payload._id)];

    default:
      return [...state];
  }
};

export { taskDataReducer };
