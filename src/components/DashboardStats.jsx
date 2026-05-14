function DashboardStats({ columns }) {
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

  // ✅ Card Data
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
          className="bg-white rounded-2xl shadow p-5 border"
        >
          <p className="text-gray-500 text-sm mb-2">
            {stat.title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;