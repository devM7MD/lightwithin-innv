import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const MONGODB_URI = "mongodb+srv://test:1234@cluster0.i2h9l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const MONGODB_DB = "test";

// Check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Check the MongoDB DB
if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // If the connection is already established, return the cached connection
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Connect to cluster
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(MONGODB_DB);

  // Cache the connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

/**
 * Check if a request is authenticated
 * @param {Request} request - The incoming request
 * @returns {Promise<boolean>} - True if authenticated
 */
export async function isAuthenticated(request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    let token;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // For SSR, we need to check cookies as well
      const cookies = request.headers.get('cookie');
      if (cookies) {
        const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('authToken='));
        if (tokenCookie) {
          token = tokenCookie.split('=')[1];
        }
      }
    }
    
    if (!token) {
      return false;
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret-key');
    
    // Check if user exists in database
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: decoded.userId });
    
    return !!user;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}

/**
 * Get user from request
 * @param {Request} request - The incoming request
 * @returns {Promise<Object|null>} - User object or null
 */
export async function getUserFromRequest(request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    let token;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // For SSR, we need to check cookies as well
      const cookies = request.headers.get('cookie');
      if (cookies) {
        const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('authToken='));
        if (tokenCookie) {
          token = tokenCookie.split('=')[1];
        }
      }
    }
    
    if (!token) {
      return null;
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret-key');
    
    // Get user from database
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: decoded.userId });
    
    if (!user) {
      return null;
    }
    
    // Remove sensitive data
    delete user.hashedPassword;
    
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
} 