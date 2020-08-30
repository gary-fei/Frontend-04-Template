const datas = [
  [1, 0, 0],
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
  if (check(datas)) {
    alert(color === 1 ? 'o' : 'x')
  }
  color = 3 - color
  showboard()
  if (willWin(datas)) {
    console.log(win)
    alert(color === 1 ? 'o' : 'x')
  }
}
function check(pattern) {
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
function willWin(datas) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (datas[i][j]) continue
      let tmp = clone(datas)
      if (check(tmp)) {
        return true
      }
    }
  }
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
showboard()
