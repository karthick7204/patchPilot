import mongoose, { Schema, Document } from "mongoose";

export interface IIssue extends Document {
  name: string;
  description: string;
  githubLink: string;
  linearIssueId: string;
  linearUrl?: string;
  status?: string;
  priority?: number;
  extractedCode?: string;
  fixedCode?: string;
  metadata?: any;
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema: Schema = new Schema(
  {
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
    extractedCode: {
      type: String,
    },
    fixedCode: {
      type: String,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IIssue>("Issue", IssueSchema);
