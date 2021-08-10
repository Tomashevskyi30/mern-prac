const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text: {type: String},
    isCompleted: {type: Boolean, default:false},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Todo', schema)