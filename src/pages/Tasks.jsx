import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  DragDropContext,
} from "@hello-pangea/dnd";

import TaskColumn from "../components/TaskColumn";

import { moveTask } from "../features/taskes/TaskSlice";

function Tasks() {
  const dispatch = useDispatch();

  // ✅ Redux state
  const columns = useSelector(
    (state) => state.tasks.columns
  );

  // ✅ Search + Filter state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ Drag & Drop handler
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
    <div className="p-6">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        Project Management Dashboard
      </h1>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded-lg w-1/2"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="border p-2 rounded-lg"
        >
          <option value="all">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* KANBAN BOARD */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto">
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