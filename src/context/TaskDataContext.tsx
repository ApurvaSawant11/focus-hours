import { useReducer, useEffect, useContext, createContext } from "react";
import { GET_TASK_DATA } from "types/constants";
import { getTaskData } from "services";
import { taskDataReducer } from "reducer/taskData.reducer";
import { TaskState } from "types";
import { TaskContext } from "types";

const TaskDataContext = createContext<TaskContext>({
  taskData: [],
  taskDataDispatch: () => {},
  getTaskById: (taskId: string) => undefined,
});

const useTaskData = () => useContext(TaskDataContext);

const initialTaskData: TaskState = [];

const TaskDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [taskData, taskDataDispatch] = useReducer(
    taskDataReducer,
    initialTaskData
  );

  const getTaskById = (taskId: string) => {
    return taskData.find((task: any) => task._id === taskId);
  };

  useEffect(() => {
    const initializeTaskData = async () => {
      const taskData = await getTaskData();

      if (taskData && !("errorMessage" in taskData)) {
        taskDataDispatch({ type: GET_TASK_DATA, payload: taskData });
      }
    };
    initializeTaskData();
  }, []);

  return (
    <TaskDataContext.Provider
      value={{ taskData, taskDataDispatch, getTaskById }}
    >
      {children}
    </TaskDataContext.Provider>
  );
};

export { initialTaskData };
export { useTaskData, TaskDataProvider };
