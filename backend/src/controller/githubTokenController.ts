import type { Request, Response } from 'express';
import GithubToken from '../models/GithubToken.js';

export const saveGithubToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Since there's only one, we can either upsert or just save one.
    // Let's upsert the first one we find or create new.
    let githubToken = await GithubToken.findOne();
    if (githubToken) {
      githubToken.token = token;
      await githubToken.save();
    } else {
      githubToken = new GithubToken({ token });
      await githubToken.save();
    }

    return res.status(200).json({ message: 'Github token saved successfully' });
  } catch (error) {
    console.error('Error saving Github token:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGithubToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const githubToken = await GithubToken.findOne();
    if (!githubToken) {
      return res.status(404).json({ error: 'Token not found' });
    }
    // Return a masked version for security when simple viewing is needed, 
    // though the frontend might need the actual value if it's editing.
    // Given the prompt "view and hide", I'll return the masked value or 
    // maybe just a success status if it exists.
    return res.status(200).json({ token: '********************', exists: true });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
