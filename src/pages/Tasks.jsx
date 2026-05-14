// src/pages/Tasks.jsx

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DragDropContext } from "@hello-pangea/dnd";

import TaskColumn from "../components/TaskColumn";
import DashboardStats from "../components/DashboardStats";

import { moveTask } from "../features/taskes/TaskSlice";

function Tasks() {
  const dispatch = useDispatch();

  // ✅ Redux state
  const columns = useSelector(
    (state) => state.tasks.columns
  );

  // ✅ Search state
  const [search, setSearch] = useState("");

  // ✅ Priority filter
  const [filter, setFilter] = useState("all");

  // ✅ Drag & Drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    dispatch(
      moveTask({
        source,
        destination,
      })
    );
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Enterprise Project Dashboard
      </h1>

      {/* ✅ ANALYTICS */}
      <DashboardStats columns={columns} />

      {/* ✅ SEARCH + FILTER */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded-xl w-1/2 bg-white shadow-sm"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="border p-3 rounded-xl bg-white shadow-sm"
        >
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
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
              />
            )
          )}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Tasks;