import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard,ListTodo,CirclePlus  } from 'lucide-react';

function Sidebar({ projects }){

  return (
    <div className="sidebar">

      <div className="menu">
        <Link to="/" className="menu-item active"><LayoutDashboard size={20} /><span>Dashboard</span></Link>

        <div className="project-title">Your Project</div>
        <Link to="/add-project" className="add-item"> <CirclePlus size={20} /><span>Add Your Projects</span></Link>
        {projects.map((project, index) => (
          <Link
            key={index}
            to={`/project/${project.id}`}
            className="menu-item"
          >
            {project.name}
          </Link>
        ))}

      </div>

      <div className="settings">⚙ Settings</div>
    </div>
  );
}

export default Sidebar;