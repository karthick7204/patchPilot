const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const saveGithubToken = async (token: string) => {
  try {
    const response = await fetch("/github-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error || "Failed to save GitHub token");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving GitHub token:", error);
    throw error;
  }
};

export const getGithubToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/github-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { exists: false };
      }
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error || "Failed to fetch GitHub token");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub token:", error);
    throw error;
  }
};
