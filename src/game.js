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
      return `<div>${this.name}</div>`
    }

    static all() {
      return all
    }
  }
})()
