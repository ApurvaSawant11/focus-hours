import "./tasks.css";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../../assets";

const Tasks = () => {
  const navigate = useNavigate();

  return (
    <main className="tasks-container">
      <section className="greetings">
        <h2>Welcome back, Apurva !</h2>
        <p>You have 3 tasks to complete.</p>
      </section>

      <section className="task-list-container">
        <div className="task-list-header flex-row width-100 ">
          <span>Tasks</span>
          <button className="add-task-btn btn"> + Add</button>
        </div>

        <div className="task-list width-100">
          <li
            className="task-item"
            onClick={() => {
              navigate(`/timer/1234`);
            }}
          >
            <p>Add testing to 1 project</p>

            <div className="task-actions">
              <button className="btn edit-btn">
                <EditIcon size={24} />
              </button>
              <button className="btn delete-btn">
                <DeleteIcon size={24} color="#f94242" />
              </button>
            </div>
          </li>

          <li className="task-item">
            <p>Add testing to 1 project</p>

            <div className="task-actions">
              <button className="btn edit-btn">
                <EditIcon size={24} />
              </button>
              <button className="btn delete-btn">
                <DeleteIcon size={24} color="#f94242" />
              </button>
            </div>
          </li>

          <li className="task-item">
            <p>Add testing to 1 project</p>

            <div className="task-actions">
              <button className="btn edit-btn">
                <EditIcon size={24} />
              </button>
              <button className="btn delete-btn">
                <DeleteIcon size={24} color="#f94242" />
              </button>
            </div>
          </li>
        </div>
      </section>
    </main>
  );
};

export { Tasks };
