import Task from "../models/task.js"
import User from "../models/user.js"

export default class ReviewsController {
  static async getAllTasks(req, res, next) {
    try {
      const { emailId } = req.params;
      const user = await User.findOne({emailId: emailId}).populate({path: 'tasks', select: ['name','priority','deadline','completed'], options : {sort: {'priority': -1}}})
      const tasks = user.tasks
      res.status(200).json({ tasks })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

    static async deleteTask(req, res, next) {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID })
        if (!task) {
        return next(`No task with id : ${taskID}`)
            }
        res.status(200).json({ task })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

   static async createTask(req, res, next) {
    try {
      const {emailId } = req.params
      const data = req.body
      const user = await User.findOne({emailId: emailId});
      data.user = user._id
      const task = await Task.create(data)
      await task.save();
        const userById = await User.findOne({emailId: emailId});
        userById.tasks.push(task);
        await userById.save();

      res.status(201).json({ task })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

    static async updateTask(req, res, next) {
    try {
      const { id: taskID } = req.params

      const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
       })

      if (!task) {
      return next(`No task with id : ${taskID}`)
       }

      res.status(200).json({ task })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }


    static async getTask(req, res, next) {
    try {
      const { id: taskID } = req.params
      const task = await Task.findOne({ _id: taskID })
      if (!task) {
      return next(`No task with id : ${taskID}`)
      }

      res.status(200).json({ task })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

   static async sendReminder () {
   const tasks = await Task.find()
   await Promise.all(tasks.map(async (task) => {
    const user = await User.findById(task.user)
    console.log(user.emailId)


    //      if(d.getMonth()===d1.getMonth() && d.getFullYear() ===d1.getFullYear() && d.getDate()===d1.getDate()){
//       sendmail({
//     from: 'hailtotheripped@hotmail.com',
//     to: '@qq.com, test@sohu.com, test@163.com ',
//     subject: 'test sendmail',
//     html: 'Mail of test sendmail ',
//   }, function(err, reply) {
//     console.log(err && err.stack);
//     console.dir(reply);
// });
//      }


  }));

   
}

}
