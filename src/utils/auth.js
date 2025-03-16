// src/utils/auth.js
import { verifySessionToken } from './session.js';
import { getUserById } from '../db/auth.js';

/**
 * Authentication middleware for Astro
 * @param {Object} request - HTTP request object
 * @returns {Promise<Object|null>} User object or null if not authenticated
 */
export async function authenticateUser(request) {
  // Get token from cookies
  const cookies = request.headers.get('cookie');
  if (!cookies) return null;
  
  const tokenMatch = cookies.match(/light_within_session=([^;]+)/);
  if (!tokenMatch) return null;
  
  const token = tokenMatch[1];
  const decoded = verifySessionToken(token);
  if (!decoded) return null;
  
  // Get user from database
  const user = await getUserById(decoded.userId);
  return user;
}

/**
 * Redirect if not authenticated
 * @param {Object} Astro - Astro context
 * @returns {Promise<void>}
 */
export async function protectRoute(Astro) {
  const user = await authenticateUser(Astro.request);
  if (!user) {
    return Astro.redirect('/login?redirect=' + encodeURIComponent(Astro.url.pathname));
  }
  return user;
}

/**
 * Redirect if already authenticated
 * @param {Object} Astro - Astro context
 * @returns {Promise<void>}
 */
export async function redirectIfAuthenticated(Astro) {
  const user = await authenticateUser(Astro.request);
  if (user) {
    return Astro.redirect('/');
  }
  return null;
}