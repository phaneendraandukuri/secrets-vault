import { useState } from "react";
import "./add-secret-modal.css"

export default function AddSecretModal({ isOpen, onClose, onAdd }) {
  const [newSecret, setNewSecret] = useState('');

  const handleAdd = () => {
    if (newSecret.trim()) {
      onAdd(newSecret.trim());
      setNewSecret('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add a New Secret</h2>
        <textarea
          value={newSecret}
          onChange={(e) => setNewSecret(e.target.value)}
          placeholder="Enter your secret"
        />
        <div className="modal-actions">
          <button onClick={handleAdd}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
