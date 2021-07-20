const mongoose = require('mongoose')

const MemeSchema = mongoose.Schema({
    owner: { type: String, required: true },
    receiver: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    expiredAt: { type: Date, required: true, default: -1 },
    description: { type: String },
    likes: { type: Number, required: true, default: 0 },
    private: { type: Boolean, required: true, default: false },
    replyTo: { type: String },
    imageUrl: { type: String },
})

module.exports = mongoose.model('meme', MemeSchema)