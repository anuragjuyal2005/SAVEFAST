import { useState } from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (code.length !== 4) {
      alert("Enter 4-digit code");
      return;
    }

    onConfirm(code);
    setCode("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Enter Delete Code
        </h2>

        <input
          type="password"
          maxLength={4}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="****"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 hover:text-gray-900  rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
