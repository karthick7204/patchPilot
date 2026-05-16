import mongoose, { Document } from "mongoose";
export interface IIssue extends Document {
    name: string;
    description: string;
    githubLink: string;
    linearIssueId: string;
    linearUrl?: string;
    status?: string;
    priority?: number;
    metadata?: any;
    userId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IIssue, {}, {}, {}, mongoose.Document<unknown, {}, IIssue, {}, mongoose.DefaultSchemaOptions> & IIssue & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IIssue>;
export default _default;
//# sourceMappingURL=Issue.d.ts.map