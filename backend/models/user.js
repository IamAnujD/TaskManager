import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  emailId: {
    type: String,
    required: [true, 'must provide emailId'],
  },
  password: {
    type: String,
    default:false
  },
  tasks : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Task'}
    ]
})

export default mongoose.model('User', UserSchema)
