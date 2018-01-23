const App = (() => {
  return class App {
    static init() {
      //grab some elements
      App.selectGameForm = document.getElementById('game-form')
      App.selectLeftBar = document.getElementById('left-bar')
      App.selectMainBar = document.getElementById('main-bar')
      App.selectLRightBar = document.getElementById('right-bar')
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
      let quesType = document.getElementById('question').className
      if (quesType === "null") {
        $(".is-correct").click(App.isCorrect)
        $(".is-incorrect").click(App.isIncorrect)
      }
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
      App.selectLeftBar.innerHTML = `You're done!`;
      return App.selectMainBar.innerHTML = Game.renderEndGame();
      //call renderEndGame on the current game
      //sends a fetch (patch to current game id)
      //controller computes final score of current game,
      //updates game object and returns json to us
      //we make some html out of that and return it
      //create a button to start a new game,
      //attach listener for that button
    }

  }

})()

$( document ).ready(function() {
    console.log( "ready!" );
    App.init();
});
