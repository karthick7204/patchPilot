import crypto from "node:crypto";
import express, { Router } from "express";
import dotenv from "dotenv";
import { linearWebhookHandler } from "../controller/ticketController.js";
const ticketRouter = Router();


export const getTicket = ticketRouter.post("/linear",linearWebhookHandler());

 