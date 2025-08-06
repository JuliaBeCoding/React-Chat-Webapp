import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";
import { saveUserData } from "../utils/auth";

const Login = () => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiService.loginUser(
        credentials.username,
        credentials.password
      );

      saveUserData(response.token);
      navigate('/chat');
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Användarnamn:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Lösenord:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loggar in...' : 'Logga in'}
        </button>
      </form>
      
      <p>
        Inget konto än? 
        <button onClick={() => navigate('/register')}>Registrera dig här</button>
      </p>
    </div>
  )
};

export default Login;