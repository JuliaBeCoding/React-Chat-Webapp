import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";
import RegisterComponent from "../components/RegisterComponent";

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
      if (error.message.includes('Registration failed')) {
        setError("Användarnamnet eller emailen finns redan.")
      } else {
        setError("Något gick fel vid registreringen.")
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <RegisterComponent 
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      navigateToLogin={navigateToLogin}
      formData={formData}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default Register;