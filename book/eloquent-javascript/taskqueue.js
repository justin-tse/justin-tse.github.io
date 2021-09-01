class TaskQueue {
  constructor() {
    this.tasks = []
    this.taskRunning = false
  }

  addTask(taskFunc) {
    if (this.taskRunning) {
      this.tasks.push(taskFunc)
    } else {
      this.taskRunning = true

      var nextFunc = () => {
        if (this.tasks.length) {
          var task = this.tasks.shift()
          task(nextFunc)
        } else {
          this.taskRunning = false
        }
      }

      taskFunc(nextFunc)
    }
    return this
  }
}


class TaskQueue {
  constructor() {
    this.tasks = []
    this.taskRunning = false
  }

  addTask(taskFunc) {
    var that = this
    var self = this
    if (this.taskRunning) {
      this.tasks.push(taskFunc)
    } else {
      this.taskRunning = true

      function 开始下一个任务() {
        if (self.tasks.length) {
          var task = self.tasks.shift()
          task(开始下一个任务)
        } else {
          self.taskRunning = false
        }
      }

      taskFunc(开始下一个任务)
    }
    return this
  }
}


class TaskQueue {
  constructor() {
    this.tasks = []
    this.taskRunning = false

    this.startNewTask = () => {
      if (this.tasks.length) {
        var task = this.tasks.shift()
        task(this.startNewTask)
      } else {
        this.taskRunning = false
      }
    }
  }

  addTask(task) {
    if (this.taskRunning) {
      this.tasks.push(task)
    } else {
      this.taskRunning = true
      task(this.startNewTask)
    }
    return this
  }
}

// 最终版本：带并行数量限制的版本   字节面试原题
class TaskQueue {
  constructor(limit = 1) {
    this.limit = limit
    this.tasks = []
    this.runningCount = 0

    this.startNewTask = () => {
      if (this.tasks.length) {
        var task = this.tasks.shift()
        task(this.startNewTask)
      } else {
        this.runningCount--
      }
    }
  }

  addTask(task) {
    if (this.runningCount >= this.limit) {
      this.tasks.push(task)
    } else {
      this.runningCount++
      task(this.startNewTask)
    }
    return this
  }
}
