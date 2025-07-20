import { useState } from 'react';
import './secret-list.css';

export default function SecretList({ secrets, onEdit, onDelete }) {
  const [visibleIds, setVisibleIds] = useState([]);

  const toggleVisibility = (id) => {
    setVisibleIds((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this secret?")) {
      onDelete(id);
    }
  };

  return (
    <ul className="secret-list">
      {secrets.map((secret) => (
        <li key={secret.id} className="secret-item">
          <div className='secret-container'>
            <span className='secret-title'>{secret.title}</span>
            <span className="secret-content">{visibleIds.includes(secret.id) ? secret.password : '•'.repeat(secret.password.length)}</span>
          </div>
          <div className="actions">
            <button onClick={() => toggleVisibility(secret.id)}>👁</button>
            <button onClick={() => onEdit(secret.id)}>✏️</button>
            <button onClick={() => confirmDelete(secret.id)}>🗑</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
