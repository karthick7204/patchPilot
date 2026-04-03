import mongoose, { Schema, Document } from 'mongoose';

export interface IIssue extends Document {
  name: string;
  description: string;
  githubLink: string;
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IIssue>('Issue', IssueSchema);
