import "./taskTimer.css";
import { useTaskData } from "context";
import { useParams } from "react-router-dom";
import { Timer } from "components";

const TaskTimer = () => {
  const { getTaskById } = useTaskData();
  const { id } = useParams();
  const taskId = id ?? "";
  const taskData = getTaskById(taskId);

  return (
    <div className="task-timer-container flex-row">
      {!taskData && <div className="task-not-found">No tasks found</div>}
      {taskData && (
        <>
          <Timer taskData={taskData} />

          <section className="task-details">
            <div className="task-name">{taskData.taskName}</div>
            <div className="task-description">{taskData.taskDescription}</div>
          </section>
        </>
      )}
    </div>
  );
};

export { TaskTimer };
