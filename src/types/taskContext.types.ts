import { Task, TaskAction } from "types";

export type TaskContext = {
  taskData: Task[];
  taskDataDispatch: React.Dispatch<TaskAction>;
  getTaskById: (taskId: string) => Task | undefined;
};

export type ModalToggle = { displayModal: boolean; type: string };

export type TaskModalCtxt = {
  initialTaskModalData: Task;
  taskModalData: Task;
  setTaskModalData: React.Dispatch<React.SetStateAction<Task>>;
  modalToggle: ModalToggle;
  setModalToggle: React.Dispatch<React.SetStateAction<ModalToggle>>;
};
