let index = 0;
const App = (() => {
  return class App {
    static init() {
      //grab some elements
      App.selectGameForm = document.getElementById('game-form')
      App.selectLeftBar = document.getElementById('left-bar')
      App.selectMainBar = document.getElementById('main-bar')
      //add event listener to new game form
      $("#game-form").submit(App.handleStartGame);
    }

    static handleStartGame(event){
      event.preventDefault()
      App.selectGameForm.style.display = 'none'

      Adapter.handleFetchGame(event)
      .then((jsonGame) => {
        let g = new Game(jsonGame);
        App.selectLeftBar.innerHTML = g.renderInnerHTML()
      })

      Adapter.handleFetchQuestions()
      .then((json) => {
        for (const obj of json) {
          new Question(obj)
        }
        let q = Question.all()[0]
        App.selectMainBar.innerHTML = q.renderInnerHTML()
        App.addAnswerListeners()
      })
    }

    static addAnswerListeners() {
      if (document.getElementById('question')) {
        if (document.getElementsByClassName('is-correct')) {
          $(".is-correct").click(App.isCorrect)
        }
        if (document.getElementsByClassName('is-incorrect')) {
          $(".is-incorrect").click(App.isIncorrect)
        }
        if ($(".start-maze-hover")) {
          $(".start-maze-hover").hover(App.startMaze)
        }
        if (document.getElementById("start-minefield")) {
          document.addEventListener('pointermove', App.startMinefield, { once: true} )
        }
      }
    }


    static startMaze() {
      document.getElementById('end').addEventListener('pointerenter', App.isCorrect)
      let arr = document.getElementsByClassName('is-incorrect-hover')
      for (let el of arr) {
        el.addEventListener('pointerenter', App.endMaze, { once: true})
      }
    }

    static endMaze(e){
      let arr = document.getElementsByClassName('is-incorrect-hover')
      for (let el of arr) {
        el.removeEventListener('pointerenter', App.endMaze, { once: true})
      }
      App.isIncorrect(e);
    }

    static startMinefield() {
      document.getElementById('flag').addEventListener('pointerenter', App.isCorrect)
      let arr = document.getElementsByClassName('is-incorrect-hover')
      for (let el of arr) {
        el.addEventListener('pointerenter', App.endMinefield, { once: true})
      }
    }

    static endMinefield(e){
      let arr = document.getElementsByClassName('is-incorrect-hover')
      for (let el of arr) {
        el.removeEventListener('pointerenter', App.endMinefield, { once: true});
      }
      setTimeout(function(){App.isIncorrect(e)}, 150)
    }

    static isCorrect(event) {
      event.preventDefault()
      let gameId = parseInt(App.selectLeftBar.firstChild.dataset.id)
      let quesId = parseInt(document.getElementById('question').dataset.id)
      let quesObj = Question.all().find(question => question.id == quesId)
      Adapter.handleFetchResponseCreate(gameId, quesId, true)
      App.displayIsCorrectMessage()
      App.selectMainBar.innerHTML = quesObj.renderNextQuestion()
      App.addAnswerListeners()
    }

    static displayIsCorrectMessage() {
      alert("Correct!")
    }

    static displayIncorrectMessage() {
      alert("WRONG!")
    }

    static isIncorrect(event) {
      event.preventDefault()
      let gameId = parseInt(App.selectLeftBar.firstChild.dataset.id)
      let quesId = parseInt(document.getElementById('question').dataset.id)
      let quesObj = Question.all().find(question => question.id == quesId)
      Adapter.handleFetchResponseCreate(gameId, quesId, false)
      App.displayIncorrectMessage()
      App.selectMainBar.innerHTML = quesObj.renderNextQuestion()
      App.addAnswerListeners()
    }

    static completeGame() {
      let gameId = parseInt(App.selectLeftBar.firstChild.dataset.id)
      let gameObj = Game.all().find(g => g.id == gameId)
      let newGameButton = document.createElement('button')
      newGameButton.type = "button"
      newGameButton.innerText = "Start New Game"

      Adapter.handleFetchGameUpdate(gameId)
        .then((jsonGame) => {
          gameObj.score = jsonGame.score
          App.selectMainBar.innerHTML = gameObj.renderFinalScore()
          App.selectMainBar.appendChild(newGameButton)
          newGameButton.addEventListener('click', App.handleWindowReload)
        })
    }

    static handleWindowReload() {
      location.reload()
    }

  }

})()

$( document ).ready(function() {
    console.log( "ready!" );
    App.init();
});
