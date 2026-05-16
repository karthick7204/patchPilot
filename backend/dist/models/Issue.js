import mongoose, { Schema, Document } from "mongoose";
const IssueSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    githubLink: {
        type: String,
        required: true,
        trim: true,
    },
    linearIssueId: {
        type: String,
        required: true,
        unique: true,
    },
    linearUrl: {
        type: String,
    },
    status: {
        type: String,
        default: "backlog",
    },
    priority: {
        type: Number,
        default: 0,
    },
    metadata: {
        type: Schema.Types.Mixed,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
export default mongoose.model("Issue", IssueSchema);
//# sourceMappingURL=Issue.js.map