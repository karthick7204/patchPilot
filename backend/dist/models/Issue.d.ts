import mongoose, { Document } from 'mongoose';
export interface IIssue extends Document {
    name: string;
    description: string;
    githubLink: string;
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