import mongoose, { Document } from 'mongoose';
export interface IGithubToken extends Document {
    token: string;
    githubUsername?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IGithubToken, {}, {}, {}, mongoose.Document<unknown, {}, IGithubToken, {}, mongoose.DefaultSchemaOptions> & IGithubToken & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IGithubToken>;
export default _default;
//# sourceMappingURL=GithubToken.d.ts.map