import {useDispatch} from "react-redux"
import {deleteTask} from "../features/taskes/TaskSlice"



function TaskCard({ task, columnId }) {
  const dispatch = useDispatch();

   const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-600",
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
        Due: {task.dueDate}
      </p>

      <button
        onClick={() =>
          dispatch(deleteTask({
            columnId,
            taskId: task.id,
          }))
        }
        className="text-red-500 text-sm"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;