// This is a server-side API endpoint for user login
import { connectToDatabase } from '../../../utils/mongodb-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST({ request }) {
  try {
    const { email, password } = await request.json();
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Find user by email
    const user = await db.collection('users').findOne({ email });
    
    // Check if user exists
    if (!user) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid email or password' 
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid email or password' 
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET || 'your-fallback-secret-key',
      { expiresIn: '7d' }
    );
    
    // Remove sensitive data before sending user object
    const safeUser = { ...user };
    delete safeUser.hashedPassword;
    
    // Update last login time
    await db.collection('users').updateOne(
      { _id: user._id },
      { 
        $set: { 
          lastLogin: new Date().toISOString(),
          lastLoginType: 'web',
          isOnline: true 
        },
        $inc: { loginCount: 1 }
      }
    );
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Login successful',
        token,
        user: safeUser
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Server error during login' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 