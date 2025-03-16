// src/db/setup.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../database.sqlite');

// Open the database connection
export async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

// Initialize the database with required tables
export async function initDb() {
  const db = await openDb();
  
  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create children table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS children (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      age INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);
  
  // Create health_entries table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS health_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      child_id INTEGER NOT NULL,
      sleep TEXT,
      appetite TEXT,
      mood TEXT,
      entry_date DATE DEFAULT CURRENT_DATE,
      FOREIGN KEY (child_id) REFERENCES children (id)
    )
  `);
  
  console.log('Database initialized successfully');
  await db.close();
}

// Call this function during app startup
initDb().catch(err => {
  console.error('Database initialization failed:', err);
});