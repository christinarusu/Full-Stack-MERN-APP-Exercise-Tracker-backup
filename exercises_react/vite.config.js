// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})

// src/api.js
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Fetch exercises from backend
export async function getExercises() {
  try {
    const response = await fetch(`${BACKEND_URL}/exercises`);
    if (!response.ok) throw new Error("Failed to fetch exercises");
    return await response.json();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}
