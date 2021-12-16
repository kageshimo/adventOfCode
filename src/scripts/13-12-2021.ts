import fs = require('fs')

let points: boolean[][]
let folds: string[][] = []

let size = 2000

fs.readFile('13-12-2021input.txt', function (err, data) {
    if (err) throw err

    points = createMatrix(size)


    let maxX = 0
    let maxY = 0

    const lines = data.toString().replace(/\r\n/g, '\n').split('\n')

    for (const line of lines) {
        console.log(line)
        let point = line.split(",")
        if (point.length == 2) {
            if (+point[0] > maxX) {
                maxX = +point[0]
            }
            if (+point[1] > maxY) {
                maxY = +point[1]
            }
            points[+point[1]][+point[0]] = true
        }

        if (point.length == 1){
            let fold1 = line.split(" ")
            if (fold1.length == 3){
                console.log(fold1)
                let fold2 = fold1[2].split("=")
                folds.push(fold2)
            }
        }
    }

    // console.log(points)

    compactMatrix()
    printMatrix()
    console.log(folds)

    for (const fold of folds) {
        let fMatrix = foldMatrix(fold)
        points = fMatrix
        compactMatrix()
    }
    printMatrix()

    countDots()
})

function countDots(){
    let result = 0
    for(let line of points) {
        for (let val of line) {
            if(val){
                result++
            }
        }
    }
    console.log(result)
}

function compactMatrix(){
    let maxX = 0
    let maxY = 0
    for (let y = 0; y < points.length; y++) {
        for (let x = 0; x < points[0].length; x++ ){
            if (points[y][x]){
                if (x > maxX) {
                    maxX = x
                }
                if (y > maxY) {
                    maxY =y
                }
            }
        }
    }

    console.log(`maxX ${maxX} - maxY ${maxY}`)

    while(maxY+1 < points.length) {
        points.pop()
    }

    for(let line of points) {
        while(maxX+1 < line.length) {
            line.pop()
        }
    }
}

function foldMatrix(fold: string[]): boolean[][]{
    let result = createMatrix(size)

    for (let y = 0; y < points.length; y++) {
        for (let x = 0; x < points[0].length; x++) {
            if (points[y][x]){
                let newX = x
                let newY = y
                if (fold[0]== "y"){
                    if(y > +fold[1]) {
                        newY = +fold[1] - (y-+fold[1])
                    }
                }
                if (fold[0]== "x"){
                    if(x > +fold[1]) {
                        newX = +fold[1] - (x-+fold[1])
                    }
                }
                result[newY][newX] = true
            }
        }
    }
    return result
}


function createMatrix(size: number): boolean[][]{
    let result: boolean[][] = []
    for(let y = 0; y < size; y++){
        let line: boolean[] = []
        result.push(line)
        for (let x=0; x < size; x++){
            line.push(false)
        }
    }
    return result
}

function printMatrix(){
    for (let line of points) {
        let lineStr = ""
        for(const value of line) {
            if (value){
                lineStr+="*"
            } else {
                lineStr+=" "
            }
        }
        console.log(lineStr)
    }
}