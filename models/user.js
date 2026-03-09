const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true          // obligatoire
    },
    email: {
        type: String,
        required: true,
        unique: true            // unique dans la BDD
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User