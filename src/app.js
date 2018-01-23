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
        $(".is-correct").click(App.isCorrect)
        // $(".isCorrect-hover").hover(isCorrect)
      })
    }

    static isCorrect(event) {
      event.preventDefault()
      let q = parseInt(document.getElementById('question').dataset.id)
      let current = Question.all().find(question => question.id == q)
      App.selectMainBar.innerHTML = current.renderNextQuestion()
      $(".is-correct").click(App.isCorrect)
    }

    static completeGame() {
      App.selectLeftBar.innerHTML = `<p>You're done!</p>`;
      return "Congrats!";
    }

  }

})()

$( document ).ready(function() {
    console.log( "ready!" );
    App.init();

    // $(".isCorrect").click(isCorrect)
    // $(".isCorrect-hover").hover(isCorrect)

});
