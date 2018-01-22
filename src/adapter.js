class Adapter {

  static handleFetchQuestions(){
    return fetch('http://localhost:3000/api/v1/questions',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => response.json())
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
  }

  static handleEndGame(){

  }
}
