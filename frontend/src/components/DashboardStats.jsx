// src/components/DashboardStats.jsx

function DashboardStats({
  columns,
  darkMode,
}) {
  // ✅ Get all tasks
  const allTasks = Object.values(columns).flatMap(
    (column) => column.tasks
  );

  // ✅ Statistics
  const totalTasks = allTasks.length;

  const completedTasks =
    columns.done.tasks.length;

  const inProgressTasks =
    columns.inprogress.tasks.length;

  const highPriorityTasks = allTasks.filter(
    (task) => task.priority === "High"
  ).length;

  // ✅ Stats Cards
  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
    },
    {
      title: "Completed",
      value: completedTasks,
    },
    {
      title: "In Progress",
      value: inProgressTasks,
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`rounded-2xl shadow-md p-5 border hover:shadow-xl transition ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white"
          }`}
        >
          <p
            className={`text-sm mb-2 ${
              darkMode
                ? "text-gray-300"
                : "text-gray-500"
            }`}
          >
            {stat.title}
          </p>

          <h2
            className={`text-3xl font-bold ${
              darkMode
                ? "text-white"
                : "text-slate-800"
            }`}
          >
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;