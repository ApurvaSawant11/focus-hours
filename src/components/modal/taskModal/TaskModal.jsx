import "./taskModal.css";

const TaskModal = () => {
  return (
    <div className="modal-container">
      <div className="form-wrapper">
        <input type="text" placeholder="Task name" className="input" />

        <textarea rows={10} placeholder="Description" className="input" />

        <input type="number" placeholder="Focus time" className="input" />
        <input type="number" placeholder="Break time" className="input" />

        <div className="modal-actions flex-row">
          <button className="btn">Cancel</button>
          <button className="btn">Add</button>
        </div>
      </div>
    </div>
  );
};

export { TaskModal };
