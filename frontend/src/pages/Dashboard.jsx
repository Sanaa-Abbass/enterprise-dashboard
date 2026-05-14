import StatCard from "../components/StatCard";
import RecentActivity from "../components/RecentActivity";


function Dashboard() {
  return (
     <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-2">
          Track projects, team productivity, and task progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Active Projects"
          value="12"
          change="+2 this month"
        />

        <StatCard
          title="Completed Tasks"
          value="324"
          change="+18% this week"
        />

        <StatCard
          title="Team Members"
          value="18"
          change="+3 new hires"
        />
      </div>

      <RecentActivity />
    </div>
  );
}

export default Dashboard;