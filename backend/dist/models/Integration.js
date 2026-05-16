import mongoose, { Schema, Document } from "mongoose";
const IntegrationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true // Each user has one set of integrations
    },
    githubToken: { type: String, required: true },
    linearSecret: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
});
export default mongoose.model("Integration", IntegrationSchema);
//# sourceMappingURL=Integration.js.map