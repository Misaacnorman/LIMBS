// src/lib/api.ts

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchSamples() {
  const response = await fetch(`${BACKEND_URL}/api/samples`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
}

export async function registerUser(data: { name: string; email: string; password: string }) {
  const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}

// Add more API functions here as needed
