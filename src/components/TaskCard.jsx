import React from "react";

function TaskCard() {
  return (
    <div className="task-card">
      <p className="date">Mar 2, 2028</p>
      <h4>SE Project</h4>
      <p className="workflow">work flow</p>

      <div className="progress-bar">
        <div className="progress"></div>
      </div>

      <div className="card-footer">
        <span>👥👥👥</span>
        <span className="days">3 days left</span>
      </div>
    </div>
  );
}

export default TaskCard;