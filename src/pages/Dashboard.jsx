import StatCard from "../components/StatCard";
import RecentActivity from "../components/RecentActivity";


function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
         Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          change="+3 new members"
        />
      </div>
      <RecentActivity/>
    </div>
  );
}

export default Dashboard;