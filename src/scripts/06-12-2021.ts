// let seed = [3, 4, 3, 1, 2]
let seed = [5,1,4,1,5,1,1,5,4,4,4,4,5,1,2,2,1,3,4,1,1,5,1,5,2,2,2,2,1,4,2,4,3,3,3,3,1,1,1,4,3,4,3,1,2,1,5,1,1,4,3,3,1,5,3,4,1,1,3,5,2,4,1,5,3,3,5,4,2,2,3,2,1,1,4,1,2,4,4,2,1,4,3,3,4,4,5,3,4,5,1,1,3,2,5,1,5,1,1,5,2,1,1,4,3,2,5,2,1,1,4,1,5,5,3,4,1,5,4,5,3,1,1,1,4,5,3,1,1,1,5,3,3,5,1,4,1,1,3,2,4,1,3,1,4,5,5,1,4,4,4,2,2,5,5,5,5,5,1,2,3,1,1,2,2,2,2,4,4,1,5,4,5,2,1,2,5,4,4,3,2,1,5,1,4,5,1,4,3,4,1,3,1,5,5,3,1,1,5,1,1,1,2,1,2,2,1,4,3,2,4,4,4,3,1,1,1,5,5,5,3,2,5,2,1,1,5,4,1,2,1,1,1,1,1,2,1,1,4,2,1,3,4,2,3,1,2,2,3,3,4,3,5,4,1,3,1,1,1,2,5,2,4,5,2,3,3,2,1,2,1,1,2,5,3,1,5,2,2,5,1,3,3,2,5,1,3,1,1,3,1,1,2,2,2,3,1,1,4,2]

let fishByAge= [0,0,0,0,0,0,0,0,0]

// Fische nach alter sortieren
for(let index = 0 ; index <9 ; index ++){
    let count = 0
    for (let fish of seed){
        if (fish == index) {
            count ++
        }
    }
    fishByAge[index] = count
}


for (let day = 1; day <= 256; day++) {

    console.log(day + ": " + fishByAge)

    let tmpFishByAge = [0,0,0,0,0,0,0,0,0]
    for(let index = 0 ; index < 9 ; index ++){
        if(index == 0) {
            tmpFishByAge[6] += fishByAge[0]
            tmpFishByAge[8] += fishByAge[0]
        } else {
            tmpFishByAge[index-1] += fishByAge[index]
        }
    }
    fishByAge = tmpFishByAge
}

console.log("Count Fish: " + calcLength())

function calcLength(){
    let length = 0
    for(let index = 0 ; index < 9 ; index ++){
        length += fishByAge[index]
    }
    return length
}