import "./taskTimer.css";

const TaskTimer = () => {
  return (
    <div className="task-timer-container flex-row">
      <section className="task-timer p-1">
        <div className="progress-ring">
          <div className="timer">
            <div id="time">
              <span id="minutes">00</span>
              <span id="colon">:</span>
              <span id="seconds">10</span>
            </div>
          </div>
        </div>
        <div className="timer-actions">
          <button className="btn start-btn">Start</button>

          {/* <div className="flex-row">
            <button className="btn pause-btn">Pause</button>
            <button className="btn reset-btn">Reset</button>
          </div> */}
        </div>
      </section>

      <section className="task-details">
        <div className="task-name">Task Name here</div>
        <div className="task-description">
          This is where the task description will go. Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Rem iure, hic porro quibusdam sint
          quam sapiente quia blanditiis beatae possimus, eveniet repellendus ea.
          Alias suscipit rerum eveniet perspiciatis illum omnis.
        </div>
      </section>
    </div>
  );
};

export { TaskTimer };
