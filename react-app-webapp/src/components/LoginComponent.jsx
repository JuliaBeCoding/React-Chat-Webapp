const LoginComponent = ({handleChange, handleSubmit, navigateToRegister, credentials, error, isLoading}) => {
  
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
        <button onClick={navigateToRegister}>Registrera dig här</button>
      </p>
    </div>
  )
};

export default LoginComponent;