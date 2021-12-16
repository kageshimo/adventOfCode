import fs = require('fs')

let from: number[][] = []
let to: number[][] = []
let playfield:number[][] = []

let size = 1000

fs.readFile('05-12-2021input.txt', function (err, data) {
    if (err) throw err

    const arr = data.toString().replace(/\r\n/g, '\n').split('\n')

    for (let i of arr) {
        console.log(i)
        const tupels = i.split(' -> ')
        console.log(tupels)

        from.push(tupels[0].split(',').map(Number))
        to.push(tupels[1].split(',').map(Number))
    }

    printFromTo()
    // filterStraights()
    console.log("   -------    ")
    printFromTo()
    console.log("   -------    ")

    initPlayfield(size)
    printPlayfield()
    console.log("   -------    ")
    fillPlayfield()
    printPlayfield()

    console.log("Result: " + countBiggerOne())


})

function countBiggerOne(): number {
    let count = 0
    for (let row of playfield) {
        for (let value of row) {
            if (value > 1) {
                ++count
            }
        }
    }
    return count
}

function printPlayfield(){
    for (let a = 0; a < size; a++) {
        let tp = ""
        for (let b = 0; b < size; b++) {
            tp += " " + (playfield[b][a]==0 ? "." : zeroPad(playfield[b][a], 1))
        }
        console.log(tp)
    }
}

function fillPlayfield() {
    for(let i = 0; i < from.length; i++){
        let a = from[i]
        let b = to[i]

        if (a[0] == b[0]){
            let fromY = a[1]>b[1] ? b[1] : a[1]
            let toY = a[1]<b[1] ? b[1] : a[1]
            for(let j = fromY; j <= toY; j++){
                mark(a[0], j)
            }
        }
        
        if (a[1] == b[1]){
            let fromX = a[0]>b[0] ? b[0] : a[0]
            let toX = a[0]<b[0] ? b[0] : a[0]
            for(let j = fromX; j <= toX; j++){
                mark(j, a[1])
            }
        }

        if (a[0] != b[0] && a[1] != b[1]) {
            let x = a[0]
            let y = a[1]
            mark(x,y)

            while(true){
                if (a[0] < b[0]){
                    x++
                } else {
                    x--
                }
                if (a[1] < b[1]){
                    y++
                } else {
                    y--
                }
                mark(x,y)
                if (x == b[0]){
                    break
                } 
            }
        }
    }
}

function initPlayfield(size: number){
    for(let x = 0; x < size ; x++) {
        playfield.push([])
        for(let y = 0; y < size; y ++) {
            playfield[x].push(0)
        }
    }
}

function mark(x: number, y: number) {
    playfield[x][y] += 1
}


function printFromTo() {
    for (let i = 0; i < from.length; i++) {
        console.log(`${from[i]} -> ${to[i]}`)
    }
}

function filterStraights() {
    const newFrom = []
    const newTo = []

    for (let i = 0; i < from.length; i++) {
        if (from[i][0] == to[i][0] || from[i][1] == to[i][1]) {
            newFrom.push(from[i])
            newTo.push(to[i])
        }
    }

    from = newFrom
    to = newTo
}

function zeroPad(num: number, places: number) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }