class App {
  static init() {
    //create store for game

      // create question instances and insert into game instances
      //

    //display first question

    //
  }
}

$( document ).ready(function() {
    console.log( "ready!" );
    App.init();
    $("#start-game-button").click(Adapter.handleStartGame);
    // document.getElementById("start-game-button").addEventListener('click', Adapter.handleStartGame);
});
