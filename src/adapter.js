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

  static handleStartGame(event){
    event.preventDefault()
    Adapter.handleFetchGame(event)
    Adapter.handleFetchQuestions()
  }

  static handleFetchQuestions(){
    return fetch('http://localhost:3000/api/v1/questions',
      {
        //method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }//,
        //body: JSON.stringify(data)
      }).then(response => console.log(response.json()))
  }

  static handleFetchGame(event){
    let data = {name: event.target.username.value}
    return fetch('http://localhost:3000/api/v1/games',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => response.json())
    //post to create a new instance of game
    //fetch to get a the new instance
  }

  static handleEndGame(){

  }
}
