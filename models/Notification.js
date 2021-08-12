const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema({
    notification_id: { type: String, required: true },
    meme_id: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
})

module.exports = mongoose.model('notification', NotificationSchema)