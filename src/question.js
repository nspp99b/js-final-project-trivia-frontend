const Question = (() => {
  let all = []

  return class Question {
    constructor({id, content, answer, category}) {
      this.id = id
      this.content = content
      this.answer = answer
      this.category = category
      all.push(this)
    }

  renderInnerHTML() {
    return `<div class="${this.category}" id="question" data-id="${this.id}">${this.content}</div>
    <div class="is-correct">Right Answer</div>
    <div class="is-incorrect">Wrong Answer</div>`
  }

  static all() {
    return all
  }

  renderNextQuestion() {
    if (this.id < Question.all().length) {
      return Question.all()[this.id].renderInnerHTML();
    } else {
      return App.completeGame()
    }

  }
}
})()
