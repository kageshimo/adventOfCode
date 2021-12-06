import fs = require('fs')

fs.readFile('04-12-2021input.txt', function(err, data) {
    if(err) throw err

    const arr = data.toString().replace(/\r\n/g,'\n').split('\n')

    for(let i of arr) {
        console.log(i)
    }

    const draws = arr[0].split(',')
    // console.log(draws)

    let boards: BingoBoard[] = []
    let currentBoard = new BingoBoard

    for(let i = 2; i<arr.length; i++){
        let rowStr = arr[i].replace(/\s\s/g, ' ')
        rowStr = rowStr.replace(/^\s/g, '')
        console.log(rowStr)
        const values = rowStr.split(' ')
        if (values.length > 1){
            const row = []
            for (const v of values){
                row.push(new BingoValue(+v))
            }
            currentBoard.rows.push(row)
        } else {

            boards.push(currentBoard)
            currentBoard = new BingoBoard
        }
    }


    for(const board of boards){
        board.print()
        console.log("   ----   ")
    }

    // console.log(boards)

    for (const draw of draws){
        console.log('  -------------   ')
        console.log('Drawn Number: ' + draw)
        for (const board of boards){
            if (board.winner){
                continue
            }
            
            board.draw(+draw)
            
            if (board.winner){
                console.log('    Winner: ' + (1 + boards.indexOf(board) ))
                board.print()
                console.log('Sum of unmarked: ' + board.sumUmmarked())
                console.log('ResultValue: ' + (board.sumUmmarked() * +draw))
            }
            
        }
        console.log('  -------------   ')
    }
})

class BingoValue {
    constructor(
        public value: number,
        public hit: boolean = false,
    ) { }
}

class BingoBoard {
    public rows: BingoValue[][] = []

    public winner: boolean = false

    public sumUmmarked(): number {
        let sum = 0
        for (const row of this.rows){
            for (let value of row){
                if(!value.hit) {
                    sum += value.value
                }
            }
        }
        return sum
    }

    public draw(draw: number): boolean{
        for (const row of this.rows){
            for (let value of row){
                if (draw == value.value){
                    value.hit = true
                }
            }
        }

        // check for winner
        for (const row of this.rows){
            let winner = true
            for (let value of row){
                winner &&= value.hit
            }
            if (winner){
                this.winner = true
                return true
            }
        }

        for(let i = 0; i<5; i++){
            let winner = true
            for (const row of this.rows){
                winner &&= row[i].hit
            }
            if (winner){
                this.winner = true
                return true
            }
        }

        return false
    }

    public print(): void {
        for (const row of this.rows){
            let printstr = ""
            for (const val of row){
                printstr += ` ${val.hit? "-" : " "}${val.value<10? "0" : ""}${val.value}${val.hit? "-" : " "}`
            }
            console.log(printstr)
        }
    }
}