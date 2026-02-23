import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Section({ title, color, tasks, projectId }) {
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";

    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Bangkok",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date(dateString));
  };

 return (
  <div className="mb-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
    <h3 className={`text-xl font-bold mb-6 ${color}`}>
      {title}
    </h3>

    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="text-left py-3 px-4 font-semibold">Task</th>
            <th className="text-left py-3 px-4 font-semibold">Assignee</th>
            <th className="text-left py-3 px-4 font-semibold">Category</th>
            <th className="text-left py-3 px-4 font-semibold">Priority</th>
            <th className="text-left py-3 px-4 font-semibold">Start</th>
            <th className="text-left py-3 px-4 font-semibold">End</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-10 text-gray-400"
              >
                No tasks in this section
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium">
                  <Link
                    to={`/project/${projectId}/task/${task.id}`}
                    className="hover:text-blue-600 transition"
                  >
                    {task.title}
                  </Link>
                </td>

                <td className="py-3 px-4 text-gray-600">
                  {task.assignee_id}
                </td>

                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {task.category}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                    {task.priority}
                  </span>
                </td>

                <td className="py-3 px-4 text-gray-500">
                  {formatDateTime(task.start_date)}
                </td>

                <td className="py-3 px-4 text-gray-500">
                  {formatDateTime(task.end_date)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default function ProjectPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/project/${id}`
      );
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8">
      <Section
        title="To Do"
        color="text-orange-500"
        tasks={tasks.filter((t) => t.status === "todo")}
        projectId={id}
      />

      <Section
        title="In Progress"
        color="text-blue-500"
        tasks={tasks.filter((t) => t.status === "inprogress")}
        projectId={id}
      />

      <Section
        title="On Hold"
        color="text-pink-500"
        tasks={tasks.filter((t) => t.status === "onhold")}
        projectId={id}
      />

      <Section
        title="Completed"
        color="text-green-500"
        tasks={tasks.filter((t) => t.status === "completed")}
        projectId={id}
      />

      <div className="mt-6 text-center font-semibold cursor-pointer hover:underline">
        Add Task
      </div>
    </div>
  );
}