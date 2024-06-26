const mongoose = require('mongoose')

const r_string = {
  type: String,
  required: true,
}

const blogSchema = new mongoose.Schema({
  title: r_string,
  author: String,
  url: r_string,
  comments: {
    type: [String],
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
