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

  static handleFetchGameUpdate(gameId) {
    const url = `http://localhost:3000/api/v1/games/${gameId}`
    return fetch(url,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => response.json())
  }

  static handleFetchResponseCreate(gameId, quesId, isCorrect) {
    let data = {game_id: gameId, question_id: quesId, is_correct: isCorrect}
    return fetch('http://localhost:3000/api/v1/responses',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
  }

  static handleFetchHighScores() {
    return fetch('http://localhost:3000/api/v1/games',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => response.json())
  }
}
