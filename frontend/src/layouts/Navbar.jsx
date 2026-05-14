function Navbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">Project Dashboard</h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-1"
        />

        <div className="w-10 h-10 rounded-full bg-slate-300"></div>
      </div>
    </header>
  );
}

export default Navbar;