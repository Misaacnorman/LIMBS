// src/lib/api.ts

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchSamples() {
  const response = await fetch(`${BACKEND_URL}/api/samples`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
}

// Add more API functions here as needed
