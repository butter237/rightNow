import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskDetail() {
  const { taskId } = useParams();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [assignee, setassignee] =  useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/${taskId}`
      );

      const task = res.data;

      setTitle(task.title);
      setStatus(task.status);
      setDescription(task.description || "");
      setChecklist(task.checklist || []);
          setassignee(task.assignee_name || "");
    setStartDate(
      task.start_date ? task.start_date.split("T")[0] : ""
    );
    setEndDate(
      task.end_date ? task.end_date.split("T")[0] : ""
    );
    } catch (err) {
      console.error("Error fetching task:", err);
    }
  };

    const updateTask = async () => {
        try {
            await axios.put(
            `http://localhost:5000/api/tasks/${taskId}`,
            {
                title,
                status,
                description,
                checklist,
            }
            );

            alert("Task updated!");
        } catch (err) {
            console.error(err);
        }
    };

  const toggleCheck = (index) => {
    const updated = [...checklist];
    updated[index].done = !updated[index].done;
    setChecklist(updated);
  };

  const addChecklistItem = () => {
    if (!newItem.trim()) return;

    setChecklist([...checklist, { text: newItem, done: false }]);
    setNewItem("");
  };

  const deleteItem = (index) => {
    const updated = checklist.filter((_, i) => i !== index);
    setChecklist(updated);
  };

  return (
    <div className=" max-w-3xl mx-auto">

      {/* Title */}
      <input
        className="text-4xl font-bold w-full mb-6 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Properties */}
      <div className="space-y-3 mb-8">
        <div className="flex gap-6">
          <span className="w-24 text-gray-500">Date</span>
            <span>
                {startDate || "-"} → {endDate || "-"}
            </span>
        </div>

        <div className="flex gap-6">
          <span className="w-24 text-gray-500">Assign</span>
            <span>{assignee || "-"}</span>
        </div>

        <div className="flex gap-6">
          <span className="w-24 text-gray-500">Status</span>
          <select
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="onhold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <textarea
        placeholder="Add description..."
        className="w-full border p-3 rounded-lg mb-8"
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Checklist */}
      <div>
        <h3 className="font-semibold mb-3">Checklist</h3>

        {checklist.map((item, index) => (
          <div key={index} className="flex items-center gap-3 mb-2 group">
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggleCheck(index)}
            />

            <span
              className={`flex-1 ${
                item.done ? "line-through text-gray-400" : ""
              }`}
            >
              {item.text}
            </span>

            <button
              onClick={() => deleteItem(index)}
              className="text-red-400 opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Add new item */}
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Add new item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="flex-1 border px-3 py-2 rounded-lg"
          />
          <button
            onClick={addChecklistItem}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Add
          </button>
            <button
                onClick={updateTask}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
}