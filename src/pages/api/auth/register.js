// This is a server-side API endpoint for user registration
import { connectToDatabase } from '../../../utils/mongodb-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST({ request }) {
  try {
    const userData = await request.json();
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: userData.email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Email already registered' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    // Remove plain password and replace with hashed one
    delete userData.password;
    userData.hashedPassword = hashedPassword;
    
    // Insert user into database
    const result = await db.collection('users').insertOne(userData);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId.toString() },
      process.env.JWT_SECRET || 'your-fallback-secret-key',
      { expiresIn: '7d' }
    );
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User registered successfully',
        token,
        userId: result.insertedId.toString()
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Server error during registration' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 