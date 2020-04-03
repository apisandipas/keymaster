import { BLUE, GREEN, ORANGE, RED, YELLOW, WHITE } from '../constants'

let index = 0
const colors = [BLUE, GREEN, ORANGE, RED, YELLOW, WHITE]

const colorCycle = () => {
  const color = colors[index < colors.length ? index : (index = 0)]
  index++
  return color
}

export default colorCycle
