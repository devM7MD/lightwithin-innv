// src/pages/api/login.js
import { loginUser } from '../../db/auth.js';
import { createSessionToken, setSessionCookie } from '../../utils/session.js';

export async function post({ request, cookies }) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Authenticate user
    const user = await loginUser(email, password);
    
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Create session token
    const token = createSessionToken(user);
    
    // Set cookie in response
    const response = new Response(
      JSON.stringify({ message: 'Login successful', user: { id: user.id, name: user.name } }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
    // Set session cookie
    cookies.set('light_within_session', token, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    
    return new Response(
      JSON.stringify({ message: 'An error occurred during login' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}