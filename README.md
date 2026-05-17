# 🚀 PatchPilot

**PatchPilot** is an intelligent, automated bug-tracking and code-fixing platform designed to bridge the gap between issue management and engineering execution. By combining Linear webhooks with AI-driven agents, PatchPilot automatically analyzes incoming bug reports, extracts relevant codebase context, and generates highly accurate code patches ready for human review.

## ✨ Features

- 🔗 **Linear Integration:** Instantly tracks new bugs through seamless Linear webhook ingestion.
- 🤖 **AI Code Patches:** Utilizes an MCP (Model Context Protocol) agent architecture to fetch local codebase files, identify bugs, and synthesize automated code fixes.
- 🌗 **GitHub-Inspired UI:** A premium, developer-first interface featuring native light/dark mode toggling, styled identically to GitHub's UI.
- 💻 **Integrated IDE:** An interactive split-pane `PatchEditor` powered by **Monaco Editor** (the engine behind VS Code) with adjustable layout dividers for live, syntax-highlighted code reviews and direct patch editing.
- 🗄️ **Full-Stack Persistence:** Built on a robust MongoDB backend to securely persist AI artifacts, user sessions, and metadata.

## 🛠️ Tech Stack

**Frontend**
- Next.js (App Router)
- React
- Tailwind CSS v4
- Monaco Editor (`@monaco-editor/react`)
- Framer Motion

**Backend**
- Node.js & Express
- MongoDB & Mongoose
- Model Context Protocol (MCP) Agents

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB connection string
- A [Linear Workspace](https://linear.app/) (for webhook configuration)

### 1. Clone the repository
```bash
git clone https://github.com/karthick7204/patchPilot.git
cd patchPilot
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MCP_WORKSPACE_PATH=C:/your-workspace-path
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```
Start the frontend development server:
```bash
npm run dev
```

### 4. Configure Linear Webhooks
To test the full autonomous pipeline, expose your backend using **Ngrok**:
```bash
ngrok http 3001
```
Add the Ngrok URL (e.g., `https://<your-ngrok>.ngrok.app/linear/:userId`) to your Linear workspace webhook settings to trigger AI patch generation upon issue creation.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/karthick7204/patchPilot/issues).

## 📝 License
This project is licensed under the MIT License.
