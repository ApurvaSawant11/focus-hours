import { useState, useContext, createContext } from "react";
import { Task } from "data";
import { ModalToggle, TaskModalCtxt } from "./taskContext.types";

const TaskModalContext = createContext<TaskModalCtxt>({
  initialTaskModalData: {
    _id: "",
    taskName: "",
    taskDescription: "",
    focusDuration: 25,
    breakDuration: 5,
  },
  taskModalData: {
    _id: "",
    taskName: "",
    taskDescription: "",
    focusDuration: 25,
    breakDuration: 5,
  },
  setTaskModalData: () => {},
  modalToggle: { displayModal: false, type: "" },
  setModalToggle: () => {},
});

const useTaskModal = () => useContext(TaskModalContext);

const TaskModalToggle = ({ children }: { children: React.ReactNode }) => {
  const initialModalToggle: ModalToggle = { displayModal: false, type: "" };

  const [modalToggle, setModalToggle] = useState(initialModalToggle);

  const initialTaskModalData: Task = {
    _id: "",
    taskName: "",
    taskDescription: "",
    focusDuration: 25,
    breakDuration: 5,
  };

  const [taskModalData, setTaskModalData] = useState(initialTaskModalData);

  return (
    <TaskModalContext.Provider
      value={{
        initialTaskModalData,
        taskModalData,
        setTaskModalData,
        modalToggle,
        setModalToggle,
      }}
    >
      {children}
    </TaskModalContext.Provider>
  );
};

export { useTaskModal, TaskModalToggle };
