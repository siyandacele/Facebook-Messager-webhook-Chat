const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName : { type: String, required: true},
    profilePic: { type: String, required: true },
    customerPsid: { type: String, required: true },
    updatedAt: { type: Date, required: true, default: Date.now },
    createdAt:{ type: Date, required: true},
    messages: [{ 
        text: { type: String,required: function () {
            return !this.attachments;
        }
     },
        timestamp: { type: Number, required: true },
        attachments: { type: Array },
        mid: { type: String, required: true },
        isAgent: { type: Boolean, required: true, default: false },
    }], 
})

customerSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    return next();
});

module.exports = mongoose.model('Customer', customerSchema)