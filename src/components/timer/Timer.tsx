import "./timer.css";
import { Task } from "data";

const Timer = ({ taskData }: { taskData: Task }) => {
  const { focusDuration } = taskData;

  return (
    <>
      {taskData && (
        <>
          <section className="task-timer p-1">
            <div className="progress-ring">
              <div className="timer">
                <div id="time">
                  <span>{focusDuration}:00</span>
                </div>
              </div>
            </div>
            <div className="timer-actions">
              <button className="btn start-btn">Start</button>

              <div className="flex-row">
                <button className="btn pause-btn">Pause</button>
                <button className="btn reset-btn">Reset</button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export { Timer };
