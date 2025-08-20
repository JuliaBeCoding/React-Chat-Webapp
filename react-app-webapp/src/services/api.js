// Alla API-anrop.

const API_BASE_URL = 'https://chatify-api.up.railway.app';

// Objekt med HTTP-metoder.
const apiService = {
  csrfToken: null,

  // Hämta CSRF token.
  async getCsrfToken() {
    try {
      const response = await fetch(`${API_BASE_URL}/csrf`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Fånga serverfel.
      if (!response.ok) {
        throw new Error('Failed to get CSRF token');
      }

      const data = await response.json();
      this.csrfToken = data.csrfToken;
      return this.csrfToken;
    } catch (error) {
      console.error('Error getting CSRF token:', error);
      throw error;
    }
  },

  // Registrera användare.
  async registerUser(username, password, email, avatar) {
    try {
      if (!this.csrfToken) {
        await this.getCsrfToken();
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          avatar,
          csrfToken: this.csrfToken
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Logga in användare.
async loginUser(username, password) {
  try {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }

    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        csrfToken: this.csrfToken
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
},

  // Hämta meddelanden.
  async getMessages(conversationId = null) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      let url = `${API_BASE_URL}/messages`;
      if (conversationId) {
        url += `?conversationId=${conversationId}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get messages');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  },

  // Skapa meddelande.
  async createMessage(text) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      if (!this.csrfToken) {
        await this.getCsrfToken();
      }

      const body = { text, csrfToken: this.csrfToken };

      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to create message');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  },

  // Radera meddelande.
  async deleteMessage(messageId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      return true;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }
}

export default apiService;