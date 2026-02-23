import TaskCard from "./TaskCard";

function TaskColumn({ title, count, color, progressColor, tasks }) {
  return (
    <div>
      {/* Header */}
      <div className={`flex justify-between items-center px-4 py-2 text-black font-semibold ${color}`}>
        <span>{title}</span>
        <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
          {count}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-6 mt-4">
        {tasks.map((_, index) => (
          <TaskCard key={index} progressColor={progressColor} />
        ))}
      </div>
    </div>
  );
}

export default TaskColumn;