import { useState } from "react";
import "./add-secret-modal.css";

export default function AddSecretModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [secret, setSecret] = useState('');

  const handleAdd = () => {
    if (title.trim() && secret.trim()) {
      onAdd(title.trim(), secret.trim());
      setTitle('');
      setSecret('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add a New Secret</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your secret"
          className="modal-input"
        />
        <textarea
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter your secret"
          className="modal-input"
        />
        <div className="modal-actions">
          <button onClick={handleAdd} className="save-btn">Save</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
        <div className="modal-info">
          <p>Secrets are encrypted and only readable by you</p>
        </div>
      </div>
    </div>
  );
}
