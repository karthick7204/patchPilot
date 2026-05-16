const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// --- Authentication ---

export const signup = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Signup failed");
  }
  return response.json();
};

export const login = async (credentials: any) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }
  return response.json();
};

export const updateSettings = async (settings: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/auth/settings`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(settings),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update settings");
  }
  return response.json();
};

// --- GitHub Token (Legacy/Compatibility) ---

export const saveGithubToken = async (token: string) => {
  return updateSettings({ githubToken: token });
};

export const getGithubToken = async () => {
  // This would typically fetch from the user profile now
  return { exists: false };
};
