import fs = require('fs')

fs.readFile('08-12-2021input.txt', function (err, data) {
    if (err) throw err

    const lines = data.toString().replace(/\r\n/g, '\n').split('\n')
    const inputs: Input[] = []

    for (const line of lines) {
        inputs.push(new Input(line))
    }

    let count = 0
    for (const input of inputs) {
        count += input.count1478s()
    }
    console.log(count)

    let sum = 0
    for (const input of inputs) {
        sum += input.outputValue()
    }
    console.log(sum)
})

class Input {

    private wires: string[]
    private segmentsStr: string[]
    private displayedValues: number[] = [-1, -1, -1, -1]

    constructor(inputStr: string) {
        const wiresVSegments = inputStr.split(" | ")
        const wiresStr = this.sortStringParts(wiresVSegments[0])
        this.wires = wiresStr.split(" ")

        const segemntsStr = this.sortStringParts(wiresVSegments[1])
        this.segmentsStr = segemntsStr.split(" ")
        this.parseSegments()
    }

    public outputValue(): number{
        return (this.displayedValues[0]*1000) + (this.displayedValues[1]*100)
        + (this.displayedValues[2]*10) + (this.displayedValues[3])
    }

    private sortStringParts(str: string): string {
        const parts = str.split(" ")
        let result = ""
        for (const part of parts) {
            let charArr = Array.from(part)
            charArr = charArr.sort()
            result += charArr.join("")
            result += " "
        }
        return result.trim()
    }




    /*
 0000
1    2
1    2
 3333
4    5
4    5
 6666
    */

    private parseSegments() {
        const sortedWires = this.wires.sort((element1, element2) => { return element1.length - element2.length; })
        let wiresToNumbers: any = {}
        let segmentToWire: any = [[], [], [], [], [], [], []]
        for (let i = 0; i < 10; i++) {
            const wireBundle = sortedWires[i]

            if (wireBundle.length == 2) {
                wiresToNumbers[wireBundle] = 1
                segmentToWire[2].push(...Array.from(wireBundle))
                segmentToWire[5].push(...Array.from(wireBundle))
            }
            if (wireBundle.length == 3) {
                wiresToNumbers[wireBundle] = 7
                let wiresArr = Array.from(wireBundle)
                for (let singleWire of wiresArr) {
                    if (segmentToWire[2].indexOf(singleWire) == -1) {
                        segmentToWire[0].push(singleWire)
                    }
                }
            }
            if (wireBundle.length == 4) {
                wiresToNumbers[wireBundle] = 4
                let wiresArr = Array.from(wireBundle)
                for (let singleWire of wiresArr) {
                    if (segmentToWire[2].indexOf(singleWire) == -1) {
                        segmentToWire[1].push(singleWire)
                        segmentToWire[3].push(singleWire)
                    }
                }
            }


            if (wireBundle.length == 5) {

                // Suche 3
                let wiresArr = Array.from(wireBundle)
                let hits = 0
                for (let singleWire of wiresArr) {
                    if (segmentToWire[2].indexOf(singleWire) > -1) {
                        hits++
                    }
                }
                // Hab die 3
                if (hits == 2) {
                    wiresToNumbers[wireBundle] = 3
                    let leftOvers = []
                    for (const singleWire of wireBundle) {
                        if (segmentToWire[0].indexOf(singleWire) > -1) {
                            continue
                        } else {
                            if (segmentToWire[2].indexOf(singleWire) > -1) {
                                continue
                            } else {
                                leftOvers.push(singleWire)
                            }
                        }
                    }

                    for (const lo of leftOvers) {
                        let hit = segmentToWire[3].filter((val: any) => val === lo)

                        if (hit.length > 0) {
                            segmentToWire[3] = hit
                            segmentToWire[6] = leftOvers.filter((val: any) => val !== segmentToWire[3][0])
                        }
                    }
                    segmentToWire[1] = segmentToWire[1].filter((val: any) => val != segmentToWire[3][0])
                }
            }           
        }

        for (let i = 0; i < 10; i++) {
            const wireBundle = sortedWires[i]
            
            if (wireBundle.length == 5) {
                let wiresArr = Array.from(wireBundle)

                // Suche 5
                for (const singleWire of wiresArr) {
                    if (segmentToWire[1].indexOf(singleWire) > -1) {
                        wiresToNumbers[wireBundle] = 5
                        for (const sw of wiresArr) {
                            if (segmentToWire[5].indexOf(sw) > -1) {
                                segmentToWire[5] = [sw]
                                segmentToWire[2] = segmentToWire[2].filter((val: any) => val !== sw)
                            }
                        }
                    }
                }

                // Suche 2
                for (const singleWire of wiresArr) {
                    if (segmentToWire[0].indexOf(singleWire) == -1){
                        if (segmentToWire[1].indexOf(singleWire) == -1){
                            if (segmentToWire[2].indexOf(singleWire) == -1){
                                if (segmentToWire[3].indexOf(singleWire) == -1){
                                    if (segmentToWire[5].indexOf(singleWire) == -1){
                                        if (segmentToWire[6].indexOf(singleWire) == -1){
                                            wiresToNumbers[wireBundle] = 2
                                            segmentToWire[4] = [singleWire]
                                        }
                                    }
                                }
                            }
                        }    
                    }
                }

            }

            if (wireBundle.length == 7) {
                wiresToNumbers[wireBundle] = 8
            }
        }

        for (let i = 0; i < 10; i++) {
            const wireBundle = sortedWires[i]
            
            if (wireBundle.length == 6) {
                let wiresArr = Array.from(wireBundle)

                // suche 9
                let lostSegment = segmentToWire[4][0]
                if (wiresArr.indexOf(lostSegment) == -1){
                    wiresToNumbers[wireBundle] = 9
                }

                // suche 6
                lostSegment = segmentToWire[2][0]
                if (wiresArr.indexOf(lostSegment) == -1){
                    wiresToNumbers[wireBundle] = 6
                }

                // suche 0
                lostSegment = segmentToWire[3][0]
                if (wiresArr.indexOf(lostSegment) == -1){
                    wiresToNumbers[wireBundle] = 0
                }
            }
        }


        for (let i = 0; i < 4; i++) {
            const segment = this.segmentsStr[i]
            let value = wiresToNumbers[segment]
            this.displayedValues[i] = value
        }
    }

    public count1478s(): number {
        let count = 0
        for (const value of this.displayedValues) {
            if (value == 1 || value == 4 || value == 7 || value == 8) {
                count++
            }
        }
        return count
    }
}