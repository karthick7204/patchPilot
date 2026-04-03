import mongoose, { Schema, Document } from 'mongoose';
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
}, {
    timestamps: true,
});
export default mongoose.model('Issue', IssueSchema);
//# sourceMappingURL=Issue.js.map