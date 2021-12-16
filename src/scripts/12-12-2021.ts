import fs = require('fs')

let connections: string[][] = []

let pathes = 0

fs.readFile('12-12-2021input.txt', function (err, data) {
    if (err) throw err

    const lines = data.toString().replace(/\r\n/g, '\n').split('\n')

    for (const line of lines) {
        let con = line.split("-")
        connections.push(con)
        connections.push([con[1], con[0]])
    }

    console.log(connections)

    for (let connection of connections){
        if (connection[0] == "start" ) {
            //console.log("starting")
            //console.log(connection)
            let stack = []
            stack.push(connection[0])
            // drive(connection, stack) 
            driveWithSpare(connection, stack, false) 
        }
    }

    console.log(pathes)
})

function drive(connection: string[], stack: string[]) {
    let destination = connection[1]
    if (!isUpperCase(destination)) {
        for(let waypoint of stack) {
            if (waypoint == destination)  {
                /*
                console.log("Sackgasse ")
                console.log(connection)
                console.log(stack)
                */
                
                return
            }
        }
    }

    stack.push(destination)
    if (destination == "end") {
        // console.log("ERFOLGREICH PASSIERT ")
        // console.log(stack)
        pathes++
        return
    }

    for (let conn of connections){
        if (conn[0] == destination) {
            let newStack: string[] = []
            newStack.push(...stack)
            drive(conn, newStack) 
        }
    }
}


function driveWithSpare(connection: string[], stack: string[], usedSpare: boolean) {
    let destination = connection[1]
    if (!isUpperCase(destination)) {
        for(let waypoint of stack) {
            if (destination == "start" ) {
                return
            }

            if (waypoint == destination)  {

                if (usedSpare) {
                    return
                } else {
                    usedSpare = true
                }

            }
        }
    }

    stack.push(destination)
    if (destination == "end") {
        // console.log("ERFOLGREICH PASSIERT ")
        // console.log(stack)
        pathes++
        return
    }

    for (let conn of connections){
        if (conn[0] == destination) {
            let newStack: string[] = []
            newStack.push(...stack)
            driveWithSpare(conn, newStack, usedSpare) 
        }
    }
}


function isUpperCase(str: string) {
    return str === str.toUpperCase();
 }