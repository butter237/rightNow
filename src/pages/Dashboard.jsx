import React from "react";
import "../App.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  return (

      <div className="main">
        <div className="content">
          <div className="welcome">
            <h3>Hi, Klin Kerdyoo</h3>
            <p>Let’s finish your task today!</p>
          </div>

          <div className="total-card">
            <h2>Total Tasks</h2>
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="cat"
              className="cat"
            />
          </div>

          <div className="cards">
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
      </div>
  );
}

export default Dashboard;