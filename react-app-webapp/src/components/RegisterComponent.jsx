// Obligatoriskt med avatar? Justera.

const RegisterComponent = ({handleChange, handleSubmit, navigateToLogin, formData, error, isLoading}) => {

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
            type="password"
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
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registrerar...' : 'Registrera'}
        </button>
      </form>

      <p>Har du redan ett konto?
      <button onClick={navigateToLogin}>Logga in här</button>
      </p>
    </div>
  )
};

export default RegisterComponent;