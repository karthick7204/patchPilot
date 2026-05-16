import Issue from "../models/Issue.js";
export const getIssues = async (req, res) => {
    try {
        const userId = req.user.id;
        // Filter issues by the authenticated user's ID
        const issues = await Issue.find({ userId }).sort({ createdAt: -1 });
        res.json(issues);
    }
    catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).json({ error: "Internal server error while fetching issues" });
    }
};
export const createIssue = async (req, res) => {
    try {
        const { name, description, githubLink, linearIssueId, priority, status } = req.body;
        const userId = req.user.id;
        const newIssue = new Issue({
            name,
            description,
            githubLink,
            linearIssueId: linearIssueId || `PP-${Math.floor(Math.random() * 1000)}`,
            priority: priority || 1,
            status: status || "backlog",
            metadata: { manual: true },
            userId: userId
        });
        await newIssue.save();
        res.status(201).json(newIssue);
    }
    catch (error) {
        console.error("Error creating issue:", error);
        res.status(500).json({ error: "Internal server error while creating issue" });
    }
};
//# sourceMappingURL=issueController.js.map