// src/pages/api/register.js
import { registerUser } from '../../db/auth.js';

export async function post({ request }) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    
    // Validate input
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Name, email, and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate password strength
    if (password.length < 8) {
      return new Response(
        JSON.stringify({ message: 'Password must be at least 8 characters long' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Register user
    try {
      const userId = await registerUser(email, password, name);
      
      return new Response(
        JSON.stringify({ message: 'Registration successful', userId }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      if (error.message === 'User already exists') {
        return new Response(
          JSON.stringify({ message: 'Email already in use' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    return new Response(
      JSON.stringify({ message: 'An error occurred during registration' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}