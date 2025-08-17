import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";
import { saveUserData } from "../utils/auth";
import LoginComponent from "../components/LoginComponent";

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

  const navigateToRegister = () => {
    navigate('/register');
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
      window.location.href = '/chat';
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginComponent
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      navigateToRegister={navigateToRegister}
      credentials={credentials}
      error={error}
      isLoading={isLoading}
    />
  )
};

export default Login;