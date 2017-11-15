class Command {
  /**
   * Command
   * @param {string|RegExp} trigger
   * @param {Array<Method>} methods
   */
  constructor (trigger, methods) {
    this.trigger = trigger
    this.methods = methods
  }
}

module.exports = Command
