import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getUser, logout } from '../../utils/auth';
import AddSecretModal from '../AddSecretModal';
import SecretList from '../SecretList';
import './dashboard.css'

export default function Dashboard() {
  const [secrets, setSecrets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();
  const token = getToken();

  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/secrets', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSecrets(data.secrets);
        } else {
          console.error('Failed to fetch secrets');
        }
      } catch (error) {
        console.error('Error fetching secrets:', error);
      }
    };

    if (token) {
      fetchSecrets();
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddSecret = async (title, content) => {
    const newSecret = {
      title,
      password: content,
    };

    try {
      const response = await fetch('http://localhost:5001/api/secrets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSecret),
      });

      if (response.ok) {
        const data = await response.json();
        setSecrets((prevSecrets) => [
          ...prevSecrets,
          {
            id: data.secret.id,
            title: data.secret.title,
            password: data.secret.password,
          },
        ])

      } else {
        console.error('Failed to add secret');
      }
    } catch (error) {
      console.error('Error adding secret:', error);
    }
  };

  const handleEditSecret = async (id) => {
    const current = secrets.find((s) => s.id === id);
    const updatedContent = prompt('Edit secret:', current.content);
    if (updatedContent !== null) {
      const updatedSecret = {
        title: current.title,
        password: updatedContent,
      };

      try {
        const response = await fetch(`http://localhost:5001/api/secrets/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updatedSecret),
        });

        if (response.ok) {
          const updatedSecrets = secrets.map((s) =>
            s.id === id ? { ...s, password: updatedContent } : s
          );
          setSecrets([...updatedSecrets]);
          localStorage.setItem('secrets', JSON.stringify(updatedSecrets));
        } else {
          console.error('Failed to update secret');
        }
      } catch (error) {
        console.error('Error updating secret:', error);
      }
    }
  };

  const handleDeleteSecret = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/secrets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const updatedSecrets = secrets.filter((secret) => secret.id !== id);
        setSecrets(updatedSecrets);
      } else {
        console.error('Failed to delete secret');
      }
    } catch (error) {
      console.error('Error deleting secret:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Secrets Vault</h1>
        <div className="header-right-section">
          <p className="user-email">{user?.email}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        <button className="add-secret-btn" onClick={() => setModalOpen(true)}>
          + Add Secret
        </button>

        {secrets.length > 0 && (
          <SecretList
            secrets={secrets}
            onEdit={handleEditSecret}
            onDelete={handleDeleteSecret}
          />
        )}

        <AddSecretModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddSecret}
        />
      </main>
    </div>
  );
}
