import fs = require('fs')

const grid: number[][] = []

let flashes = 0

fs.readFile('11-12-2021input.txt', function (err, data) {
    if (err) throw err

    const lines = data.toString().replace(/\r\n/g, '\n').split('\n')

    for (const line of lines) {
        let lineArray: number[] = []
        grid.push(lineArray)
        for (let i = 0; i < line.length; i++) {
            lineArray.push(+line.charAt(i))
        }
    }

    let maxY = grid.length
    let maxX = grid[0].length
    printGrid()

    for (let step = 1; step < 2001; step++) {    
        for (let x = 0; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                incValue(x, y)
            }
        }

        let didFlash = false

        do {
            didFlash = false
            for (let x = 0; x < maxX; x++) {
                for (let y = 0; y < maxY; y++) {
                    didFlash ||= flash(x, y)
                }
            }
        } while (didFlash)

        if (allFlash()){
            console.log("EVERYTHING HAS FLASHED")
            console.log(`Step: ${step} - Flashes: ${flashes}`)
            step = 10000
        }

        for (let x = 0; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                reset(x, y)
            }
        }
        printGrid()
        console.log(`Step: ${step} - Flashes: ${flashes}`)
    }
})



function findValue(x: number, y: number): number {
    if (x <= -1 || x >= grid[0].length || y <= -1 || y >= grid.length) {
        return 9
    }
    return grid[y][x]
}

function incValue(x: number, y: number): void {
    if (x <= -1 || x >= grid[0].length || y <= -1 || y >= grid.length) {
        return
    }
    grid[y][x] = grid[y][x] + 1
}

function flash(x: number, y: number): boolean {
    if (findValue(x, y) > 9) {
        grid[y][x] = -1000
        flashes++
        incValue(x-1, y-1)
        incValue(x, y-1)
        incValue(x+1, y-1)
        incValue(x-1, y)
        incValue(x+1, y)
        incValue(x-1, y+1)
        incValue(x, y+1)
        incValue(x+1, y+1)
        return true
    }
    return false
}

function reset(x: number, y: number): void {
    if (x <= -1 || x >= grid[0].length || y <= -1 || y >= grid.length) {
        return
    }
    if (findValue(x, y) < 0) {
        grid[y][x] = 0
    }
}

function allFlash(): boolean {
    let maxY = grid.length
    let maxX = grid[0].length
    let flashed = true
    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            flashed &&= findValue(x,y) < 0
        }
    }
    return flashed
}

function printGrid(){
    for(let line of grid) {
        console.log(`${line[0]}${line[1]}${line[2]}${line[3]}${line[4]}${line[5]}${line[6]}${line[7]}${line[8]}${line[9]}`)
    }
    console.log("")
}