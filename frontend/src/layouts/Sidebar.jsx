import { LayoutDashboard, ListTodo, Users, Calendar } from "lucide-react";

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white p-6 hidden md:block">
      <h1 className="text-2xl font-bold mb-10">Enterprise</h1>

      <nav className="space-y-6">
        <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
          <ListTodo size={20} />
          <span>Tasks</span>
        </div>

        <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
          <Users size={20} />
          <span>Team</span>
        </div>

        <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
          <Calendar size={20} />
          <span>Calendar</span>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;