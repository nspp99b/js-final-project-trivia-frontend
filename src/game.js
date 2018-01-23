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

    renderEndGame() {
      Adapter.handleFetchGameUpdate(this.id)
        .then((jsonGame) => {
          console.log(this)
          let g = new Game(jsonGame);
          App.selectLeftBar.innerHTML = g.renderInnerHTML()
        })
    }

    static all() {
      return all
    }
  }
})()
