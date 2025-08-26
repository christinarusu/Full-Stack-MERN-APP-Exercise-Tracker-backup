// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})

// src/api.js or wherever you call your backend
const BACKEND_URL = 'https://full-stack-mern-app-exercise-tracker-backup-cci1ehno4.vercel.app';

export async function getExercises() {
  const response = await fetch(`${BACKEND_URL}/exercises`);
  if (!response.ok) throw new Error('Failed to fetch exercises');
  return await response.json();
}
