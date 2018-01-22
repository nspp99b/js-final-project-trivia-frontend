const App = (() => {
  //create store for game
  const store = {}
  return class App {
    static init() {
        $("#game-form").submit(Adapter.handleStartGame);
        // create question instances and insert into game instances
        //

      //display first question

      //
    }
  }

})()

$( document ).ready(function() {
    console.log( "ready!" );
    App.init();

    // document.getElementById("start-game-button").addEventListener('click', Adapter.handleStartGame);
});
