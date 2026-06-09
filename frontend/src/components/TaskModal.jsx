import { useState, useEffect } from "react";

function TaskModal({
  isOpen,
  onClose,
  onSave,
  editingTask,
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [due_date, setDueDate] = useState("");

  // ✅ Load editing data correctly
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setPriority(editingTask.priority || "Low");
      setDueDate(editingTask.due_date || "");
    } else {
      setTitle("");
      setPriority("Low");
      setDueDate("");
    }
  }, [editingTask]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSave({
      id: editingTask?.id || Date.now().toString(),
      title,
      priority,
      due_date,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {editingTask ? "Edit Task" : "Add Task"}
        </h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="date"
          value={due_date}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;