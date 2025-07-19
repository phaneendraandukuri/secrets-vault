import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../utils/auth';
import AddSecretModal from '../AddSecretModal';
import SecretList from '../SecretList';
import './dashboard.css'

export default function Dashboard() {
  const [secrets, setSecrets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('secrets') || '[]');
    setSecrets(stored.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddSecret = (content) => {
    const newSecret = {
      id: crypto.randomUUID(),
      content,
      createdAt: new Date().toISOString(),
    };
    const updated = [newSecret, ...secrets];
    setSecrets(updated);
    localStorage.setItem('secrets', JSON.stringify(updated));
  };

  const handleDeleteSecret = (id) => {
    const updated = secrets.filter((s) => s.id !== id);
    setSecrets(updated);
    localStorage.setItem('secrets', JSON.stringify(updated));
  };

  const handleEditSecret = (id) => {
    const current = secrets.find((s) => s.id === id);
    const updatedContent = prompt('Edit secret:', current.content);
    if (updatedContent !== null) {
      const updated = secrets.map((s) =>
        s.id === id ? { ...s, content: updatedContent } : s
      );
      setSecrets(updated);
      localStorage.setItem('secrets', JSON.stringify(updated));
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Secrets Vault</h1>
        <div>
          <span className='user-email'>{user?.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        <button className="add-secret-btn" onClick={() => setModalOpen(true)}>
          + Add Secret
        </button>

        <SecretList
          secrets={secrets}
          onEdit={handleEditSecret}
          onDelete={handleDeleteSecret}
        />

        <AddSecretModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddSecret}
        />
      </main>
    </div>
  );
}
