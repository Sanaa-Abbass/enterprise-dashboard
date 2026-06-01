
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "../components/TaskColumn";
import DashboardStats from "../components/DashboardStats";
import { moveTask  } from "../features/taskes/TaskSlice";

import { setTasks } from "../features/taskes/TaskSlice";

import Navbar from "../components/Navbar";
import { getTasks, updateTask } from "../services/taskService";

function Tasks() {
  const dispatch = useDispatch();

  // ✅ Redux state
  const columns = useSelector(
    (state) => state.tasks.columns
  );

  // ✅ Search + Filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // ✅ Save theme
  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

 // API load effect
  useEffect(() => {
  const load = async () => {
    try {
        const res = await getTasks();
        console.log("API DATA:", res.data);

        // dispatch into Redux
        dispatch(setTasks(res.data));
      } catch (err) {
        console.error("API error:", err);
      }
    };

      load();
    }, []);

  // ✅ Drag & Drop
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

  const sourceColumn = source.droppableId;
  const destinationColumn = destination.droppableId;

  const sourceIndex = source.index;
  const destinationIndex = destination.index;

    dispatch(
      moveTask({
        sourceColumn,
        destinationColumn,
        sourceIndex,
        destinationIndex
      })
    );

    try {
      const movedTask =
        columns[sourceColumn].tasks[sourceIndex];

      await updateTask(movedTask.id, {
        ...movedTask,
        status: destinationColumn,
      });

    } catch (error) {
      console.error("Drag sync failed:", error);
    }
  };

  // ✅ Filter tasks
  const filteredColumns = Object.entries(columns).reduce(
    (acc, [key, column]) => {
      const filteredTasks = column.tasks.filter(
        (task) => {
          const matchSearch = task.title
            .toLowerCase()
            .includes(search.toLowerCase());

          const matchFilter =
            filter === "all" ||
            task.priority === filter;

          return matchSearch && matchFilter;
        }
      );

      acc[key] = {
        ...column,
        tasks: filteredTasks,
      };

      return acc;
    },
    {}
  );

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6">
        
        {/* your kanban board */}

      
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-gray-50 text-black"
      }`}
    >
      {/* ✅ DARK MODE BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {darkMode
            ? "Light Mode"
            : "Dark Mode"}
        </button>
      </div>

      {/* ✅ PAGE TITLE */}
      <h1
        className={`text-4xl font-bold mb-8 ${
          darkMode
            ? "text-white"
            : "text-slate-800"
        }`}
      >
        Enterprise Project Dashboard
      </h1>

      {/* ✅ ANALYTICS */}
      <DashboardStats
        columns={columns}
        darkMode={darkMode}
      />

      {/* ✅ SEARCH + FILTER */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className={`border p-3 rounded-xl w-1/2 shadow-sm ${
            darkMode
              ? "bg-slate-800 text-white border-slate-700"
              : "bg-white"
          }`}
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className={`border p-3 rounded-xl shadow-sm ${
            darkMode
              ? "bg-slate-800 text-white border-slate-700"
              : "bg-white"
          }`}
        >
          <option value="all">
            All Priorities
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>
        </select>
      </div>

      {/* ✅ KANBAN BOARD */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Object.entries(filteredColumns).map(
            ([columnId, column]) => (
              <TaskColumn
                key={columnId}
                columnId={columnId}
                title={column.title}
                tasks={column.tasks}
                darkMode={darkMode}
              />
            )
          )}
        </div>
      </DragDropContext>
    </div>

    </div>
    </div>
  );
}

export default Tasks;