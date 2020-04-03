import { BLUE, GREEN, ORANGE, RED, YELLOW, WHITE } from '../constants'

class Mastermind {
  colors = [BLUE, GREEN, ORANGE, RED, YELLOW, WHITE]
  currentCombo = null

  generateCombination = () => {
    this.currentCombo = this.shuffle(this.colors).splice(0, 4)
    return this.currentCombo
  }

  scoreGuess = currentGuess => {
    if (currentGuess === '') return

    const whiteScore = this.scoreWhite(currentGuess)
    const redScore = this.scoreRed(currentGuess)

    return this.combineScores(redScore, whiteScore)
  }

  scoreWhite = currentGuess => {
    const scoredGuess = currentGuess.map(item => {
      return this.currentCombo.includes(item) ? 1 : 0
    })
    return scoredGuess
  }

  scoreRed = currentGuess => {
    const scoredGuess = currentGuess.map((item, index) => {
      return this.currentCombo[index] === item ? 2 : 0
    })
    return scoredGuess
  }

  combineScores = (redScore, whiteScore) => {
    const combinedScores = Array.from(new Array(4)).reduce(
      (acc, item, index) => {
        acc[index] =
          redScore[index] === 2
            ? redScore[index]
            : whiteScore[index] === 1
            ? whiteScore[index]
            : 0
        return acc
      },
      []
    )
    return this.shuffle(combinedScores)
  }

  shuffle = oldArr => {
    let arr = [...oldArr]

    let ctr = arr.length,
      temp,
      index

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr)
      // Decrease ctr by 1
      ctr--
      // And swap the last element with it
      temp = arr[ctr]
      arr[ctr] = arr[index]
      arr[index] = temp
    }
    return arr
  }
}

export default new Mastermind()
