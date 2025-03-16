// src/db/auth.js
import { openDb } from './setup.js';
import bcrypt from 'bcryptjs';

/**
 * Register a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} name - User's name
 * @returns {Promise<number>} User ID
 */
export async function registerUser(email, password, name) {
  const db = await openDb();
  
  // Check if user already exists
  const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUser) {
    await db.close();
    throw new Error('User already exists');
  }
  
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Insert new user
  const result = await db.run(
    'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
    [email, hashedPassword, name]
  );
  
  await db.close();
  return result.lastID;
}

/**
 * Authenticate a user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object|null>} User object or null if authentication fails
 */
export async function loginUser(email, password) {
  const db = await openDb();
  
  // Find user by email
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  await db.close();
  
  if (!user) {
    return null;
  }
  
  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  
  // Don't return the password
  delete user.password;
  return user;
}

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object|null>} User object or null if not found
 */
export async function getUserById(id) {
  const db = await openDb();
  const user = await db.get('SELECT id, email, name, created_at FROM users WHERE id = ?', [id]);
  await db.close();
  return user;
}