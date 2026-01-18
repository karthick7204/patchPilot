import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Server } from "@modelcontextprotocol/sdk/server";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import type { Express, Request, Response } from "express";

 const server = new Server({
    name:"mcp-server",
    version:"1.0.0",
})
export function startMcp(app:Express) {
    // Endpoint 1: Clients connect here to START the stream
    app.get("/sse", async (req, res) => {
        console.log("New MCP client connected via SSE");
        const transport = new SSEServerTransport("/messages", res);
        await server.connect(transport);
    });
}
