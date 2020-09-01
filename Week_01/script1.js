const datas = [
  [0, 1, 0],
  [0, 2, 0],
  [0, 0, 0],
]
const board = document.getElementById('board')
let color = 1
function move(i, j) {
  if (datas[i][j]) {
    return
  }
  datas[i][j] = color
  if (check(datas, color)) {
    alert(`${color === 1 ? 'o' : 'x'} is win`)
  }
  color = 3 - color
  showboard()
  const iswill = willWin(datas, color)
  if (iswill) {
    alert(`${color === 1 ? 'o' : 'x'} will win`)
  }
}
function check(pattern, color) {
  // row
  const row = pattern.some((arr) => {
    return arr.every((v) => v === color)
  })
  if (row) {
    return true
  }
  // column
  for (let i = 0; i < 3; i++) {
    let flag = true
    for (let j = 0; j < 3; j++) {
      if (pattern[j][i] !== color) {
        flag = false
      }
    }
    if (flag) {
      return true
    }
  }
  // other
  {
    let flag = true
    for (let i = 0; i < 3; i++) {
      if (pattern[i][i] !== color) flag = false
    }
    if (flag) {
      return flag
    }
  }
  {
    let flag = true
    for (let i = 0; i < 3; i++) {
      if (pattern[2 - i][i] !== color) flag = false
    }
    if (flag) {
      return flag
    }
  }
}
function clone(v) {
  return JSON.parse(JSON.stringify(v))
}
function willWin(datas, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (datas[i][j]) continue
      let tmp = clone(datas)
      console.log(color)
      tmp[i][j] = color
      if (check(tmp, color)) {
        return [j, i]
      }
    }
  }
  return null
}
function showboard() {
  board.innerHTML = ''
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const ele = document.createElement('div')
      ele.addEventListener('click', () => {
        move(i, j)
      })
      ele.classList.add('cell')
      ele.innerText = datas[i][j] === 1 ? '○' : datas[i][j] === 2 ? '×' : ''
      board.appendChild(ele)
    }
    board.appendChild(document.createElement('br'))
  }
}
function bestChoice(pattern, color) {
  let p
  if ((p = willWin(pattern, color))) {
    return {
      point: p,
      result: 1,
    }
  }
  let result = -2
  let point = null
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j]) continue
      const tmp = clone(pattern)
      tmp[i][j] = color
      let r = bestChoice(tmp, 3 - color).result
      if (-r > result) {
        result = -r
        point = [j, i]
      }
    }
  }
  return {
    point: point,
    result: point,
    result: 0,
  }
}
showboard()
console.log(bestChoice(datas, color))
