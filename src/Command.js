class Command {
  /**
   * Command
   * @param {string|RegExp} hears
   * @param {Array<Method>} methods
   */
  constructor (hears, methods) {
    this.hears = hears
    this.methods = methods
  }
}

module.exports = Command
