import { useState } from "react";


function TaskModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title) return;

    onSave({
      id: Date.now().toString(),
      title,
      priority,
      dueDate,
    });

    setTitle("");
    setPriority("Low");
    setDueDate("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          Add New Task
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full border p-2 mb-3 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          className="w-full border p-2 mb-4 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;