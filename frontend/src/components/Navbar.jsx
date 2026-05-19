import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/");
  };

  return (
    <div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">

      <h1 className="text-2xl font-bold text-gray-800">
        Enterprise Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;