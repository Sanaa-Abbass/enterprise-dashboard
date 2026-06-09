import TaskCard from "./TaskCard";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import TaskModal from "./TaskModal";
import { useState } from "react";

import { addTask } from "../services/taskService";


function TaskColumn({ title, tasks, columnId }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // ADD TASK LOGIC
  const handleAddTask = async (taskData) => {
    try {
      console.log("taskData:", taskData);
      const newTask = {
      ...taskData,
      status: columnId,
    };

    console.log("Sending task:", newTask);

    await addTask(newTask);
    setIsOpen(false);

    window.location.reload();
    } catch (error) {
      console.error(error);
      }
  };

  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-100 rounded-2xl p-4 w-80 min-h-[500px]"
        >
          {/* COLUMN TITLE */}
          <h2 className="text-xl font-bold mb-4">{title}</h2>

          {/* ADD TASK BUTTON */}
          <button
          
            onClick={() => setIsOpen(true)}

            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            + Add Task
          </button>

          {/* TASK LIST */}
          {tasks.map((task, index) => (
            <Draggable
              key={String(task.id)}
              draggableId={String(task.id)}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCard
                    task={task}
                    columnId={columnId}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {/* REQUIRED FOR DND */}
          {provided.placeholder}
          <TaskModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onSave={handleAddTask}
            />
        </div>

        
      )}
    </Droppable>
  );
}

export default TaskColumn;