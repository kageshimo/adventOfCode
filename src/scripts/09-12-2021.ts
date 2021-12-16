import fs = require('fs')

let grid: number[][] = []
let countedForBasin: string[] = []
let basinSizes: number[] = []

fs.readFile('09-12-2021input.txt', function (err, data) {
    if (err) throw err

    const lines = data.toString().replace(/\r\n/g, '\n').split('\n')

    for (const line of lines){
        let lineArray: number[] = []
        grid.push(lineArray)
        for (let i = 0; i < line.length; i++){
            lineArray.push(+line.charAt(i))
        }
    }

    let hotspotValue = 0
    for (let y = 0; y < grid.length; y ++){
        for (let x = 0; x < grid[y].length; x ++){
            let value = findValue(x, y)
            let left = findValue(x-1, y)
            let top = findValue(x, y-1)
            let right = findValue(x+1, y)
            let bottom = findValue(x, y+1)
            // console.log(`value: ${value} , left ${left}, top ${top}, right ${right}, bottom ${bottom} `)
            if (left > value && top > value && right > value && bottom > value) {
                console.log("Found low point: " + value)
                hotspotValue += value + 1
            }
        }
        console.log(" --------- ")
    }

    console.log("HotSpot value = " + hotspotValue)
    console.log(" --------- ")
    
    for (let y = 0; y < grid.length; y ++){
        for (let x = 0; x < grid[y].length; x ++){
            let value = findValue(x, y)

            let left = findValue(x-1, y)
            let top = findValue(x, y-1)
            let right = findValue(x+1, y)
            let bottom = findValue(x, y+1)
            
            if (left > value && top > value && right > value && bottom > value) {
                console.log("Found low point: " + value)
                countedForBasin = [] 
                let basinSize = findBasin(x, y)
                console.log("basinSize: "+ basinSize)
                basinSizes.push(basinSize)
            }
        }
    }
    basinSizes.sort(( a, b ) => a > b ? -1 : 1)
    let result = 1
    for (let i = 0 ; i < 3; i++ ) {
        result *= basinSizes[i]
    }
    console.log("Result: " + result)

})

function findValue(x: number, y: number): number {
    if (x <= -1 || x >= grid[0].length  || y <= -1 || y >= grid.length ){
        return 9
    }
    return grid[y][x]
}

function findBasin(x: number, y: number): number {
    let value = findValue(x, y)
    if (value == 9) {
        return 0
    }

    // console.log(countedForBasin)
    if (countedForBasin.indexOf(""+x+""+y) >= 0){
        return 0
    } 

    let result = 1
    countedForBasin.push(""+x+""+y)
    
    let left = findValue(x-1, y)
    if (left > value && left < 9){
        result += findBasin(x - 1, y)
    }

    let top = findValue(x, y-1)
    if (top > value && top < 9){
        result += findBasin(x, y - 1)
    }

    let right = findValue(x+1, y)
    if (right > value && right < 9){
        result += findBasin(x + 1, y)
    }

    let bottom = findValue(x, y+1)
    if (bottom > value && bottom < 9){
        result += findBasin(x, y + 1)
    }

    return result
}