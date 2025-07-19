import { useState } from 'react';
import "./secret-list.css"

export default function SecretList({ secrets, onEdit, onDelete }) {
  const [visibleIds, setVisibleIds] = useState([]);

  const toggleVisibility = (id) => {
    setVisibleIds((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  return (
    <ul className="secret-list">
      {secrets.map((secret) => (
        <li key={secret.id} className="secret-item">
          <span className="secret-content">
            {visibleIds.includes(secret.id) ? secret.content : '•'.repeat(secret.content.length)}
          </span>
          <div className="actions">
            <button onClick={() => toggleVisibility(secret.id)}>👁</button>
            <button onClick={() => onEdit(secret.id)}>✏️</button>
            <button onClick={() => onDelete(secret.id)}>🗑</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
