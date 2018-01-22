class Adapter {

  //make API call to create game
    //fetch game class
      //fetch an instance of game with all questions in it and an array of blank responses
      //{
        // game_id: 1,
        // name: "Humzah",
        // score: null,
        // questions: [{Question}, {Question}, {Question}]
        // responses: []
      //}

  static handleStartGame(){

    let data = {name: "Joe"}

    fetch('http://localhost:3000/api/v1/games',
      {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => console.log(response.json()))
    //post to create a new instance of game
    //fetch to get a the new instance
  }

  static handleEndGame(){

  }
}
