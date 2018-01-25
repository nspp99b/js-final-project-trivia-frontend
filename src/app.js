let index = 0;
const App = (() => {
  return class App {
    static init() {
      //grab some elements
      App.selectGameForm = document.getElementById('game-form')
      App.selectGameHeader = document.getElementById('game-header')
      App.selectMainBar = document.getElementById('main-bar')
      //define some sounds
      App.theme = new Audio('./src/sounds/theme.mp3')
      App.boing = new Audio('./src/sounds/boing.mp3')
      App.chching = new Audio('./src/sounds/chching.mp3')
      App.explosion = new Audio('./src/sounds/explosion.mp3')

      //start theme music
      App.theme.play()
      //add event listener to new game form
      $("#game-form").submit(App.handleStartGame);
    }

    static handleStartGame(event){
      event.preventDefault()
      App.theme.pause()
      App.selectGameForm.style.display = 'none'

      Adapter.handleFetchGame(event)
      .then((jsonGame) => {
        let g = new Game(jsonGame);
        App.selectGameHeader.innerHTML = g.renderInnerHTML()
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
        if ($("#keyboard")) {
          App.startKeyboard();
        }
        if (document.getElementById('tom')) {
          App.startTomQuestion()
        }
      }
    }

    static makeVisibile(image, num){
     image.className = `text-center visible position${num}`
    }

    static makeHidden(image) {
     image.className = `text-center hidden`
    }

    static startTomQuestion() {
      let allImages = document.getElementsByTagName("img")
      let i = 0;

      let vis = setInterval(function() {
         let currentImage = allImages[i++];
         App.makeVisibile(currentImage,i)
         if(i >= allImages.length) i = 0;
      }, 1000);

      let j = 0;
      let invis = setInterval(function() {
         let currentImage = allImages[j++];
         App.makeHidden(currentImage)
         if(j >= allImages.length) j = 0;
      }, 1500);

      let toms = document.getElementsByClassName('tom')

      for (let tom of toms) {
        tom.addEventListener('click', function(){
          clearInterval(invis);
          clearInterval(vis);
        })
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

    static endMinefield(e) {
      App.explosion.play()
      let arr = document.getElementsByClassName('is-incorrect-hover')
      for (let el of arr) {
        el.removeEventListener('pointerenter', App.endMinefield, { once: true});
      }
      setTimeout(function(){App.isIncorrect(e)}, 150)
    }

    static startKeyboard() {
      let arr=document.getElementsByClassName("letter")
      for(let el of arr) {
        el.addEventListener("click", App.keyboardCallback)
      }
    }

    static keyboardCallback(e) {
      e.preventDefault();
      const spelling=["c", "h", "i", "h", "u", "a", "h", "u", "a"];
      App.checkLetters(e, spelling)
    }

    static checkLetters(e, spelling) {
      const key = e.target.innerText;
      if (spelling[index] === key) {
        index = ++index;
        if (index === spelling.length) {
          App.isCorrect(e);
          index=0;
        }
      } else {
        App.isIncorrect(e);
      }
    }

    static isCorrect(event) {
      event.preventDefault()
      let gameId = parseInt(App.selectGameHeader.firstChild.dataset.id)
      let quesId = parseInt(document.getElementById('question').dataset.id)
      let quesObj = Question.all().find(question => question.id == quesId)
      Adapter.handleFetchResponseCreate(gameId, quesId, true)
      App.displayIsCorrectMessage()
      App.selectMainBar.innerHTML = quesObj.renderNextQuestion()
      App.addAnswerListeners()
    }

    static displayIsCorrectMessage() {
      App.chching.play()
      alert("Correct!")
    }

    static displayIncorrectMessage() {
      App.boing.play()
      alert("WRONG!")
    }

    static isIncorrect(event) {
      event.preventDefault()
      let gameId = parseInt(App.selectGameHeader.firstChild.dataset.id)
      let quesId = parseInt(document.getElementById('question').dataset.id)
      let quesObj = Question.all().find(question => question.id == quesId)
      Adapter.handleFetchResponseCreate(gameId, quesId, false)
      App.displayIncorrectMessage()
      App.selectMainBar.innerHTML = quesObj.renderNextQuestion()
      App.addAnswerListeners()
    }

    static completeGame() {
      let gameId = parseInt(App.selectGameHeader.firstChild.dataset.id)
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
