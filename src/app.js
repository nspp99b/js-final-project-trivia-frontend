const App = (() => {
  return class App {
    static init() {
      //grab some elements
      App.selectGameForm = document.getElementById('game-form')
      App.selectLeftBar = document.getElementById('left-bar')
      App.selectMainBar = document.getElementById('main-bar')
      App.selectLRightBar = document.getElementById('right-bar')
      //add event listener to form
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
      $(".is-correct").click(App.isCorrect)
      $(".is-incorrect").click(App.isIncorrect)
    }

    static isCorrect(event) {
      event.preventDefault()
      let q = parseInt(document.getElementById('question').dataset.id)
      let current = Question.all().find(question => question.id == q)
      App.displayIsCorrectMessage()
      App.selectMainBar.innerHTML = current.renderNextQuestion()
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
      App.displayIncorrectMessage()
      App.completeGame()
    }

    static completeGame() {
      App.selectLeftBar.innerHTML = `You're done!`;
      return App.selectMainBar.innerHTML = "GAME OVER";
    }

  }

})()

$( document ).ready(function() {
    console.log( "ready!" );
    App.init();
});
