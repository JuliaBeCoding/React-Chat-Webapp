import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";

const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    avatar: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await apiService.registerUser(
        formData.username,
        formData.password,
        formData.email,
        formData.avatar
      );

      alert('Registrering lyckades! Du kommer nu att omdirigeras till inloggning.');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrera dig</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Användarnamn:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Lösenord:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Avatar:</label>
          <input 
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registerar...' : 'Registera'}
        </button>
      </form>

      <p>Har du redan ett konto?</p>
      <button onClick={() => navigate('/login')}>Logga in här</button>
    </div>
  );
};

export default Register;