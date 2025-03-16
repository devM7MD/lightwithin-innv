// src/pages/api/logout.js
export async function get({ cookies }) {
    // Clear the session cookie
    cookies.delete('light_within_session', { path: '/' });
    
    // Redirect to login page
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/login'
      }
    });
  }