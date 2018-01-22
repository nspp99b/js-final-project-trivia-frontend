const Game = (() => {
  let all = []

  return class Game {
    constructor({id, name, score}) {
      this.id = id
      this.name = name
      this.score = score
      all.push(this)
    }

    static all() {
      return all
    }
  }
})()
