import "./tasks.css";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "assets";
import { useTaskData, useTaskModal } from "context";
import { TaskModal } from "components";
import { deleteTask } from "services";
import { DELETE_TASK } from "data/constants";

const Tasks = () => {
  const navigate = useNavigate();
  const {
    initialTaskModalData,
    setTaskModalData,
    modalToggle,
    setModalToggle,
  } = useTaskModal();
  const { taskData, taskDataDispatch, getTaskById } = useTaskData();

  return (
    <main className="tasks-container">
      <section className="greetings">
        <h2>Welcome back, Apurva !</h2>
        <p>You have {taskData.length} tasks to complete.</p>
      </section>

      <section className="task-list-container">
        <div className="task-list-header flex-row width-100 ">
          <span>Tasks</span>
          <button
            className="add-task-btn btn"
            onClick={() => {
              setModalToggle((modal) => ({
                ...modal,
                displayModal: true,
                type: "add",
              }));
              setTaskModalData({ ...initialTaskModalData });
            }}
          >
            {" "}
            + Add
          </button>
        </div>

        <ul className="task-list width-100">
          {taskData.length === 0 && (
            <div className="text-center p-1">
              You don't have any tasks pending!
            </div>
          )}

          {taskData.map((task) => {
            return (
              <li
                key={task._id}
                className="task-item"
                onClick={() => {
                  navigate(`/timer/${task._id}`);
                }}
              >
                <p>{task.taskName}</p>

                <div className="task-actions">
                  <button
                    className="btn edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalToggle((modal) => ({
                        ...modal,
                        displayModal: true,
                        type: "update",
                      }));
                      const taskData = getTaskById(task._id);

                      if (taskData) {
                        setTaskModalData({ ...taskData });
                      }
                    }}
                  >
                    <EditIcon size={24} />
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={async (e) => {
                      e.stopPropagation();
                      taskDataDispatch({ type: DELETE_TASK, payload: task });
                      await deleteTask(task._id);
                    }}
                  >
                    <DeleteIcon size={24} color="#f94242" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {modalToggle.displayModal ? <TaskModal /> : <></>}
    </main>
  );
};

export { Tasks };
