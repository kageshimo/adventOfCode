import fs = require('fs')

fs.readFile('10-12-2021input.txt', function (err, data) {
    if (err) throw err

    const lines = data.toString().replace(/\r\n/g, '\n').split('\n')

    let stack: string[] = []

    let result = 0

    let completionScores = []

    for (const line of lines) {
        stack = []
        for (let i = 0; i < line.length; i++) {
            let ch = line.charAt(i)

            if (ch == "(" || ch == "[" || ch == "{" || ch == "<") {
                let exp: string =""
                if (ch == "(") {
                    exp = ")"
                }
                if (ch == "[") {
                    exp = "]"
                }
                if (ch == "{") {
                    exp = "}"
                }
                if (ch == "<") {
                    exp = ">"
                }
                stack.push(exp)
            }
            if (ch == ")" || ch == "]" || ch == "}" || ch == ">") {
                let exp = stack.pop()

                // console.log("Expected: " + exp)
                if (exp != ch) {
                    console.log(`Expected ${exp}, but found ${ch} instead`)

                    if (ch == ")") {
                        result += 3
                    }
                    if (ch == "]") {
                        result += 57
                    }
                    if (ch == "}") {
                        result += 1197
                    }
                    if (ch == ">") {
                        result += 25137
                    }
                    break
                }   
            }
            if (i == line.length - 1) {
                console.log(stack)
                let score = 0
                for (let i = stack.length-1; i>=0 ; i--){
                    score = score * 5
                    let delimiter = stack[i]
                    if (delimiter == ")") {
                        score +=1
                    }
                    if (delimiter == "]") {
                        score +=2
                    }
                    if (delimiter == "}") {
                        score +=3
                    }
                    if (delimiter == ">") {
                        score +=4
                    }
                }
                console.log(`score: ${score}`)
                completionScores.push(score)
            }
        }
        console.log("--------------")
    }
    console.log("Result: " + result)

    console.log("CopletionScores.size = "+ completionScores.length)
    completionScores.sort((a,b) => a>b ? 1:-1)
    console.log(completionScores)
    let completion = completionScores[Math.floor(completionScores.length / 2)]
    console.log(completion)
})