import mongoose, { Schema, Document } from 'mongoose';

export interface IGithubToken extends Document {
  token: string;
  githubUsername?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GithubTokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      required: true,
      trim: true,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGithubToken>('GithubToken', GithubTokenSchema);
