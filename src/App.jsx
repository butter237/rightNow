import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AddProject from "./pages/AddProject";
import ProjectPage from "./pages/ProjectPage";
import TaskDetail from "./pages/TaskDetail";
import axios from "axios";
import './App.css'

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      console.log("PROJECTS:", res.data);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };


  const addProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
      <div className="app">
        <Header />
      <div className="main flex flex-1 bg-white">
        <div className="w-fit bg-white shadow-md">
          <Sidebar projects={projects} />
          </div>
          
        <div className="flex-1 p-8 bg-white">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/add-project"
              element={<AddProject addProject={addProject} />}
            />
            <Route
              path="/project/:id"
              element={<ProjectPage projects={projects} />}
            />
            <Route
              path="/project/:id/task/:taskId"
              element={<TaskDetail />}
            />
          </Routes>
        </div>
        </div>
      </div>
  );
}

export default App;