const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getExercises() {
  const response = await fetch(`${BACKEND_URL}/exercises`);
  if (!response.ok) throw new Error("Failed to fetch exercises");
  return await response.json();
}
