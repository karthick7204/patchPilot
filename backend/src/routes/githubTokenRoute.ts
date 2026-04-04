import express, { Router } from "express";
import { saveGithubToken, getGithubToken } from "../controller/githubTokenController.js";

const githubTokenRouter = Router();

githubTokenRouter.post("/github-token", saveGithubToken);
githubTokenRouter.get("/github-token", getGithubToken);

export default githubTokenRouter;
