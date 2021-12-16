import fs = require('fs')

let template: string [] = []
let transitions: string[][] = []

fs.readFile('14-12-2021inputEx.txt', function (err, data) {
    if (err) throw err

    const lines = data.toString().replace(/\r\n/g, '\n').split('\n')

    template = lines[0].split('')

    for (const line of lines) {
        let trans = line.split(" -> ")
        if (trans.length == 2) {
            transitions.push(trans)
        }
    }

    console.log("Template: " + template)
    console.log("Transitions: ")
    console.log(transitions)


    for (let step = 1; step < 26; step++) {
        let result = []
        for (let i = 0; i < template.length - 1; i++) {
            let pair = template[i] + template[i+1] // template.substr(i, 2)
            result.push(pair.charAt(0))
            for (let transition of transitions) {
                if (transition[0] == pair) {
                    result.push(transition[1])
                }
            }  
        }
        result.push(template[template.length-1])
        template = result
        console.log("Finished Step: " + step)
    }

    let amounts:any = {}
    for (let i = 0; i < template.length; i++) {
        let ch = template[i]

        if (amounts[ch] == undefined){
            amounts[ch] = 0
        }
        amounts[ch] += 1
    }
    console.log(amounts)

    let min = 9999999999999
    let max = 0

    for (let ch in amounts){
        if (amounts[ch] < min){
            min = amounts[ch]
        }
        if (amounts[ch] > max){
            max = amounts[ch]
        }
    }

    console.log(max-min)

})

// setx NODE_OPTIONS "--max-old-space-size=8192" /m