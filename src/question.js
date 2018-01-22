const Question = (() => {
  let all = []

  return class Question {
    constructor({id, content, answer}) {
      this.id = id
      this.content = content
      this.answer = answer
      all.push(this)
    }

  renderInnerHTML() {
    return `<div>${this.content}</div>`
  }

  static all() {
    return all
  }
}
})()
