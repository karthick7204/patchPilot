import mongoose, { Document } from "mongoose";
export interface IIntegration extends Document {
    userId: mongoose.Types.ObjectId;
    githubToken: string;
    linearSecret: string;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IIntegration, {}, {}, {}, mongoose.Document<unknown, {}, IIntegration, {}, mongoose.DefaultSchemaOptions> & IIntegration & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IIntegration>;
export default _default;
//# sourceMappingURL=Integration.d.ts.map