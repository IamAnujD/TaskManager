import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
    default:false
  },
  priority:{
    type: Number,
    default: false
  },
  createdDate: {
    type: Date, 
    default: Date.now
  },
  user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
  },
 reminder: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model('Task', TaskSchema)
