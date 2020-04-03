import React, { Component, Fragment } from 'react'
import mastermind from './services/mastermind'
import colorCycle from './services/colorCycle'
import './App.css'

class App extends Component {
  state = {
    gameStarted: false,
    gameOver: false,
    wonGame: false,
    currentCombo: null,
    currentGuess: [],
    previousGuesses: [],
    previousScores: [],
    score: 0,
    turn: 0
  }

  startGame = () => {
    this.setState(
      {
        currentCombo: mastermind.generateCombination(),
        gameStarted: true,
        gameOver: false,
        turn: 1
      },
      () => {
        console.log('currentCombo', this.state.currentCombo)
      }
    )
  }

  handleButtonClick = index => {
    const currentGuess = [...this.state.currentGuess]
    currentGuess[index] = colorCycle()
    this.setState({
      currentGuess
    })
  }

  submitGuess = event => {
    event.preventDefault()

    if (this.state.currentGuess.map(Boolean).length !== 4) return

    const previousGuesses = [
      ...this.state.previousGuesses,
      this.state.currentGuess.join(' ')
    ]

    const scoreArray = mastermind.scoreGuess(this.state.currentGuess)

    const previousScores = [...this.state.previousScores, scoreArray]
    const scoredGuess = scoreArray.reduce((acc, points) => acc + points, 0)

    this.setState(
      {
        score: this.state.score + scoredGuess,
        turn: this.state.turn + 1,
        previousGuesses,
        previousScores,
        currentGuess: []
      },
      () => {
        if (scoredGuess === 8) {
          this.setState({
            wonGame: true
          })
        } else if (this.state.turn === 7) {
          this.resetGame()
        }
      }
    )
  }

  resetGame = () => {
    this.setState({
      turn: 1,
      gameStarted: false,
      currentGuess: [],
      previousGuesses: [],
      gameOver: true,
      wonGame: false
    })
  }

  playAgain = () => {
    this.resetGame()
    this.startGame()
  }

  getScoreColor = score => {
    switch (score) {
      case 2:
        return 'red'
      case 1:
        return 'white'
      default:
        return 'lightgray'
    }
  }

  render() {
    const {
      gameStarted,
      gameOver,
      wonGame,
      score,
      turn,
      previousGuesses,
      previousScores
    } = this.state
    return (
      <div className='Keymaster'>
        {gameOver && (
          <div className='Keymaster__ScoreBoard'>
            <h3>GAME OVER</h3>
            <h3>Score: {score}</h3>
          </div>
        )}

        {gameStarted && (
          <div className='Keymaster__ScoreBoard'>
            <h3>Score: {score}</h3>
            <h2>KEYMASTER</h2>
            <h3>Turn: {turn}/6</h3>
          </div>
        )}

        {!gameStarted && (
          <div className='Keymaster__Splash'>
            <h2>KEYMASTER</h2>
            <button className='Keymaster__StartButton' onClick={this.startGame}>
              start game
            </button>
          </div>
        )}

        {gameStarted && (
          <div>
            {previousGuesses &&
              previousGuesses.map((guess, index) => {
                const guessArray = guess.split(' ')

                const innerDivs = guessArray.map((color, key) => {
                  return (
                    <div
                      key={key}
                      className='Keymaster__Guess_Item'
                      style={{
                        background: color
                      }}
                    />
                  )
                })

                return (
                  <div
                    className='Keymaster__PreviousGuess'
                    key={guess + index}
                    data-turn={index + 1}
                  >
                    {innerDivs}

                    <span className='Keymaster__PreviousGuess__Score'>
                      {previousScores[index].map((score, i) => {
                        return (
                          <span
                            key={i}
                            className='Keymaster__PreviousGuess__ScoreDot'
                            style={{
                              background: this.getScoreColor(score)
                            }}
                          />
                        )
                      })}
                    </span>
                  </div>
                )
              })}

            {!wonGame && (
              <form className='Keymaster__Form' onSubmit={this.submitGuess}>
                <button
                  type='button'
                  style={{
                    background: this.state.currentGuess[0] || 'gray'
                  }}
                  onClick={() => this.handleButtonClick(0)}
                />
                <button
                  type='button'
                  style={{
                    background: this.state.currentGuess[1] || 'gray'
                  }}
                  onClick={() => this.handleButtonClick(1)}
                />
                <button
                  type='button'
                  style={{
                    background: this.state.currentGuess[2] || 'gray'
                  }}
                  onClick={() => this.handleButtonClick(2)}
                />
                <button
                  type='button'
                  style={{
                    background: this.state.currentGuess[3] || 'gray'
                  }}
                  onClick={() => this.handleButtonClick(3)}
                />

                <input
                  type='submit'
                  onClick={this.submitGuess}
                  value='Submit Guess'
                />
              </form>
            )}

            {wonGame && (
              <div>
                <h3>YOU WON!</h3>
                <button onClick={this.playAgain}>Play Again</button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default App
