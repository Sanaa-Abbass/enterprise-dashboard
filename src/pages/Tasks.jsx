import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "@hello-pangea/dnd";

import TaskColumn from "../components/TaskColumn";
import { moveTask } from "../features/taskes/TaskSlice";

function Tasks() {
  const columns = useSelector((state) => state.tasks.columns);

  const dispatch = useDispatch();

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h1 className="text-3xl font-bold mb-8">
          Task Management Board
        </h1>

        <div className="flex gap-6 overflow-x-auto">
          {Object.entries(columns).map(([key, column]) => (
            <TaskColumn
              key={key}
              columnId={key}
              title={column.title}
              tasks={column.tasks}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default Tasks;