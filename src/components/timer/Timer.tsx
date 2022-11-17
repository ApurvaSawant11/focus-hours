import "./timer.css";
import { useState, useCallback, useEffect } from "react";
import { useDocumentTitle, useInterval } from "hooks";
import { secondsToMinutes } from "utils";

const Timer = ({ taskData }: { taskData: any }) => {
  const { focusDuration, breakDuration } = taskData;
  const [currentTime, setCurrentTime] = useState(focusDuration * 60);
  const [timeCounting, setTimeCounting] = useState(false);
  const [activity, setActivity] = useState({ working: false, resting: false });
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState({
    start: focusDuration * 60,
    end: 1,
  });
  const [conicGradient, setConicGradient] = useState("");
  let degTravel: any = 360 / progress.end;

  useDocumentTitle(secondsToMinutes(currentTime), taskData.taskName);

  useInterval(
    () => {
      setCurrentTime(currentTime - 1);

      setProgress((prev) => ({ ...prev, start: prev.start + 1 }));

      setConicGradient(
        `conic-gradient( ${activity.working ? "#161d6F" : "#2ccf2a"} ${
          progress.start * degTravel
        }deg,#ffffff ${progress.start * degTravel}deg)`
      );

      if (progress.start === progress.end) {
        setConicGradient(`conic-gradient(
            #ffffff 360deg,
            #ffffff 360deg
          )`);
        setProgress({ ...progress, start: 1 });
      }
    },
    timeCounting ? 1000 : null
  );

  const configureWork = useCallback(
    (cycleCompleted: boolean) => {
      setCurrentTime(focusDuration * 60);
      setProgress({ start: 1, end: focusDuration * 60 });
      if (cycleCompleted) {
        setTimeCounting(false);
        setActivity({ working: false, resting: false });
        setStatus("");
      } else {
        setTimeCounting(true);
        setActivity({ working: true, resting: false });
        setStatus("Focus");
      }
    },
    [
      setTimeCounting,
      setActivity,
      setCurrentTime,
      setStatus,
      setProgress,
      focusDuration,
    ]
  );

  const configureRest = useCallback(() => {
    setTimeCounting(true);
    setActivity({ working: false, resting: true });
    setStatus("Rest");
    setCurrentTime(breakDuration * 60);
    setProgress({ start: 1, end: breakDuration * 60 });
  }, [
    setTimeCounting,
    setActivity,
    setCurrentTime,
    setStatus,
    setProgress,
    breakDuration,
  ]);

  useEffect(() => {
    if (currentTime > 0) return;
    if (activity.working) configureRest();
    if (activity.resting) configureWork(true);
  }, [
    activity.working,
    activity.resting,
    currentTime,
    configureRest,
    configureWork,
    progress.start,
  ]);

  return (
    <>
      {taskData && (
        <>
          <section className="task-timer p-1">
            <div className="status">
              {status === "" ? "Ready to Focus???" : status}
            </div>
            <div
              className="progress-ring"
              style={{ background: conicGradient }}
            >
              <div className="timer">
                <div id="time">
                  <span>{secondsToMinutes(currentTime)}</span>
                </div>
                <span>{status === "" ? "" : `${status}ing`}</span>
              </div>
            </div>
            <div className="timer-actions">
              {!timeCounting &&
                (!activity.working && !activity.resting ? (
                  <button
                    className="btn start-btn"
                    onClick={() => configureWork(false)}
                  >
                    Start
                  </button>
                ) : (
                  <></>
                ))}

              {(activity.working || activity.resting) && (
                <div className="flex-row">
                  <button
                    className="btn pause-btn"
                    onClick={() => setTimeCounting(!timeCounting)}
                  >
                    {timeCounting ? "Pause" : "Resume"}
                  </button>
                  <button
                    className="btn reset-btn"
                    onClick={() => {
                      activity.working ? configureWork(false) : configureRest();
                    }}
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export { Timer };
