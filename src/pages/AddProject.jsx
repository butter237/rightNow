import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProject({ addProject }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !username.trim()) return;

    const newProject = {
      id: Date.now(),
      name: name.trim(),
      members: [username.trim()],
    };

    addProject(newProject);
    navigate(`/project/${newProject.id}`);
  };

  return (
    <div style={{ padding: "30px" }}>

<form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
>
  <h2 className="text-2xl font-bold text-gray-800">
    Create Project
  </h2>

  <input
    type="text"
    placeholder="Project name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="text"
    placeholder="Add username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
  >
    Create
  </button>
</form>
    </div>
  );
}

export default AddProject;