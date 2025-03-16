// Client-side MongoDB API utilities

/**
 * Register a new user
 * @param {Object} userData - User data to register
 * @returns {Promise<Object>} - Response with success status and token
 */
export async function registerUser(userData) {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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
}

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Response with user data and token
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    return data; // Return the full response including token and user data
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

/**
 * Update user login status
 * @param {string} userId - User ID
 * @param {Object} statusData - Status data to update
 * @returns {Promise<Object>} - Response with success status
 */
export async function updateUserLoginStatus(userId, statusData) {
  try {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    const response = await fetch(`/api/users/${userId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(statusData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update login status');
    }
    
    return data;
  } catch (error) {
    console.error('Error updating user login status:', error);
    // Don't throw here - we don't want to break the login flow if this fails
    return { success: false };
  }
}

/**
 * Logout the current user
 * @returns {Promise<boolean>} - Success status
 */
export async function logoutUser() {
  try {
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (userId && token) {
      // Update user status to offline
      try {
        await fetch(`/api/users/${userId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ isOnline: false, lastLogout: new Date().toISOString() }),
        });
      } catch (error) {
        console.error('Error updating logout status:', error);
        // Continue with logout even if this fails
      }
    }
    
    // Clear all session data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userData');
    
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated
 */
export function isAuthenticated() {
  return !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'));
}

/**
 * Get current user data
 * @returns {Object|null} - User data or null if not authenticated
 */
export function getCurrentUser() {
  const userDataString = localStorage.getItem('userData') || sessionStorage.getItem('userData');
  return userDataString ? JSON.parse(userDataString) : null;
} 