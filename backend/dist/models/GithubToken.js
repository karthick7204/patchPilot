import mongoose, { Schema, Document } from 'mongoose';
const GithubTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});
export default mongoose.model('GithubToken', GithubTokenSchema);
//# sourceMappingURL=GithubToken.js.map