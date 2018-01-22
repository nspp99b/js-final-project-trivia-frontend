const App = (() => {
  return class App {
    static init() {
        $("#game-form").submit(App.handleStartGame);
        // create question instances and insert into game instances
        //

      //display first question

      //
    }

    static handleStartGame(event){
      event.preventDefault()

      Adapter.handleFetchGame(event)
      .then((jsonGame) => new Game(jsonGame))

      Adapter.handleFetchQuestions()
      .then((json) => {
        for (const obj of json) {
          new Question(obj)
        }
      })
    }
  }

})()

$( document ).ready(function() {
    console.log( "ready!" );
    App.init();

    // document.getElementById("start-game-button").addEventListener('click', Adapter.handleStartGame);
});
