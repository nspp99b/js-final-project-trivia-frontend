const Game = (() => {
  let all = []

  return class Game {
    constructor({id, name, score}) {
      this.id = id
      this.name = name
      this.score = score
      all.push(this)
    }

    renderInnerHTML() {
      return `<div data-id=${this.id}>${this.name}</div>`
    }

    renderFinalScore() {
      return `<div class="end-game">Score: ${this.score}</div>`
    }

    static all() {
      return all
    }
  }
})()
