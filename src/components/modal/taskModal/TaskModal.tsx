import "./taskModal.css";
import { useTaskModal, useTaskData } from "context";

import { createTask, updateTask } from "services";
import { CREATE_TASK, UPDATE_TASK } from "data/constants";

const TaskModal = () => {
  const { taskModalData, setTaskModalData, modalToggle, setModalToggle } =
    useTaskModal();
  const { taskDataDispatch } = useTaskData();

  const addTaskHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createTaskResponse = await createTask(taskModalData);

    if (createTaskResponse && !("errorMessage" in createTaskResponse)) {
      taskDataDispatch({
        type: CREATE_TASK,
        payload: {
          ...taskModalData,
          _id: createTaskResponse[createTaskResponse.length - 1]._id,
        },
      });
      setModalToggle((modal) => ({ ...modal, displayModal: false }));
    }
  };

  const updateTaskHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateTaskResponse = await updateTask(taskModalData);

    if (updateTaskResponse && !("errorMessage" in updateTaskResponse)) {
      taskDataDispatch({ type: UPDATE_TASK, payload: taskModalData });
      setModalToggle((modal) => ({ ...modal, displayModal: false }));
    }
  };

  return (
    <div className="modal-container">
      <form
        className="form-wrapper"
        onSubmit={async (e) => {
          modalToggle.type === "add"
            ? await addTaskHandler(e)
            : await updateTaskHandler(e);
        }}
      >
        <h2 className="form-header">
          {modalToggle.type === "add" ? "New Task" : "Update Task"}
        </h2>
        <label>Task Name</label>
        <input
          type="text"
          placeholder="eg. Write a blog"
          className="input"
          value={taskModalData.taskName}
          onChange={(e) => {
            setTaskModalData((taskData) => ({
              ...taskData,
              taskName: e.target.value,
            }));
          }}
          required
        />

        <label>Task Description</label>
        <textarea
          rows={8}
          placeholder="eg. Research on xyz topic and write atleast 200 words"
          className="input"
          value={taskModalData.taskDescription}
          onChange={(e) => {
            setTaskModalData((taskData) => ({
              ...taskData,
              taskDescription: e.target.value,
            }));
          }}
          required
        />

        <label>
          Focus Duration <small className="gray-text">(in minutes)</small>
        </label>
        <input
          type="number"
          placeholder="Focus Duration"
          className="input"
          value={taskModalData.focusDuration.toString()}
          onChange={(e) =>
            setTaskModalData((taskData) => ({
              ...taskData,
              focusDuration: parseInt(e.target.value),
            }))
          }
          required
        />
        <label>
          Break Duration <small className="gray-text">(in minutes)</small>
        </label>
        <input
          type="number"
          placeholder="Break time"
          className="input"
          value={taskModalData.breakDuration.toString()}
          onChange={(e) =>
            setTaskModalData((taskData) => ({
              ...taskData,
              breakDuration: parseInt(e.target.value),
            }))
          }
          required
        />

        <div className="modal-actions flex-row">
          <label></label>
          <input
            type="button"
            value="Cancel"
            className="btn cancel-btn"
            onClick={() =>
              setModalToggle((modal) => ({ ...modal, displayModal: false }))
            }
          />
          {modalToggle.type === "add" ? (
            <input type="submit" value="ADD" className="btn add-task-btn" />
          ) : (
            <input type="submit" value="UPDATE" className="btn add-task-btn" />
          )}
        </div>
      </form>
    </div>
  );
};

export { TaskModal };
