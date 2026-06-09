import { useState } from "react";
import TaskModal from "./TaskModal";
import { deleteTask, updateTask  } from "../services/taskService";
import { useDispatch } from "react-redux";
import React from "react";


function TaskCard({ task, columnId }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-600",
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (updatedTask) => {
  try {
    await updateTask(task.id, {
      ...task,
      ...updatedTask,
    });

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

  return (
     <div className="bg-white p-4 rounded-2xl shadow mb-3 border border-gray-100 hover:scale-[1.02] transition"> 
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-slate-800">
          {task.title}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>


      <p className="text-sm text-gray-500 mb-4">
        Due: {task.due_date}
      </p>

      <button
        onClick={() => setIsEditing(true)}
        className="text-blue-500 text-sm mr-3 hover:text-blue-700"
        >
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="text-red-500 text-sm"
      >
        Delete
      </button>

      <TaskModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onSave={handleEdit}
          editingTask={task}
      />
    </div>
  );
}



export default TaskCard;