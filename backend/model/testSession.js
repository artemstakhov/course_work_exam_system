import mongoose from 'mongoose';

const testSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'test',
        required: true
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: null
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        selectedOptions: {
            type: [Number],
            default: []
        }
    }],
    status: {
        type: String,
        enum: ['in-progress', 'completed', 'abandoned'],
        default: 'in-progress'
    },
    score: {
        type: Number,
        default: null
    },
    timeSpent: {
        type: Number, // in seconds
        default: 0
    }
}, {
    timestamps: true
});

// Index for quick lookups
testSessionSchema.index({ user: 1, test: 1 });
testSessionSchema.index({ status: 1 });

// Ensure only one active session per user per test
testSessionSchema.index(
    { user: 1, test: 1, status: 1 },
    { 
        unique: true,
        partialFilterExpression: { status: 'in-progress' }
    }
);

export default mongoose.model('testSession', testSessionSchema);
